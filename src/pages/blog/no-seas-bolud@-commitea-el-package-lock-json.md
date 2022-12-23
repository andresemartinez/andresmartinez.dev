---
title: "No seas bolud@, commitea el package-lock.json"
description: 'Me sume a un equipo que no commiteaba el package-lock.json, y paso lo que "no me va a pasar a mi"'
author: "Andres Martinez"
publishDate: "2022-12-23"
layout: ../../layouts/BlogPost.astro
---

Como mencioné en otros posts, a principio de año me sume a un equipo nuevo. Va, nuevo para mi, ellos ya venían laburando juntos hacia varios años. La idea era que les de una mano para ver si podíamos subir la velocidad del equipo.

Con los días fui notando varias cosas a mejorar y fui armando mi backlog de deuda técnica. No es que el equipo no tuviera uno, pero no quería entrar y proponer cambios al segundo sprint. La realidad es que la aplicación andaba "bien" y estábamos sacando features nuevas todos los sprints. No tenia muchos argumentos para decirles que estábamos haciendo todo mal.

Una de esas cosas que note fue que no estábamos commiteando el `package-lock.json`. Cada uno tenia su propia version local. No se bien porque se tomo esa decisión y, honestamente, tampoco le di mucha importancia, había cosas más urgentes como agregar un linter/formatter, subir la version de node (que ya había llegado al eol) o actualizar las dependencias deprecadas.

Cuestión que ayer paso lo que "no me va a pasar a mi". La gente de babel publico una nueva version de `@babel/traverse` y estaba llena de bugs.

¿Como nos afecta esto? Bueno... resulta que teníamos `@babel/core@7.20.5` como dependencia, y este a su ves dependía de `@babel/traverse@^7.20.5`. La clave esta en el `^`, eso significa cualquier version minor/patch mayor o igual a la version especificada. Entonces `^7.20.5` es lo mismo que decir `7.20.5 <= v < 8.0.0`. Esto normalmente no seria un problema, pero nosotros no teníamos commiteado el `package-lock.json`.

Como no había un lock, a partir de que el equipo de babel subió la nueva version (con bugs), nuestros pipelines empezaron a romper. No podíamos buildear versiones nuevas de la app y, como borramos el lock y la carpeta node_modules local para tratar de diagnosticarlo, tampoco podíamos levantar la app local para desarrollar.

No solo estuve un día entero para diagnosticar este problema, sino que cuando me di cuenta que era, me quería matar. Para peor, cuando quise usar un override para forzar la version `7.20.5` de `@babel/traverse` nos encontramos con que el pipeline había cacheado la carpeta `node_modules`, y no teníamos permisos para borrarla.

Asi paso el día de ayer, bastante frustrado y con un problema que era fácilmente evitable.

Hoy a la mañana el equipo de babel subió la version `7.20.10` que arreglo el problema que estábamos teniendo. Zafamos porque no teníamos programado ningún release, ni tuvimos bugs críticos que solucionar, pero podría haber sido mucho peor.

¿Moraleja? No seas bolud@, commitea el `package-lock.json`.

-Andres
