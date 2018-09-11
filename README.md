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
  * un valor predeterminado
  * una función de validación personalizada
  * indica que se requiere un campo
  * una función get que le permite manipular los datos antes de que se devuelva como un objeto
  * una función de conjunto que le permite manipular los datos antes de guardarlos en la base de datos
  * crear índices para permitir que los datos se obtengan más rápido

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

#### Debug

#### Helmet

#### JSON Web Token

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