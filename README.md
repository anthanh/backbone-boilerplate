backbone-boilerplate
====================

Este proyecto es una plantilla de esqueleto de aplicación web gestionado con Yeoman 0.9.6, con librerías típicas y
herramientas de test integradas (unitarios, mocks, cobertura, ...).


## Librerías

* Arquitectural
  * Backbone
  * Marionette
  * Lodash (con opción a underscore)
* AMD
  * requireJS (Desarrollo)
  * almond (Producción)
* Presentación
  * JQuery
  * Bootstrap (SASS version)
  * Modernizr
* Internacionalización
  * i18next
  * momentJS
  * numeralJS
* Testing
  * Mocha (+ PhantomJS)
  * Chai
  * Sinon.JS


## Dependencias

Las dependencias entre librerías están definidas en el siguiente archivo:
```
app/scripts/config.js
```

## Estructura del proyecto

```
/
├── app         Código fuente webApp
│   ├── components		// componentes instalados desde ** Yeoman
│   ├── images			// Recursos gráficos
│   ├── lib				// Librerías externas utilizadas en la webApp
│   ├── locales			// Recursos localizados
│   │   ├── en-GB
│   │   └── es-ES
│   ├── scripts			// Scripts JS específicos de la webApp
│   │   ├── layouts
│   │   ├── models
│   │   ├── modules
│   │   ├── routers
│   │   └── views
│   └── styles			// Estilos de la webApp
│       └── bootstrap
├── componentes			// componentes instalados desde Yeoman
├── node_modules			// componentes node instalados localmente
│   └── jade
├── temp				// Directorio de trabajo de Yeoman
├── test				// Proyecto paralelo para testear la webApp
│   ├── lib				// Librerías externas necesarias para testing
│   └── runner			// Los diferentes modos de ejecución de los testings (xunit, phantomJS, mocha, coverage, ...)
│   ├── output 			// Resultados de los tests
│   └spec				// Conjunto de tests
└── dist				// Directorio de distribución de Yeoman
```

## Convención de nombres

### Ficheros
Todos los ficheros JS se nombran en minúsculas y con el nombre de la clase o módulo que contengan: session.js, logger.js, profile.js...

### Clases:
Todos los nombres de clases en el código se escribiran en notación upper camel case.
Todos los nombres de fichero se escribiran sin ningún tipo de sufijo al final, su tipo se identifica por el directorio en el que se encuentra.

### Modelos:
Los modelos en código estarán definidos por un nombre que los identifique y los describa lo mejor posible.
```
var User = Backbone.Model.extend({
```

### Vistas:
El nombre de las vistas en el código tienen la terminación "View".
```
var LoginView = Backbone.Marionette.ItemView.extend({
```
### Otros:

### Templates
Los templates que se definan deberán seguir el siguiente formato de nombres:
```
script type="text/template" id="login-template" 
```
Donde login es el nombre de la vista asociada

### Hojas de estilo
Cada hoja de estilo definirá el aspecto de un componente siempre que se pueda.

### Textos localizados
Los nombres que usaremos para identificar los ficheros localizados estarán contemplados dentro del rango de lenguajes-países que define la ISO. [pendiente]

### Literales
[Pendiente]

### Variables
El formato usado para nuestras variales seguirá el estilo lower camel case.


## Configuración
Existe un módulo llamado `scripts/common.js` donde se almacenan todos los parámetros que influyen en el comportamiento y en el funcionamiento de la aplicación web.

Los parámetros que se pueden configurar son los siguientes:

* **mode**: `PRODUCTION`|`DEVELOPER, el modo en el que está la aplicación, para poder cambiar el comportamiento o falsear módulos cuando sea necesario.
* **version**: La versión de la aplicación.
* **clientType**: Tipo del cliente, puede ser interesante para el servidor.
* **enviroment**: Parámetros adicionales que complementan a la versión.
* **apiGateway**: Ruta hasta la raíz de los recursos en el servidor
`http://domain.com/gateway`
* **gatekeeper**: Indica si se comprueba cuando un usuario está autenticado o no.
* **defaultLang**: Es el idioma por defecto para la aplicación web.
* **wwwRoot**: Es un parámetros que se auto inicializa con la ruta del frontend.
* **logToServer**: Indica si los logs se envían al servidor o no.
* **logLevel**: Indica hasta qué nivel de log se quiere registrar
   * 0 - `none`
   * 1 - `error`
   * 2 - `warning`
   * 3 - `info`
   * 4 - `debug`
* **logBuffer**: Indica el tamaño del buffer de log hasta que se envía al servidor.
* **localesURL**: Ruta hasta los archivos de localización de i18next.



## Construir projecto
Aunque este proyecto esté basado en Yeoman (por lo que se pueden lanzar comandos de cosntrucción específicos de yeoman), el script específico para su construcción es el siguiente:
```
bash scripts/build-min.sh
```
Este script realiza todas las tareas típicas de la construcción con Yeoman (compilar, minimizar, concatenar, optimizar, etc.), más tareas de limpieza del proyecto post construcción y generación del artefacto para su distribución, por ejemplo, a un sistema de integración continua.

## Levantar servidor de desarrollo
Para levantar un servidor de desarrollo que se actualize automáticamente a cada cambio en el código basta con lanzar el siguiente comando:
```
yeoman server
```

## Ejecutar tests unitarios
[Pendiente]


## Vistas

Dependiendo del tipo de vista que queramos crear, tenemos los siguientes componentes de Marionette:

* Backbone.Marionette.ItemView: Para vistas específicas
* Backbone.Marionette.LayoutViewView: Para vistas estructurales, para albergar otras vistas (Items o Layouts)

Existe más documentación detallada en [Marionette](https://github.com/marionettejs/backbone.marionette/tree/master/docs)

Para crear vistas, primero hay que darlo de alta en la factoría de vistas en 'scripts/modules/viewFactory.js'.

Una vez dado de alta, puede instanciarse cualquier vista de la siguiente forma:
```
var wizardHeader = app.factory.view.create({view: 'WizardHeader'});
```
```
var wizardForm = app.factory.view.create({
	view: 'WizardForm', 
	options: {
		model: profile
	}
});
```

### Templates

La librería que utilizaremos para renderizar los templates de cliente será la que utiliza Backbone por defecto, Underscore, pero modificada para que los tag sean similares a los utilizados en Handlebars | Mustache, no solo con la idea de cambiar la librería que los renderiza sino también por la facilidad de aplicar dichos tag frente al default de Underscore.

Todos los templates se encuentran como `<script type="text/template"></script>` en `index.html`

## Modelos

Utilizaremos los modelos que nos orporciona Backbone para representar objetos del dominio deseado `Backbone.Model` para modelos específicos y `Backbone.Collection` para albergar un listado de modelos.

Para crear modelos o colecciones, primero hay que darlo de alta en la factoría de modelos en 'scripts/modules/modelFactory.js'.

Una vez dado de alta, puede instanciarse cualquier modelo de la siguiente forma:
```
var profile = app.factory.model.create({model: 'Profile'});
```
```
var profile = app.factory.model.create({
	model: 'Profile', options: {
		// model_attributes
	}
});
```

## Eventos



## Eventos de aplicación

## Router

En principio se hace uso de `Backbone.Router` estándar de Backbone, pero siempre se puede cambiar a `Backbone.Marionette.AppRouter` cuando haga falta mayor estructuración.

## Modales

Existe implementado un método sencillo para mostrar modales, un ejemplo sencillo se puede encontrar en 'scripts/views/playground/playground.js':

Para mostrar un modal basta con levantar un evento en la aplicación:

Para mostrar un modal sencillo con una única opción (aceptar) y un mensaje, basta con lanzar el siguiente evento:
```
app.vent.trigger('modal', {
	model: new Backbone.Model({
		title: 'Lo sentimos',
		body: 'Correo o contraseña incorrecta.'
	})
});
```

Sin embargo, existen ocasiones en las que es necesario que el modal tenga una vista más compleja y por lo tanto lógica específica, por lo que se puede pasar una vista como contenido de la modal:
```
app.vent.trigger('modal', {
	view: 'RegisterExtraSportActivityModalView',
	model: new Backbone.Model({
	    title: 'Modal title!'
	})
});
```

## API
Este módulo está implementado en scripts/modules/api.js y se encarga de encapsular las peticiones asíncronas al servidor en una API de alto nivel.
Además se encarga de transformar la respuesta en modelos o colleciones Backbone.

## Sesión
Este módulo está implementado en scripts/modules/session.js y se encarga de encapsular y albergar las operaciones relacionadas con la sesión del usuario logeado.


## Internacionalización
El módulo de internacionalizacións e puede encontrar en `scripts/modules/locale.js`.
Para la internacionalización de la aplicación usamos las siguientes librerías:
* i18next: Para textos en general con plurales y géneros.
* Moment: Para manejo e internacionalización de fechas.
* Numeral: Para formatear todo tipo de números y cantidades.

## Logger
Este módulo se encarga de gestionar los logs y ofrecer la oportunidad de enviar trazas a un servidor para posteriores análisis y detección de errores. Su implementación se puede encontrar en `scripts/modules/logger.js`.

En nuestro caso se ha desarrollado un módulo que sobreescribe los métodos de escritura en consola por defecto del navegador, mandando la información que nos interese al servidor.

Los distintos métodos de log sobreescritos son:

    console.error: método que se llama automáticamente cuando se produce un error en el código javascript. La ejecución/interpretación del código para.
    console.warn: método que se llama automáticamente cuando se produce una alerta en el código javacscript. La ejecución/interpretación del código continua.
    console.info: método que llamamos para transferir información de interesa acerca de la actividad del usuario al servidor. Su formato está en la siguiente wiki.
    console.debug: método que llamamos para conocer el estado interno de la aplicación y facilitar un poco el desarrollo.

La información obtenida de la consola del navegador la mandamos al servidor en formato JSON.

Por defecto la consola se envía al servidor cada 5 trazas de información o error.

Se puede configurar los parámetros del log en 'scripts/common.js', tanto el tamaño del buffer de log, como la ruta al recurso del servidor donde se almacenan.




