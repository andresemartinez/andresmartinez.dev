---
title: "De IntelliJ a VSCode"
description: "Porque cambie de IntelliJ a VSCode y como lo configure para no perder ninguna funcionalidad"
author: "Andres Martinez"
publishDate: "2022-12-01"
layout: ../../layouts/BlogPost.astro
---

Calculo que se preguntaran _por qué_. Algunos cuestionara por qué usé IntelliJ en un primer lugar, otros se preguntaran por qué cambie a VSCode. Por suerte, ambas preguntas tienen respuesta.

## ¿Por qué IntelliJ?

Como muchos, mis primeros pasos en el mundillo _web_ fueron con Java + Springboot como back end 🤷‍♂️. Hasta ese momento había trabajado en C o Smalltalk, por lo que IntelliJ fue el primer IDE real que use y fue amor a primer vista.

Si, es pesado, consume ram y procesador, pero la capacidad de introspección del código es inigualable, más allá de que trae incorporado un montón de funcionalidades que en otros IDEs o editores de texto dependen de plugins de terceros. Es, por lejos, la experiencia _out of the box_ más pulida.

Con el tiempo tuve que meter mano en servicios Node.js, o fronts en Angular, pero no tenia muchos motivos para cambiar, IntelliJ nunca me dejo a pata 🤍.

## ¿Que cambió?

Pero todo cambio cuando la nación del fuego atacó 🔥... ee digo, todo cambio cuando me sume al proyecto en el que estoy actualmente.

Resulta que IntelliJ se cae a pedazos con React. Normalmente yo uso `Ctrl-N` para navegar entre clases, permitiéndome olvidarme del árbol de directorios y encontrar fácil el componente, servicio, controller o lo que sea que este buscando. El problema con React son los componentes funcionales. Ojo, no digo que sean un problema en sí, los componentes funcionales son lo más, pero hacen difícil para el IDE entender que es un componente y que es una función (porque son lo mismo 🙃).

Nada grave, puedo empezar a usar `Shift-Shift` para buscar por archivo y listo. Si los archivos están bien nombrados, puedo encontrar cualquier componente. Excepto que todos los componentes del proyecto se llaman `index.js` 🤦‍♂️.

Ni hablar de usar `Ctrl-LeftClick` o `Ctrl-B` para buscar declaraciones y usos de funciones o componentes.

Una de las mejores cosas de React, que es poco dogmático, es la pesadilla de cualquier IDE que trata de ayudarme a navegar el código. De repente las capacidades de indexado e introspección de IntelliJ se volvieron inútiles.

Pero bueno... si no lo puede hacer IntelliJ, probablemente no lo pueda hacer nadie. ¿Para que cambiar? 🤔.

Ahí fue cuando me di cuenta que todos estos problemas que estaba teniendo IntelliJ para indexar y entender el código también los estaba teniendo el equipo 💡.

Para dar contexto, el equipo al que me incorpore está manteniendo una webapp que tiene más de 5 años. Las personas que comenzaron el proyecto ya no están, y el equipo actual es bastante Jr.

El hecho de que el equipo haya cambiado tanto, sumado a que son bastante Jr., y a lo permisivos que son tanto React como Javascript en general, hicieron que el código no respete ningún tipo de patrón o convención. Cada dev codea como quiere, nombra como quiere, indenta como quiere.

## VSCode al rescate

Por suerte, la solución fue fácil. La mayoría del equipo ya estaba usando VSCode, y el resto no perdíamos mucho por cambiar. Estandarizamos VSCode como editor de texto del equipo, commiteamos al repo la carpeta `.vscode` con configuraciones acordadas por el equipo y sanseacabó.

Con esto no solo mejoramos buscabilidad y legibilidad del código, sino que redujimos conflictos tontos de merge y logramos tener PRs más cortitos.

## Adaptación

Pero no significo perder todas las funcionalidades..........