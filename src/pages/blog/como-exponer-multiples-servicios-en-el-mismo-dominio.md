---
title: "Como exponer multiples servicios en el mismo dominio"
description: "Configuramos Traefik como proxy inverso y exponemos multiples servicios en el mismo dominio"
author: "Andres Martinez"
publishDate: "2022-12-01"
layout: ../../layouts/BlogPost.astro
---

Un problema común cuando trabajamos en desarrollo web es que, en producción, queremos poder acceder a nuestros diferentes servicios utilizando rutas dentro del mismo dominio principal.

Por ejemplo, si nuestro front end esta en `my-ecommerce.com`, probablemente accedamos a nuestros servicios desde `my-ecommerce.com/api/users` y `my-ecommerce.com/api/products`.

En cualquiera de los dos casos tenemos un solo dominio, un dominio se puede mapear a una sola IP, y obviamente nuestros servicios van a estar expuestos en el puerto 443 (porque somos devs responsables 😉😉). Por lo que necesitamos alguna manera de exponer más de un servicio en la misma ip:puerto.

Acá es cuando acudimos a un proxy inverso...

## ¿Que es un proxy inverso?

Podríamos decir que un proxy _a secas_ se sitúa entre los clientes e internet, ofuscando a los clientes a través de una única IP o dándoles acceso a una red privada.

![Proxy ilustrado](/images/proxy.webp)

Un proxy inverso, por el contrario, se sitúa entre internet y los servicios, permitiéndole a los clientes acceder a diferentes servicios a traves de la misma IP (dominio) y facilitando el control de acceso a dichos servicios.

![Proxy inverso ilustrado](/images/reverse-proxy.webp)

## Un ejemplo con Traefik

Para este ejemplo vamos a usar [Traefik](https://doc.traefik.io/traefik/). De todos los proxy inverso que hay dando vueltas, Traefik es mi favorito por lo fácil que es de configurar tanto por archivo yaml como por su integración con Docker.

### Servicios a exponer

Vamos a necesitar dos (o más) servicios. Yo voy a usar Node.js con Express, pero esto funcionaria con cualquier otro lenguaje, framework o librería que uses normalmente.

```js:users-service/src/index.js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hola desde users')
})

app.listen(port, () => {
  console.log(`Escuchando en puerto ${port}`)
})
```

```js:products-service/src/index.js
const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('Hola desde products')
})

app.listen(port, () => {
  console.log(`Escuchando en puerto ${port}`)
})
```

### Configuración por yaml

Para configurar nuestros servicios por yaml, primero que nada, tenemos que habilitar el provider de tipo _file_. De paso vamos a habilitar el _dashboard_ y vamos a configurar el puerto `8081` un _entrypoint_ que vamos a llamar _web_.

```yaml:config/traefik.yaml
providers:

  # Archivo donde vamos a configurar nuestros servicios
  file:
    filename: "/etc/traefik/traefik-d-conf.yaml"
    watch: true

# Dashboard para ver la salud de nuestros servicios
api:
  insecure: true
  dashboard: true

# Punto de entrada de nuestros servicios (para este ejemplo, el puerto 8080)
entryPoints:

  web:
    address: ":8081"
```

Después, tenemos que crear un segundo archivo donde vamos a configurar nuestros servicios. En el mismo vamos a crear nuestros _services_ apuntando al puerto correspondiente y _routers_ que mapeen las rutas a los servicios.

También vamos a crear un _middleware_ para resetear la ruta. Sin esto Traefik enviaría los requests al servicio con la ruta original. Por ejemplo, si accediéramos a `http://localhost:8081/users`, a nuestro servicio le llegaría el request con la ruta `/users`, pero en realidad queremos que llegue a `/`.

```yaml:config/traefik-d-conf.yaml
http:

  middlewares:
    path-reset:
      replacePathRegex:
        regex: "^/[a-z]+(/.+)*"
        replacement: "$1"

  services:

    users:
      loadBalancer:
        servers:
        - url: "http://localhost:3000"

    products:
      loadBalancer:
        servers:
        - url: "http://localhost:3001"

  routers:

    users:
      entryPoints:
        - web
      rule: "Path(`/users`)"
      middlewares:
        - path-reset
      service: users

    products:
      entryPoints:
        - web
      rule: "Path(`/products`)"
      middlewares:
        - path-reset
      service: products
```

Por ultimo, vamos a ejecutar el siguiente comando que levanta el container de Traefik:

```bash
docker run --name traefik \
    -d \
    -v "$PWD/config:/etc/traefik" \
    --net=host # Sino no podemos acceder a nuestros servicios locales
    traefik
```

Y, si todo salio bien, deberíamos poder acceder a `http://localhost:8080/dashboard/` sin problemas.

También deberíamos poder acceder a nuestros servicios usando las rutas `/users` y `/products`.

```bash
curl localhost:8081/users
```

```bash
curl localhost:8081/products
```

#### Pros y Cons

Por más que prefiero la configuración por Docker, es innegable que la configuración por yaml tiene varios beneficios, la facilidad de backupear el archivo de configuración, la posibilidad de exponer servicios que estén en otro servidor (distinto de Traefik) y el hot reload.

Yo personalmente prefiero Docker porque tengo todos mis servicios en containers y me ahorra tener que exponer puertos.

### Configuración por Docker

Para configurar nuestros servicios por Docker solo necesitamos un archivo. Al igual que en la configuración por yaml vamos a habilitar el _dashboard_ y vamos a configurar el puerto `8081` el entrypoint _web_. La diferencia es que vamos a usar el provider _docker_ en lugar de _file_.

```yaml:config/traefik.yaml
providers:

  # Integración por docker
  docker:
    exposedByDefault: false

# Dashboard para ver la salud de nuestros servicios
api:
  insecure: true
  dashboard: true

# Punto de entrada de nuestros servicios (para este ejemplo, el puerto 8080)
entryPoints:

  web:
    address: ":8081"
```

Después, a la hora de levantar el container de Traefik, vamos a agregar algunos labels. Estos reemplazan la configuración de _middlewares_, _routers_ y _services_ que haríamos por archivo.

En el container de Traefik vamos a configurar el middleware para resetear la ruta, dado que lo vamos a usar de manera global. Ademas, el label `traefik.enable=true` permite que podamos usar el dashboard.

```bash
docker run --name traefik \
    -d \
    -v "$PWD/config:/etc/traefik" \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -p 8080:8080 \
    -p 8081:8081 \
    -l 'traefik.enable=true' \
    -l 'traefik.http.middlewares.path-reset.replacepathregex.regex=^/[a-z]+(/.+)*' \
    -l 'traefik.http.middlewares.path-reset.replacepathregex.replacement=$1' \
    traefik
```

Con el container corriendo, si todo salio bien, deberíamos poder acceder a `http://localhost:8080/dashboard/` sin problemas.

Ahora queda dockerizar y levantar nuestros servicios. Para los ejemplos en Node.js que deje arriba podemos usar el siguiente Dockerfile.

```docker
FROM node:18
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD [ "node", "src/index.js" ]
```

Y para levantar los servicios podemos usar los siguientes comandos.

```bash
docker run --name users-service \
    -d \
    -l 'traefik.enable=true' \
    -l 'traefik.http.services.users.loadbalancer.server.port=3000' \
    -l 'traefik.http.routers.users.entrypoints=web' \
    -l 'traefik.http.routers.users.rule=Path(`/users`)' \
    -l 'traefik.http.routers.users.middlewares=path-reset' \
    -l 'traefik.http.routers.users.service=users' \
    users-service
```

```bash
docker run --name products-service \
    -d \
    -l 'traefik.enable=true' \
    -l 'traefik.http.services.products.loadbalancer.server.port=3001' \
    -l 'traefik.http.routers.products.entrypoints=web' \
    -l 'traefik.http.routers.products.rule=Path(`/products`)' \
    -l 'traefik.http.routers.products.middlewares=path-reset' \
    -l 'traefik.http.routers.products.service=products' \
    products-service
```

Con los tres containers corriendo deberíamos poder acceder a nuestros servicios usando las rutas `/users` y `/products`.

```bash
curl localhost:8081/users
```

```bash
curl localhost:8081/products
```

#### Pros y cons

Como decía antes, este método permite no exponer los puertos de los servicios (`3000` y `3001`). Traefik se comunica con ellos a traves de las redes de Docker. Inclusive podríamos tener los servicios aislados entre si, pero expuestos a través de Traefik (usando diferentes docker networks).  
La contra es que si queremos modificar algo tenemos que borrar el container y recrearlo. Y tampoco podemos exponer servicios que no estén levantados en diferentes servidores (salvo que estemos usando algo como swarm).

## Otros usos

Hasta aca tenemos nuestros servicios expuestos y funcionando en rutas dentro del mismo dominio, pero no termina ahí. La mayoría de los proxy inverso que hay dando vueltas ofrecen muchas más funcionalidades que solo routear servicios. Aca hay algunos ejemplos de cosas que se pueden hacer con Traefik.

### Segurización

Agregando un middleware, podríamos segurizar nuestros servicios mediante una api key, usuario y contraseña o una lista de IPs autorizadas.

```yaml
http:
  middlewares:
    test-ipwhitelist:
      ipWhiteList:
        sourceRange:
          - "127.0.0.1/32"
          - "192.168.1.7"

    test-auth:
      basicAuth:
        users:
          - "test:$apr1$H6uskkkW$IgXLP6ewTrSuBkTrqE8wj/"
          - "test2:$apr1$d9hr9HBB$4HxwgUir3HP4EsggP/QNo0"

    test-apikey:
      plugin:
        apiKey:
          secretParam: mysecret
```

### Balanceo de carga

Si tuviéramos que balancear carga entre dos instancias del mismo servicio, es tan fácil como agregar URLs en la configuración del mismo.

```yaml
http:
  services:
    my-service:
      loadBalancer:
        servers:
          - url: "http://service-1"
          - url: "http://service-2"
          - url: "http://service-n"
```

### Redirecciones

Cambiar la URL de un servicio no es un problema cuando podemos redirigir a los clientes para que no pierdan conexión.

```yaml
http:
  middlewares:
    test-redirectregex:
      redirectRegex:
        regex: "^http://localhost/(.*)"
        replacement: "http://mydomain/${1}"
```

### Manejo de certificados (SSL)

Traefik puede crear y refrescar certificados en [Let's Encrypt](https://letsencrypt.org/es/), facilitando el ofrecer servicios por https.

```yaml
http:
  my-service:
    entryPoints:
      - websecure
    rule: "Host(`my-service.com`)"
    service: my-service
    tls:
      certResolver: lets-encrypt
```

### Rate limiting

```yaml
http:
  middlewares:
    test-ratelimit:
      rateLimit:
        average: 100
        burst: 50
```

## Conclusión

Sea un front o un back, en 15 minutos podemos tenerlo productivo con certificados, rate limit, y redirecciones de http a https. Ya no tenemos muchas excusas para tener servicios expuestos con dominios poco amigables o sin seguridad.
