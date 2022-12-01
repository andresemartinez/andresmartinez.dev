---
title: "Typescript satisfies"
description: "Un nuevo operador que facilita el casteo en Typescript"
author: "Andres Martinez"
publishDate: "2022-11-28"
layout: ../../layouts/BlogPost.astro
---

[Typescript 4.9 RC](https://devblogs.microsoft.com/typescript/announcing-typescript-4-9-rc/) fue anunciado a principio de mes y mi cambio favorito es el operador **satisfies**.

Este operador nos permite comprobar que un subtipo de un objeto o función esta incluido dentro de un supertipo dado, sin cambiar el tipo tipo del objeto o función original.

Por ejemplo, supongamos que definimos un tipo `Color` y lo usamos para definir nuestro color favorito...

```ts
type Hex = string;
type RGB = { red: number; green: number; blue: number };

type Color = Hex | RGB;

const favoriteColor: Color = "#ffffff";
```

La variable `favoriteColor` claramente tiene un valor de tipo `Hex`, que a su ves es un `string`, pero... ¿Que pasa si queremos pasar el valor a mayúsculas.

```ts
type Hex = string;
type RGB = { red: number; green: number; blue: number };

type Color = Hex | RGB;

const favoriteColor: Color = "#ffffff";

console.log(`Favorite color: ${favoriteColor.toUpperCase()}`);
```

A simple vista esto debería funcionar, pero dado que le dijimos a typescript que `favoriteColor` es un `Color`, y `Color` puede ser de tipo `Hex` o `RGB`, entonces Typescript nos va a dar un error diciendo que `Hex | RGB` no tiene la función `toUpperCase`.

Hasta ahora, la manera de solucionar esto era haciendo un checkeo de tipos antes de usar la variable, o tiparla después de usarla.

```ts
type Hex = string;
type RGB = { red: number; green: number; blue: number };

type Color = Hex | RGB;

// Opción A: Hacer un checkeo de tipos
const favoriteColor: Color = "#ffffff";

if (typeof favoriteColor === "string") {
  console.log(`Favorite color: ${favoriteColor.toUpperCase()}`);
}

// Option B: Tipar la variable después de usarla
const favoriteColor = "#ffffff";
const hexColor: Color = favoriteColor.toUpperCase();
```

Con el nuevo operador `satisfies` podemos decirle a Typescript que valide que `favoriteColor` es de tipo `Color`, sin cambiar tipo de `favoriteColor`.

```ts
type Hex = string;
type RGB = { red: number; green: number; blue: number };

type Color = Hex | RGB;

// Typescript valida que favoriteColor es un Color,
// pero el tipo de favoriteColor sigue siendo string.
const favoriteColor = "#ffffff" satisfies Color;

console.log(`Favorite color: ${favoriteColor.toUpperCase()}`);
```

De esta manera podemos operar con favoriteColor sabiendo que es un `string`, y que cumple con `Color`.  
Si por algún motivo cambiáramos la definición de `Color` para que solo soporte `RGB`, entonces la validación daría un error.

```ts
type RGB = { red: number; green: number; blue: number };

type Color = RGB;

// Esto ya no cumple y da un error de compilación
const favoriteColor = "#ffffff" satisfies Color;

console.log(`Favorite color: ${favoriteColor.toUpperCase()}`);
```

Honestamente no se si agradecerle al equipo de Typescript por agregar esta funcionalidad, o putearlos por no haberla agregado antes.

En cualquiera de los dos casos, este tipo de funcionalidades son las que me trajeron a Typescript en un primer lugar, y me alegra que sigan innovando y mejorando la experiencia de los que lo usamos día a día.

-Andrés