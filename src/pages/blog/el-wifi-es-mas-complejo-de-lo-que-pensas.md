---
title: "El WiFi es más complejo de lo que pensás"
description: "Algunos datos curiosos para entender como funciona el WiFi y porque se dan algunos problemas comunes"
author: "Andres Martinez"
publishDate: "2022-12-28"
layout: ../../layouts/BlogPost.astro
---

## ¿Que es WiFi?

Primero lo primero, WiFi no es internet. Es muy común esa asociación, pero deja de lado un montón de otros usos que le podemos dar. 

WiFi es una tecnología que se usa para conectar dispositivos de manera inalámbrica con el fin de transmitir datos. Por ejemplo, hay parlantes o auriculares inalámbricos que usan WiFi para comunicar los auriculares con la base que enchufarías a tu computadora o televisor. Logitech tiene varios ejemplos de esto, como los auriculares G935.

## Punto de acceso WiFi (AP)

El aparato que emite WiFi se lo conoce como Punto de Acceso WiFi, o _AP_ para los amigos. Este aparato puede estar en la misma cajita que el router, como suele pasar con los que entregan los proveedores de internet, o puede estar por separado, como suele pasar en las oficinas.

Los AP tienen antenas que usan para emitir y recibir datos. Las antenas se configuran de a 2, una para emitir y una para recibir. Las configuraciones más comunes son 2x2 y 4x4, lo que significa 2 para emitir y 2 para recibir, o 4 y 4 respectivamente. Las antenas no necesariamente son visibles, y esto no es ni bueno ni malo.

## Atiende a de un dispositivo a la vez

Los aparatos que se conectan (celular, notebook, etc) también tienen antenas, generalmente 1x1 o 2x2. La cantidad de clientes con la que un AP se puede comunicar en simultaneo depende de la cantidad de antenas que tengan ambos. 

Un AP 2x2 puede atender un dispositivo 2x2 o dos dispositivos 1x1. Esto quiere decir que si hay 3 celulares en casa, los tres son 2x2 y mi AP es 2x2, el AP solo puede atender de a un celular a la vez. Imaginate la cola en un supermercado con un solo cajero. 

En general esto pasa muy rápido y es casi imperceptible, pero cuando empezamos a sumar dispositivos (notebook, celular, televisor, aire acondicionado, impresora, alarma, sensores, etc.) la cola se hace cada vez más larga.
No solo eso, sino que la cola se va a mover a la velocidad del más lento. Un dispositivo viejo que tarde en responder ralentiza la comunicación de todos los dispositivos conectados al mismo AP.

Por eso en las oficinas van a ver varios APs por piso. Quizás con uno solo alcanzaría para tener cobertura en todo el piso, pero no daría a basto para atender a todos los dispositivos en un tiempo razonable.

## Tiene interferencia con un microondas

WiFi tiene 3 frecuencias disponibles: 2.4Ghz, 5Ghz y 6Ghz. Pero estas frecuencias no esta reservadas exclusivamente para WiFi. El protocolo Zigbee (el que usa Philips HUE) también usa la frecuencia de 2.4Ghz y, más raro aun, el microondas resuena en la misma frecuencia. Esto puede generar interferencia y hacer que la conexión sea inestable.

Por otro lado, la frecuencia de 5Ghz se superpone con frecuencias usadas por radares militares y bases aéreas, por lo que hay bandas que están deshabilitadas por defecto en la mayoría de los APs comerciales.

La banda de 6Ghz promete ser la solución, pero todavía no esta adoptada globalmente.

## Como travesar paredes

No solo es un tema de evitar interferencias. La frecuencia también limita la velocidad maxima y la distancia a la que podemos estar del AP.

Básicamente, cuanto más baja la frecuencia, más lento transmite, más fácil puede atravesar paredes. Cuanto más alta la frecuencia, más rápido transmite, más le cuesta atravesar paredes.

Y hablando de paredes, madera o durlock es más fácil que cemento, concreto y metal es prácticamente imposible. Esto es importante tenerlo en cuenta cuando decidimos donde poner el AP (o el router que nos dal el proveedor de internet).

## La velocidad se mide distinto

Cuando hablamos de velocidad de conexión solemos hablar en Mb/s. Habrás leído que tu computadora tiene una placa de red de 100 Mb/s o que un AP transmite hasta 300 Mb/s. Pero, aunque estén usando la misma unidad, estos dos números miden cosas distintas.

Cuando mandamos _datos_, a traves del cable o por WiFi, van empaquetados. Al igual que cuando querés mandar un paquete por correo, se necesita información para entender que es ese paquete, cuanto pesa y a donde va. A toda esa información se la suele llamar **header**, y al contenido del paquete se lo llama **payload**.

Cuando estamos hablando de datos que van por cable y decimos 100 Mb/s nos referimos al paquete (con el header), pero cuando hablamos de WiFi y decimos 100 Mb/s hablamos del **payload**, sin contar el **header**. Por lo que un AP que transmite a 100Mb/s puede mandar menos datos por segundo que una placa de red que transmite "a la misma velocidad".

## La pesadilla del WiFi

Hay muchas cosas que se diseñan con la intención de simplificarle la vida a los usuarios que terminan provocando problemas inesperados y difíciles de diagnosticar. Una de estas cosas son los dispositivos que se "configuran solos". 

Seguro tengas en tu casa algún Chromecast, AppleTv, impresora, o algún dispositivo que conectas a tu red y después podes acceder con una aplicación sin tener que configurar la IP. Para lograr esto, estos aparatos emiten un paquete _varias veces por segundo_ notificando su ubicación a _todos_ los dispositivos de la casa. Asi, cuando abrís la aplicación, esta lo puede encontrar y establecer la comunicación. Básicamente están jugando al Marco-Polo en tu red local.

El problema de esta solución es que el AP tiene que emitir el mismo paquete a cada uno de los dispositivos que están conectados, uno por uno. Esto no consume ancho de banda, pero si tiempo de aire. En lugar de estar mandándote los paquetes de la serie de Netflix que esta viendo, te tiene que mandar los paquetes de los dispositivos que están **constantemente** notificando su ubicación a **toda** la red.

## ¿Entonces el WiFi apesta?

Con esto no quiero decir que el WiFi sea malo y tengamos que dejar de usarlo, sino que busco explicar sus limitaciones y como superarlas. En especial en un mundo post pandemia en el cual muchos trabajamos remoto y necesitamos una conexión estable.

Lo importante es que quizás no necesites pagar un servicio más caro para tener "más velocidad", quizás es cuestión de usar otra frecuencia, ubicar mejor el router o, en el peor de los casos, agregar un AP.