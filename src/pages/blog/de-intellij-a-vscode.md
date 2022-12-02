---
title: "De IntelliJ a VSCode"
description: "Porque cambie de IntelliJ a VSCode y como lo configure para no perder ninguna funcionalidad"
author: "Andres Martinez"
publishDate: "2022-12-02"
layout: ../../layouts/BlogPost.astro
---

Calculo que se preguntaran _por qué_. Algunos cuestionara por qué usé IntelliJ en un primer lugar, otros se preguntaran por qué cambie a VSCode. Por suerte, ambas preguntas tienen respuesta.

## ¿Por qué IntelliJ?

Como muchos, mis primeros pasos en el mundillo _web_ fueron con Java + Springboot 🤷‍♂️. Hasta ese momento había trabajado en C o Smalltalk, por lo que IntelliJ fue el primer IDE real que use y fue amor a primer vista.

Si, es pesado, consume ram y procesador, pero la capacidad de introspección del código es inigualable, más allá de que trae incorporado un montón de funcionalidades que en otros IDEs o editores de texto dependen de plugins de terceros. Es, por lejos, la experiencia _out of the box_ más pulida.

Con el tiempo tuve que meter mano en servicios hechos en Node.js, o interfaces hechas en Angular, pero no tenia muchos motivos para cambiar, IntelliJ nunca me dejo a pata 🤍.

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

## Paridad de funciones

VSCode no esta mal, pero yo no quería perder funciones que ya tenia incorporadas con IntelliJ, asi que agregue algunos plugins:

- [Bookmarks](https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)

Y toque algunas configuraciones:

```json:settings.json
{
    "files.autoSave": "onFocusChange",
    "typescript.implementationsCodeLens.enabled": true,
    "typescript.inlayHints.enumMemberValues.enabled": true,
    "javascript.inlayHints.enumMemberValues.enabled": true,
    "javascript.inlayHints.functionLikeReturnTypes.enabled": true,
    "javascript.inlayHints.parameterTypes.enabled": true,
    "javascript.inlayHints.propertyDeclarationTypes.enabled": true,
    "javascript.inlayHints.variableTypes.enabled": true,
    "typescript.inlayHints.parameterNames.enabled": "all",
    "javascript.inlayHints.parameterNames.enabled": "literals",
    "window.restoreWindows": "none",
    "markdown.preview.breaks": true,
    "explorer.confirmDelete": false,
    "gitlens.hovers.avatars": false,
    "explorer.autoReveal": false,
    "explorer.confirmDragAndDrop": false,
    "typescript.updateImportsOnFileMove.enabled": "always",
    "javascript.updateImportsOnFileMove.enabled": "always",
    "window.openFilesInNewWindow": "on",
    "window.openFoldersInNewWindow": "on",
}
```

## Después de algunos meses

Seguiría usando IntelliJ para cualquier otra cosa, pero para React o Node.js no esta mal. Tiene la ventaja de que es mucho más liviano, abre más rápido y permite estandarizar configuraciones en un proyecto. Inclusive me encontré usándolo para cosas que antes hubiera usado Vim (justamente porque IntelliJ tarda más en abrir).

Creo que si lo único que necesitas es un editor de texto con resaltado de sintaxis y un mínimo intellisense VSCode no te va a defraudar. Ahora, si querés poder debugear conflictos de dependencias, ver el árbol de Beans, tener intellisense sobre queries SQL que escribiste en un string, que cuando moves un archivo se acomoden los imports, o cualquier otra funcionalidad un poquito más avanzada, de repente IntelliJ es de las pocas opciones que hay dando vueltas.
