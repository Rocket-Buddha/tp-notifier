# Técnicas avanzadas de programación - Trabajo practico N° 1

## Resumen

### Arquitectura

### Librerías utilizadas

#### Express

##### ¿Que es ExpresJS?

Express es un framework para aplicaciones web Node.js mínimo y flexible, basado en Sinatra (framework Ruby opuesto a Rails) que proporciona un conjunto sólido de características para las aplicaciones web (full stack o backend) y móviles como:

* Direccionamiento
* Funciones middleware
* Motores de plantillas
* Manejo de errores
* Debug

##### ¿Por que lo elegimos?

Lo elegimos por ser simple, flexible, rapido, estandar y suficiente para nuestra API.

#### MongoDB

##### ¿Que es MongoDB?

MongoDB es una base de datos no SQL, no relaccional y orientada a documentos.

##### ¿Por que elegimos MongoDB?

* Velocidad. Si una aplicación necesita almacenar o acceder a mucha información en poco tiempo, se necesita una base de datos que aporte gran velocidad. Las bases de datos documentales son capaces de ser mucho más rápidas que las relacionales, pudiendo atender clientes que necesiten realizar muchas operaciones por segundo.

* Volumen. En cuanto al tamaño de la base de datos, si tenemos una cantidad de información gigante o enorme, entonces tenemos unas necesidades importantes de volumen. Las bases de datos relacionales tienen tendencia a funcionar más lentamente cuando en una tabla se encuentran cantidades muy grandes de registros (del orden de un millón para arriba). Situaciones así obligan a los administradores a buscar soluciones, como dividir las tablas en diversos segmentos, produciendo un coste en el acceso a los datos y la operativa. Este no es un problema en las bases de datos NoSQL, que son capaces de administrar volúmenes gigantescos de datos en sus entidades.

* Variabilidad. En bases de datos relacionales el esquema de la información está minuciosamente definido de antemano. Por ejemplo, no puedes inventarte campos en los registros sobre la marcha. En las bases de datos documentales, como MongoDB, no hay problema en que cada documento almacene campos distintos, pudiendo ser flexibles en cuanto al esquema de la información.
Ante cualquiera de estas situaciones, las bases de datos pueden aportar una solución ideal para los proyectos. Sin embargo, siempre conviene recordar que no existen las balas de plata y las bases de datos relacionales todavía son muy importantes para la mayoría de las aplicaciones. Sobre todo, porque las ventajas de las NoSQL son en detrimento de ciertas operaciones básicas sobre los datos.

* Desventajas

  * Por ejemplo, la necesidad de joins (acceder a información de varias tablas a la vez, relacionando datos entre unas tablas y otras) son el día a día de cualquier motor de base de datos tradicional pero no resulta una funcionalidad habitual en las NoSQL. Esto está cambiando ya que la nueva versión 3.2 de MongoDB ha comenzado a implementar funcionalidades de joins en ciertas operaciones. Esto es interesante, porque cada vez más las bases de datos NoSQL serán capaces de entrar en terrenos donde las relacionales son más indicadas, y viceversa.

  * Lo que a día de hoy no se encuentra disponible en las NoSQL son los mecanismos para hacer transacciones entre varios documentos. Debido a esto, pueden no ser la opción más adecuada para ciertas operativas de negocio, ya que se tendrá que profundizar mucho en los mecanismos para almacenar la información y puede no compensar el esfuerzo.

#### Mongoose
##### ¿Qué es la Mongoose?

Mongoose es un Object Document Mapper (ODM). Esto significa que Mongoose le permite definir objetos con un esquema fuertemente tipado que se asigna a un documento MongoDB.

##### ¿Por que lo elegimos?
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
Ademas BCrypt utiliza rounds de hasheo lo que implica que un password hasheado de esta manera sera hasheado 2^n veces donde n es la cantidad de rounds.

Hoy en día por estas razones es el estándar un industria y por eso lo elegimos.

#### Body Parser

##### ¿Para que usar un Body Parser?

Body parser es una función middleware para utilizar con express. Básicamente intercepta todos los incoming requests y parsea el su contenido en un objeto JSON. Esto permite hacer uso del request desde el código de la API con muchísima más facilidad.

##### ¿Por que usamos Body Parser?

Parece ser el estandar por defecto con NodeJS y Express. Por lo tanto está altamente testeado y existe muchísimos ejemplo al respecto lo que facilita el desarrollo.

#### Helmet

##### ¿Que es Helmet?
Helmet es una colleccion de 12 funciones middleware para express que implementan ciertas best practices de seguridad para sanitizar los request que llegan a nuestra aplicacion asi como tambien los responses que salen.

##### ¿Por que elegimos Helmet?

Helmet nos ofrece proteccion para 12 tipos diferentes de ataques ademas de que es una libreria ampliamente utilizada y estandar en el stack tecnologico de NodeJS.

* ContentSecurityPolicy for setting Content Security Policy	 
* Crossdomain for handling Adobe products’ crossdomain requests	 
* DnsPrefetchControl controls browser DNS prefetching	✓
* ExpectCt for handling Certificate Transparency	 
* Frameguard to prevent clickjacking	✓
* HidePoweredBy to remove the X-Powered-By header	✓
* Hpkp for HTTP Public Key Pinning	 
* Hsts for HTTP Strict Transport Security	✓
* IeNoOpen sets X-Download-Options for IE8+	✓
* NoCache to disable client-side caching	 
* NoSniff to keep clients from sniffing the MIME type	✓
* ReferrerPolicy to hide the Referer header	 
* XssFilter adds some small XSS protections	✓

Los tildados son los que vienen activados por defecto.

#### JSON Web Token

###### ¿Por que usamos JSON Web Tokens?

Ademas de por ser requisito del TP :P.

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


##### ¿Por que elegimos la libreria jsonwebtoken ?

Por ser la libreria mas ampliamente utilizada para este proposito en el contexto de NodeJS, lo que implica cierto grado de maduracion.

#### Moment

##### ¿Por que usar una libreria para formateo de fechas?
Encapsulando los distintos formateos que necesitemos a los largo de la aplicacion en un helper de fechas nos aseguramos de que los programadores accederan a los formatos correctos, por otro lado utilizando una libreria probada para esto nos aseguramos de no reinventar la rueda y acceder a un producto probado con un grado de maduracion elevado.

#### ¿Por que elegimos Moment?
Por se runa libreria liviana, madura y altamente extendida.

#### Properties Reader

##### ¿Por que usar properties externas?
Para tener la ventaja de poder modificar algo que puede variar sin tener que tocar distintos archivos del codigo fuente y recargar o recomipilar la aplicacion.

Esto es especialmente util para inyectar distintas configuraciones correspondientes a distintos eviroments lease, dev, testing, staging, prod.

##### ¿Por que elegimos COMPLETAR?
COMPLETAR

#### Winston

##### ¿Por que logguear?
Los logs son importantes en distintos momentos. A nivel preventivo se puede llegar a preever errores evaluando la saludo de nuestra aplicacion mediante el monitoreo, tomando acciones correctivas para que este no suceda. Cuando el error ya sucedio, es importante contar con un log que nos permita trazar con facilidad el error con un identificador correlaccional para poder entender por que sucede y coregirlo.
Por otro lado, logs del sistema tambien pueden servir para auditar los datos enviados y recibidos entre subsistemas de manera tal de resolver una discrepancia y ver quien esta equivocado.

##### ¿Por que elegimos Winston Logguer?
Winston logguer es un logguer anincronico, lo cual es bastante deseable ya que no bloquea el unico hilo de NodeJS, es multi transporte, de manera tal que podemos configurar varias formas de output, ya se por consola, archivo, o incluso bajar un transporte para Winston desarrollado por un tercero (ej: integracion con ELK mediante transporte para Logstash) mediante yarn o npm, ademas de ques extremadamente configurable en cuestiones de formato.

Por las razones antes mencionadas se ha convertido en el logguer estandar para NodeJS, lo que implica que ha tenido un grado de maduracion alto, esta ampliamente extendido y testeado.

###### UUID
Implementamos la libreria UUID para generar un identificador de coorrelaccion, a partir de un current timestamp, entre logs para poder trazarlos con facilidad.

#### Eslint con estilo Airbnb

##### ¿Por que debemos usar un linter?

Un linter es un software que asiste al programador en fundamentalmente 2 objetivos:
  * Evitar haga algo en su codigo que sea considerado bad practice y mejor aun que implemente las best practices.
  * Asistirlo para que su codigo siga la linea de estilo definida por el equipo y/o compañia en general.

##### ¿Por que esto me beneficia?

* Aplicar best practices en tu codigo hace que este sea menos propenso a errores y/o problemas relacionados con la calidad del producto final, como por ejemplo detrimentos de performance o agujeros de seguridad.

* Seguir una guia de estilo nos permite escribir codigo mas homogeneo con el resto del equipo y/o compañia de forma tal que la curva de entendimiento de este es menor, lo que facilita el mantenimiento haciendo que cualquier programador pueda mantener codigo de otro programador.

#### Jasmine

##### ¿Por que necesitamos testing automatizado?

El testing automatizado es uno de los pilares fundamentales del concepto de integracion continua que a su vez es uno de lo spilares fundamentales de la filosofia DevOps.

Es necesario implementar distintos niveles de testing automatizado par poder evaluar a esos niveles, constantemente y sin esfuerzo la saludos del codigo que se pretende integrar. Algunos de estos niveles son:

* Test unitario a nivel de clase.
* Test de API E2E, end to end.
* Test de interfaces de usuario, mayormente conocido como "funcional".

##### ¿Por que elegimos Jasmine?

Siendo que el TP es una API nosotros necesitabamos hacer test unitario y de API. Jasmine cumple con estos 2 propositos perfectamente.

Lo elegimos particularmente por sobre otros por ser liviano y altamente extendido, lo que implica maduracion ademas de que es una suit completa en contraposicion al otro mas popular que es Mocha, quien necesita chai para completar la funcionalidad que se esperaria de un framework de test automatizado. 

##### Request
Request es una libreria ampliamente extendida para ejecutar request http la cual usamos para ejecutar request desde los test de API.

#### JSDoc

##### ¿Por que documentar y/o comentar el codigo?

Las ventajas de esto son claras y bien conocidas y hacen a la facilidad de mantenimiento de un producto a los largo de todo su ciclo de vida.

##### ¿Por que elegimos JSDoc?

Por ser el estandar de JS para documentar el codigo ademas que existen herramientas como la elegida jsdoc para sacar reportes de manera automatica a partir del parseo de este formato en el codigo.

#### PM2

##### ¿Por que usar un administrador de processos?

El problema del single thread de NodeJS. entro otras ventajas de deploy y gestion.

##### ¿Por que elegimos PM2?

###### Forever Alivelink
Once started, your app is forever alive, auto-restarting across crashes and machine restarts.

###### Process Managementlink
All your applications are run in the background and can be easily managed.

###### Log Managementlink
Application logs are saved in the hard disk of your servers into ~/.pm2/logs/.
Access your realtime logs with.

###### Zero-config Load-Balancerlink / clusterizacion de instancias
PM2 can scale up your application by creating several child processes that share the same server port. Doing this also allow you to restart your app with zero-seconds downtimes.

###### The Ecosystem: Behavioral Application Configuration
When deploying on multiple servers or when using multiple CLI arguments, an alternative to the command line becomes more conveninent for starting your apps.

The purpose of the ecosystem file is to gather all options and environment variables for all your applications.

###### Logging management
Manejo de loggins basicos entre instancias.

###### Easy deploy with SSHlink
Automate your deployment and avoid to ssh in all your servers one by one.
0 downtime deploy
greceful deploy

###### Monitoreo
You can monitor your app in the terminal and check app health (CPU usage, memory used, request/min and more).s

#### Docker

- Apps always run in the same environment (local computer, live server).
- Apps are sandboxed to keep them separate and avoid potential conflicts.
- Apps are easy to share with all their dependencies.

## Testing

Parado en el root del proyecto ejecuta:

```bash
npm test
```

El comando ejecutara todos los test del la aplicacion y mostrara en la consola un reporte con todos los casos probados y una descripcion de lo que implico cada caso.

## Deploy

### Buildeando el container por unica vez.

Parado en cualquier carpeta:

```bash
git clone https://github.com/Rocket-Buddha/tp-notifier.git
cd tp-notifier
```

Para buildear en el contenedor, parado en el root del proyecto.

```bash
docker build -t tap/tp-notifier .
```

Una vez generado hay que levantarlo. Podes configurar el puerto que quieras dependiendo de tu despliegue en prod.

En este ejemplo todos las conexiones entrantes al puerto 49568 se fowardiaran al puerto 8080 del contenedor, en donde corre la app.

```bash
docker run --security-opt apparmor:unconfined -p 8080:8080 -p 9615:9615 -d tap/tp-notifier
```

Para ambientes productivos es mas recomendable:

```bash
docker run -p 49568:8080 -d tap/tp-notifier
```

#### Helpers

Para poder revisar el contenedor:

```bash
sudo docker exec -i -t <container_id> /bin/bash
```

Borrrar todos los contenedores:

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

### Inyectando properties productivas.

Inyecta tus properties de produccion en tp-notifier/env/app.properties.

### Monitoreo en prod

```bash
docker exec -i -t 5ef56bd3f150 node_modules/.bin/pm2 logs
```

```bash
docker exec -it 302892fe565aa526d745fa94e27a87a8ea9a7064d20aadaec0db44a0cffe86b2 node_modules/.bin/pm2 monit
```