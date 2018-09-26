# Técnicas avanzadas de programación - Trabajo practico N° 1

## Resumen

### Arquitectura

[Modelo de componentes](https://drive.google.com/file/d/1i_kP5ZKYkafwc1NCkCTM_BkL4ysPAZT0/view?usp=sharing)

### Librerías utilizadas

#### Express

##### ¿Que es ExpresJS?

Express es un framework para aplicaciones web Node.js mínimo y flexible, basado en Sinatra (framework Ruby opuesto a Rails) que proporciona un conjunto sólido de características para las aplicaciones web (full stack o backend) y móviles como:

* Direccionamiento
* Funciones middleware
* Motores de plantillas
* Manejo de errores
* Debug

##### ¿Por qué lo elegimos?

Lo elegimos por ser simple, flexible, rápido, estándar y suficiente para nuestra API.

#### MongoDB

##### ¿Que es MongoDB?

MongoDB es una base de datos no SQL, no relacional y orientada a documentos.

##### ¿Por qué elegimos MongoDB?

* Velocidad. Si una aplicación necesita almacenar o acceder a mucha información en poco tiempo, se necesita una base de datos que aporte gran velocidad. Las bases de datos documentales son capaces de ser mucho más rápidas que las relacionales, pudiendo atender clientes que necesiten realizar muchas operaciones por segundo.

* Volumen. En cuanto al tamaño de la base de datos, si tenemos una cantidad de información o enorme, entonces tenemos unas necesidades importantes de volumen. Las bases de datos relacionales tienen tendencia a funcionar más lentamente cuando en una tabla se encuentran cantidades muy grandes de registros (del orden de un millón para arriba). Situaciones así obligan a los administradores a buscar soluciones, como dividir las tablas en diversos segmentos, produciendo un coste en el acceso a los datos y la operativa. Este no es un problema en las bases de datos NoSQL, que son capaces de administrar volúmenes gigantescos de datos en sus entidades.

* Variabilidad. En bases de datos relacionales el esquema de la información está minuciosamente definido de antemano. Por ejemplo, no podes agregar campos en los registros sobre la marcha. En las bases de datos documentales, como MongoDB, no hay problema en que cada documento almacene campos distintos, pudiendo ser flexibles en cuanto al esquema de la información.

Siendo el producto planteado de alta concurrencia, volumen y de naturaleza variable respecto de sus requisitos. Optamos por MongoDB.

* Desventajas

  * Lo que a día de hoy no se encuentra disponible en las NoSQL son los mecanismos para hacer transacciones entre varios documentos. Debido a esto, pueden no ser la opción más adecuada para ciertas operativas de negocio, ya que se tendrá que profundizar mucho en los mecanismos para almacenar la información y puede no compensar el esfuerzo.

#### Mongoose
##### ¿Qué es la Mongoose?

Mongoose es un Object Document Mapper (ODM). Esto significa que Mongoose te permite definir objetos con un esquema fuertemente tipado que se asigna a un documento MongoDB.

##### ¿Por qué lo elegimos?
Mongoose proporciona una increíble cantidad de funcionalidades para crear y trabajar con esquemas. Mongoose actualmente contiene ocho SchemaTypes que una propiedad se guarda como cuando se conserva a MongoDB. Son:

* String (Cadena)
* Number (Número)
* Date (Fecha)
* Buffer
* Boolean (Booleano)
* Mixed (Mixto)
* ObjectId
* Array (Matriz)
* Cada tipo de datos le permite especificar:
  * Un valor predeterminado
  * Una función de validación personalizada
  * Indica que se requiere un campo
  * Una función get que le permite manipular los datos antes de que se devuelva como un objeto
  * Una función de conjunto que le permite manipular los datos antes de guardarlos en la base de datos
  * Crear índices para permitir que los datos se obtengan más rápido

#### BCrypt

##### ¿Porque hashear passwords para persistirlos?

Lo malo del almacenamiento "en claro" de contraseñas es que induce una vulnerabilidad en el caso de un ataque donde el atacante podría obtener acceso de lectura a datos del servidor como también simplemente podría ser un administrador consultando la base. 

Si los datos incluyen las contraseñas de los usuarios en claro, el atacante podría usar estas contraseñas para iniciar sesión como cualquier usuario.

Ataque externo de ejemplo: Inyección SQL.

##### ¿Por elegimos BCrypt?

Bcrypt es una función de hashing de passwords diseñado por Niels Provos y David Maxieres, basado en el cifrado de Blowfish. Se usa por defecto en sistemas OpenBSD y algunas distribuciones Linux y SUSE. Lleva incorporado un valor llamado salt, que es un fragmento aleatorio que se usará para generar el hash asociado a la password, y se guardará junto con ella en la base de datos. Así se evita que dos passwords iguales generen el mismo hash y los problemas que ello conlleva, por ejemplo, ataque por fuerza bruta a todas las passwords del sistema a la vez. Otro ataque relacionado es el de Rainbow table (tabla arcoíris), que son tablas de asociaciones entre textos y su hash asociado, para evitar su cálculo y acelerar la búsqueda de la password. Con el salt, se añade un grado de complejidad que evita que el hash asociado a una password sea único.
Además BCrypt utiliza rounds de hasheo lo que implica que un password hasheado de esta manera será hasheado 2^n veces donde n es la cantidad de rounds.

Hoy en día por estas razones es el estándar en la industria y por eso lo elegimos.

#### Body Parser

##### ¿Para qué usar un Body Parser?

Body parser es una función middleware para utilizar con express. Básicamente intercepta todos los incoming requests y parsea el su contenido en un objeto JSON. Esto permite hacer uso del request desde el código de la API con muchísima más facilidad.

##### ¿Por qué usamos Body Parser?

Parece ser el estándar por defecto con NodeJS y Express. Por lo tanto está altamente testeado y existe muchísimos ejemplo al respecto lo que facilita el desarrollo.

#### Helmet

##### ¿Que es Helmet?
Helmet es una colección de 12 funciones middleware para express que implementan ciertas best practices de seguridad para sanitizar los request que llegan a nuestra aplicación así como también los responses que salen.

##### ¿Por qué elegimos Helmet?

Helmet nos ofrece protección para 12 tipos diferentes de ataques además de que es una librería ampliamente utilizada y estándar en el stack tecnológico de NodeJS.

* ContentSecurityPolicy for setting Content Security Policy  
* Crossdomain for handling Adobe products’ crossdomain requests  
* DnsPrefetchControl controls browser DNS prefetching ✓
* ExpectCt for handling Certificate Transparency   
* Frameguard to prevent clickjacking  ✓
* HidePoweredBy to remove the X-Powered-By header ✓
* Hpkp for HTTP Public Key Pinning   
* Hsts for HTTP Strict Transport Security ✓
* IeNoOpen sets X-Download-Options for IE8+ ✓
* NoCache to disable client-side caching   
* NoSniff to keep clients from sniffing the MIME type ✓
* ReferrerPolicy to hide the Referer header  
* XssFilter adds some small XSS protections ✓

Los tildados son los que vienen activados por defecto.

#### JSON Web Token

###### ¿Por qué usamos JSON Web Tokens?

Además de por ser requisito del TP :P

###### Guardar datos en los JWT

Con un enfoque basado en cookies, simplemente guardamos el identificador de sesión.

Los tokens por otro lado nos permiten guardar cualquier tipo de metadata, siempre que se trate de un JSON válido.

La especificación de JWT indica que podemos incluir diferentes tipos de datos (llamados claims), y que se pueden guardar como datos reservados, públicos y privados.

Dependiendo del contexto, podemos optar por usar una cantidad mínima de claims, y guardar sólo la identificación de usuario y el vencimiento del token, o bien podemos incluir claims adicionales, como el email del usuario, quién emitió el token, los alcances y/o permisos de los que dispone el usuario, etcétera.

###### Performance
Al utilizar una autenticación basada en cookies, desde backend se debe realizar una búsqueda de la sesión (correspondiente al identificador enviado por el cliente; ya sea en archivos, en una base de datos SQL tradicional o una alternativa NoSQL). En ese caso es muy probable que la ida y vuelta tome más tiempo si lo comparamos con la decodificación de un token. Además, como se pueden almacenar datos adicionales en los tokens (como el nivel de permisos), podemos disminuir la cantidad de búsquedas requeridas para obtener y procesar los datos solicitados.

Por ejemplo, supongamos que tenemos un recurso /api/orders en nuestra API que devuelve las últimas órdenes registradas en nuestra aplicación, pero sólo los usuarios con rol administrador tienen acceso para ver esta data.

En un enfoque basado en cookies, una vez que se realiza la petición, desde backend es necesario hacer una consulta para verificar que la sesión es válida, otra búsqueda para acceder a los datos del usuario y verificar que tenga el rol de administrador, y finalmente una tercera consulta para obtener los datos.

Por otro lado, usando JWT, podemos guardar el rol del usuario en el token. Así, una vez que la petición se realiza y el token se valida, necesitamos realizar una sola consulta a la base de datos (para acceder a la información de las órdenes).

###### Listo para móviles
Las APIs modernas no solo interactúan con el navegador.

Escribir correctamente una API implica que pueda ser usada tanto por navegadores como desde plataformas móviles nativas (como iOS y Android).

Las plataformas móviles nativas y las cookies no operan muy bien en conjunto, ya que se debe tener en cuenta toda una serie de consideraciones para su correcto funcionamiento.

Los tokens, por otro lado, son mucho más fáciles de implementar (tanto en iOS como en Android). También son más fáciles de implementar para aplicaciones y servicios de Internet of Things (que no incorporan el concepto de gestión de cookies).

##### ¿Por qué elegimos la librería jsonwebtoken?

Por ser la librería más ampliamente utilizada para este propósito en el contexto de NodeJS, lo que implica cierto grado de maduración.

#### Moment

##### ¿Por qué usar una librería para formateo de fechas?
Encapsulando los distintos formateos que necesitemos a los largo de la aplicación en un helper de fechas nos aseguramos de que los programadores accederán a los formatos correctos, por otro lado utilizando una librería probada para esto nos aseguramos de no reinventar la rueda y acceder a un producto probado con un grado de maduración elevado.

#### ¿Por qué elegimos Moment?
Por ser una librería liviana, madura y altamente extendida.

#### Properties Reader

##### ¿Por qué usar properties externas?
Para tener la ventaja de poder modificar algo que puede variar sin tener que tocar distintos archivos del código fuente y recargar o recompilar la aplicación.

Esto es especialmente útil para inyectar distintas configuraciones correspondientes a distintos environments léase, dev, testing, staging, producción.

#### Winston

##### ¿Por qué logguear?
Los logs son importantes en distintos momentos. A nivel preventivo se puede llegar a prever errores evaluando la saludo de nuestra aplicación mediante el monitoreo, tomando acciones correctivas para que este no suceda. Cuando el error ya sucedió, es importante contar con un log que nos permita trazar con facilidad el error con un identificador correlacional para poder entender por qué sucede y corregirlo.
Por otro lado, logs del sistema también pueden servir para auditar los datos enviados y recibidos entre subsistemas de manera tal de resolver una discrepancia y ver quien está equivocado.

##### ¿Por qué elegimos Winston Logguer?
Winston logguer es un logguer asincrónico, lo cual es bastante deseable ya que no bloquea el único hilo de NodeJS, es multi-transporte, de manera tal que podemos configurar varias formas de output, ya sea por consola, archivo, o incluso bajar un transporte para Winston desarrollado por un tercero (ej. integración con ELK mediante transporte para Logstash) mediante yarn o npm, además de que extremadamente configurable en cuestiones de formato.

Por las razones antes mencionadas se ha convertido en el logguer estándar para NodeJS, lo que implica que ha tenido un grado de maduración alto, está ampliamente extendido y testeado.

###### UUID
Implementamos la librería UUID para generar un identificador de correlación, a partir de un current timestamp, entre logs para poder trazarlos con facilidad.

#### Eslint con estilo Airbnb

##### ¿Por qué debemos usar un linter?

Un linter es un software que asiste al programador en fundamentalmente 2 objetivos:
  * Evitar haga algo en su código que sea considerado bad practice y mejor aún que implemente las best practices.
  * Asistirlo para que su código siga la línea de estilo definida por el equipo y/o compañía en general.

##### ¿Por qué esto me beneficia?

* Aplicar best practices en tu código hace que este sea menos propenso a errores y/o problemas relacionados con la calidad del producto final, como por ejemplo detrimentos de performance o agujeros de seguridad.

* Seguir una guía de estilo nos permite escribir codigo más homogéneo con el resto del equipo y/o compañía de forma tal que la curva de entendimiento de este es menor, lo que facilita el mantenimiento haciendo que cualquier programador pueda mantener código de otro programador.

#### Jasmine

##### ¿Por qué necesitamos testing automatizado?

El testing automatizado es uno de los pilares fundamentales del concepto de integración continua que a su vez es uno de los pilares fundamentales de la filosofía DevOps.

Es necesario implementar distintos niveles de testing automatizado para poder evaluar a esos niveles, constantemente y sin esfuerzo la saludos del código que se pretende integrar. Algunos de estos niveles son:

* Test unitario a nivel de clase.
* Test de API E2E, end to end.
* Test de interfaces de usuario, mayormente conocido como "funcional".

##### ¿Por qué elegimos Jasmine?

Siendo que el TP es una API nosotros necesitábamos hacer test unitario y de API. Jasmine cumple con estos 2 propósitos perfectamente.

Lo elegimos particularmente por sobre otros por ser liviano y altamente extendido, lo que implica maduración además de que es una suite completa en contraposición al otro más popular que es Mocha, quien necesita chai para completar la funcionalidad que se esperaría de un framework de test automatizado. 

##### Request
Request es una librería ampliamente extendida para ejecutar request http la cual usamos para ejecutar request desde los test de API.

#### JSDoc

##### ¿Por qué documentar y/o comentar el codigo?

Las ventajas de esto son claras y bien conocidas y hacen a la facilidad de mantenimiento de un producto a los largo de todo su ciclo de vida.

##### ¿Por qué elegimos JSDoc?

Por ser el estándar de JS para documentar el código además que existen herramientas como la elegida jsdoc para sacar reportes de manera automática a partir del parseo de este formato en el código.

#### PM2

##### ¿Por qué usar un administrador de procesos?

La arquitectura de NodeJS define claramente un solo hilo de ejecución para nuestro código, de forma tal que para poder sacarle juego al Hardware debemos diseñar e implementar aplicaciones stateless para luego clusterizarlas, PM2 nos ayuda a hacer esto último. Entro otras ventajas de deploy, gestión y monitoreo.

##### ¿Por qué elegimos PM2?

###### La aplicación se mantiene siempre viva
La aplicación se mantendrá siempre viva, reiniciando la instancia particular que haya tenido el crash, o al reiniciar el servidor se iniciara sola.

###### Monitoreo
Las instancias manejadas de esta manera y su salud pueden ser fácilmente monitoreadas local como remotamente. Se pueden monitorear además cuestiones sobre consumo de memoria y procesador previniendo fallas que puedan llegar a ocurrir en producción.

###### Gestión de logs
Logs de alto nivel out of the box.

###### Balanceo de carga y 0 down time deploy
Balanceo de carga sin ninguna configuración. PM2 balance la carga entre instancias. Esto también nos permite hacer deploy con 0 down time.

###### Argumentos CLI
Haciendo uso de argumentos de CLI podemos configurar PM2 para funcionar en distintos entornos.

###### Logging management
Manejo de loggins básicos entre instancias.

###### Deploy automatizado simple
PM2 deploy nos ofrece una forma práctica y sencilla de realizar deploys.

#### Docker

#### ¿Por qué usar Docker?

* Docker nos permite asegurarnos de que la aplicación corre en un ambiente con precisamente, ni más ni menos que las librerías que necesita (Docker multistage, buildeamos en un contenedor y deployamos en otro más liviano), como si fuese una VM pero con la ventaja de ser mucho más compacto un contenedor que una máquina virtual.
* De esta misma forma sabemos que si tenemos más de una misma aplicación corriendo en el mismo nodo ya sea lógico o físico, estas están aisladas entre ellas en sus respectivos contenedores y que sus dependencias no tendrán conflictos entre ellas.
* Podemos compartir una aplicación simplemente compartiendo el archivo de imagen del contenedor lo que facilita mucho las tareas de integración continua.

## Testing

Parado en el root del proyecto ejecuta:

```bash
npm test
```

El comando ejecutara todos los test de la aplicación y mostrara en la consola un reporte con todos los casos probados y una descripción de lo que implico cada caso.

## Deploy

### Buildeando el container por única vez.

Parado en cualquier carpeta:

```bash
git clone https://github.com/Rocket-Buddha/tp-notifier.git
cd tp-notifier
```

Para buildear en el contenedor, parado en el root del proyecto.

```bash
docker build -t tap/tp-notifier .
```

Una vez generado hay que levantarlo. Podes configurar el puerto que quieras dependiendo de tu despliegue en producción.

En este ejemplo todos las conexiones entrantes al puerto 49568 se fowardiaran al puerto 8080 del contenedor, en donde corre la app.

```bash
docker run --security-opt apparmor:unconfined -p 8080:8080 -p 9615:9615 -d tap/tp-notifier
```

Para ambientes productivos es más recomendable:

```bash
docker run -p 49568:8080 -d tap/tp-notifier
```

#### Helpers

Para poder revisar el contenedor:

```bash
sudo docker exec -i -t <container_id> /bin/bash
```

Borrar todos los contenedores:

```bash
docker rm $(docker ps -a -q)
```

Borrar todas las imagenes:

```bash
docker rmi $(docker images -q)
```

Una vez finalizadas las tareas de deploy:

```bash
cd ..
rm -f /tp-notifier
```

### Inyectando properties productivas

Inyecta tus properties de producción en tp-notifier/env/app.properties.

### Monitoreo en producción

```bash
docker exec -i -t <container_id>  node_modules/.bin/pm2 logs
```

```bash
docker exec -it <container_id> node_modules/.bin/pm2 monit
```