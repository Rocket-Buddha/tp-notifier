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

#### Properties Reader

#### Winston

#### UUID

#### Eslint con estilo Airbnb

#### Jasmine

#### Request

#### JSDoc

#### Docker

- Apps always run in the same environment (local computer, live server).
- Apps are sandboxed to keep them separate and avoid potential conflicts.
- Apps are easy to share with all their dependencies.

## Testing

## Deploy en prod manual

Parado en cualquier carpeta:

```bash
git clone https://github.com/Rocket-Buddha/tp-notifier.git
cd tp-notifier
```

Inyecta tus properties de produccion en tp-notifier/env/app.properties.

Para buildear en el contenedor, parado en el root del proyecto.

```bash
docker build -t tap/tp-notifier .
```

Una vez generado hay que levantarlo. Podes configurar el puerto que quieras dependiendo de tu despliegue en prod.
En este ejemplo todos las conexiones entrantes al puerto 49568 se fowardiaran al puerto 8080 del contenedor, en donde corre la app.

```bash
docker run --security-opt apparmor:unconfined -p 49568:8080 -d tap/tp-notifier
```

Para ambientes productivos es mas recomendable:

```bash
docker run -p 49568:8080 -d tap/tp-notifier
```

### Helpers

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