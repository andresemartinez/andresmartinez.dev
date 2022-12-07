---
title: "Bash al rescate"
description: "Cuando saber bash te ahorra más de 6hs de trabajo"
author: "Andres Martinez"
publishDate: "2022-12-07"
layout: ../../layouts/BlogPost.astro
---

Todo arranco un Martes, segundo día del Sprint. Resulta que el equipo de seguridad informática nos estaba pidiendo que dejemos de usar el puerto 8443 en nuestros servicios, lo cual tiene todo el sentido del mundo, deberíamos haber usado el 443 desde un principio.

Lo que ellos no sabían es que teníamos más de 80 servicios y no teníamos documentado exactamente cuales hacían llamadas usando ese puerto.

Ahí fue cuando un compañero del equipo me pidió si podia encara la tediosa tarea de revisar todos los repos y borrar el puerto 8443 de las llamadas.

Básicamente tenia que:
1. Clonar un repo
2. Hacer una búsqueda global por :8443
3. Borrar el puerto donde corresponda
4. Comitear y pushear
5. Armar el Pr

Todo eso, 80 veces. Suponiendo que tarde entre 5 y 10 minutos por cada repo, estamos hablando de 6 a 12 hs de laburo. Y, siendo una tarea tediosa y repetitiva, también sumaria un alto riesgo a equivocarme después del repo numero 10, cuando empiece a aburrirme y mi cabeza empiece a volar.

Ahi fue cuando decidí ponerle un poco más de cabeza al problema. Probablemente sean pocos los repos que estén usando ese puerto, por lo que podría reducir drásticamente esa lista si tuviera alguna manera rápida de revisar todos los repos y filtrar los que tengan el puerto.

¿Solución? Ya tenia todos los repos en un CSV, solo tenia que armar un script que lo lea, que clone todos los repos, y que haga un `grep` por `:8443`.

```bash
#!/bin/bash

REPOS_FILE="repos.csv"

while IFS="," read -r REPO REPO_URL REPO_SSH
do
    echo "Processing $REPO"

    echo "- Cloning $REPO_SSH"
    git clone -q "$REPO_SSH"

    echo "- Looking for port"
    grep --exclude-dir=.git -lR ":8443" "$REPO"

    echo "- Cleaning..."
    rm -rf "$REPO"

done < "$REPOS_FILE"
```

Con eso reduje la lista a 18. De los 80, solo 18 repos tenían alguna referencia al puerto 8443. Ese script me llevó 5 minutos, y me ahorró 5 hs.

Si procesara a mano los 18 repos tardaría aproximadamente 1h, pero ¿Porque frenar ahí?. Ya tenia la lista de repos, tranquilamente podia aplicar la modificación usando `sed` y, ya que estamos, comitear y pushear...

```bash
#!/bin/bash

REPOS_FILE="repos.csv"
BRANCH="port-migration"
COMMIT_MESSAGE="Migrating from port 8443 to 443"

while IFS="," read -r REPO REPO_URL REPO_SSH
do
    echo "Processing $REPO"

    echo "- Cloning $REPO_SSH"
    git clone -q "$REPO_SSH"

    echo "- Looking for port"
    FILES_WITH_PORT="$(grep --exclude-dir=.git -lR ":8443" "$REPO")"

    if [ -z "$FILES_WITH_PORT" ]
    then
        echo "- Port not found, no change necessary"
    else

        echo "- Port found, applying changes"
        echo "$FILES_WITH_PORT" | xargs sed -i 's/:8443//g'

        git -C "$REPO" checkout -qb "$BRANCH"
        git -C "$REPO" add .
        git -C "$REPO" commit -qm "$COMMIT_MESSAGE"
        git -C "$REPO" push -q origin "$BRANCH"

        echo "- Changes applied, check $REPO_URL"

    fi

    echo "- Cleaning..."
    rm -rf "$REPO"

done < "$REPOS_FILE"
```

Teniendo esto, lo único que queda manual es la creación de los Pr. Probablemente también se podría automatizar, pero creo que llegue al 80/20.

Ejecute el script `./migrate_port.sh > migration.log` y después use `grep "applied" migration.log` para las URLs de los repos sobre los que aplicamos cambios. Ctrl+Click sobre las URLs me abrió los repos en diferentes pestañas, y como los cambios eran recientes GitHub me ofreció crear el Pr con un solo click.

Mande los Prs a mi compañero, los revisó, los aprobó y listo. Una tarea de día y medio resuelta en 1h.

¿No vale la pena saber bash?