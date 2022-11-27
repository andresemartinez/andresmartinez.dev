---
title: "Optimizando para legibilidad"
description: "Primer post"
author: "Andres Martinez"
publishDate: "2022-11-26"
layout: ../../layouts/BlogPost.astro
draft: true
---

## El mundo académico

Una de las primeras cosas que nos enseñan cuando aprendemos a programar es _complejidad algorítmica_. Unos pequeños truquitos que nos pueden ayudar a escribir código más performante. Por ejemplo...

Supongamos que queremos buscar un **post** por **id**, la solución más directa seria iterar el array de posts hasta que encontramos el post con el id que buscamos:

```javascript
const posts = [
  {
    id: "c1c0610f-3b10-4956-93d8-248bf611cc40",
    name: "Hola Mundo",
  },
  {
    id: "82f04201-5e13-445f-a5f2-703b0cc81f5e",
    name: "Javascript para principiantes",
  },
  {
    id: "caf2cd27-439e-4101-a041-0c824f0356d6",
    name: "El tío bob tenia razon",
  },
];

const requiredPost = "caf2cd27-439e-4101-a041-0c824f0356d6";

function findPost(postId) {
  return posts.find((post) => post.id === postId);
}

console.log(findPost(requiredPost));
```

En este caso, la complejidad algorítmica de _findPost_ seria O(n/2) asumiendo que todos los posts tienen la misma probabilidad de ser buscados.

Ahora, si tuviéramos todos los posts indexados por **id**...

```javascript
const postsById = {
  "c1c0610f-3b10-4956-93d8-248bf611cc40": {
    id: "c1c0610f-3b10-4956-93d8-248bf611cc40",
    name: "Hola Mundo",
  },
  "82f04201-5e13-445f-a5f2-703b0cc81f5e": {
    id: "82f04201-5e13-445f-a5f2-703b0cc81f5e",
    name: "Javascript para principiantes",
  },
  "caf2cd27-439e-4101-a041-0c824f0356d6": {
    id: "caf2cd27-439e-4101-a041-0c824f0356d6",
    name: "El tío bob tenia razón",
  },
};

const requiredPost = "caf2cd27-439e-4101-a041-0c824f0356d6";

function findPost(postId) {
  return postsById[postId];
}

console.log(findPost(requiredPost));
```

La complejidad algorítmica de _findPost_ baja a O(1), dado que la complejidad de acceder a un mapa por clave es constante.

Quizás más adelante vemos el ejemplo de la secuencia de Fibonacci donde implementarla de manera recursiva puede tardar años en resolver algo que hubiera tardado minutos de manera iterativa.

Y ahi es cuando empezamos a tratar de optimizar cada linea de código, se vuelve una competencia tácita con nosotros mismos a ver que tan rápido se puede hacer un algoritmo, que consuma menos ram o menos procesador. Y en el mundo académico esto esta buenísimo.

## El mundo laboral

Cuando estamos aprendiendo a programar, enseñar complejidad algorítmica cumple una función muy importante, nos ayuda a entender que hay más de una manera de resolver el mismo problema y nos da una herramienta objetiva para comparar esas soluciones.

La cosa cambia cuando empezamos a trabajar, en el mundo académico escribimos código para nosotros (para aprender), en el mundo laboral escribimos código para **alguien más**.

Generalmente este alguien más nos viene a buscar porque tiene una necesidad. No solo la tiene **hoy**, sino que muchas veces no sabe cual es la solución.

Este cambio de panorama implica que ahora tenemos que escribir código y tenerlo productivo para recién saber si lo que codeamos soluciona el problema. En el mejor de los casos estamos bien encaminados y tenemos que iterarlo, en el peor tenemos que borrar todo y arrancar de nuevo.

## Código descartable

Y aca es donde aparecen las metodologías que promueven el desarrollo iterativo incremental como Scrum, Kanban o XP. 

Y con el desarrollo iterativo incremental, estamos más tiempo modificando código existente que escribiendo código nuevo. O en otras palabras, estamos más tiempo leyendo código (para entenderlo, para modificarlo), que escribiendo código.

Ojo, no soy el primero que llego a esta conclusión:

> Indeed, the ratio of time spent reading vs. writing is well over 10:1.
> We are constantly reading old code as part of the effort to write new code.
> Because this ratio is so high, we want the reading of code to be easy, even if it makes
> the writing harder. Of course there’s no way to write code without reading it, so making it
> easy to read actually makes it easier to write.
> ― Robert C. Martin, Clean Code: A Handbook of Agile Software Craftsmanship.

O en español:

De hecho, la relación entre el tiempo dedicado a leer y escribir supera con creces 10:1.  
Constantemente leemos código antiguo como parte del esfuerzo por escribir código nuevo.  
Debido a que esta proporción es tan alta, queremos que la lectura del código sea fácil,  
incluso si dificulta la escritura. Por supuesto, no hay forma de escribir código sin leerlo,  
por lo que facilitar la lectura en realidad facilita la escritura.

Cuando yo tengo hambre, quiero comer. No me importa si en el restaurante que esta al lado del McDonald's hace la comida más rica o más saludable, en el momento que tengo hambre voy a entrar al McDonald's porque me sirven la comida en menos de 5 minutos.

El mundo laboral es muy distinto, ya no hacemos código para nosotros o para aprender, hacemos código para un cliente, un usuario, un stake holder. Esta es gente que tiene necesidades, y que las tiene **hoy**, y no puede esperar al algoritmo perfecto porque la competencia los aplasta.

Vamos a codear funcionalidades con la minima información que tengamos, para sacarla a la calle lo antes posible.

De repente estamos en un mundo en que tenemos que sacar una funcionalidad a la calle, lo antes posible, con la información que tenemos hoy. Tenemos que codear algo que **sabemos** que vamos a tener que modificar

De repente estamos en un mundo en el que las necesidades cambian más rápido de lo que podemos codear una solución,
donde son más veces las que modificamos código existente que las que escribimos algo desde zero. _Un mundo en que estamos más tiempo leyendo código, que escribiéndolo._



## ¿Y ahora que?

Claramente no podemos dejar la performance de lado,
