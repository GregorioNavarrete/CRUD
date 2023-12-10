/************ Require's ***********
 Todos estos son módulos instalados utilizando npm y se utilizan para diferentes propósitos
 dentro de la aplicación.
*/
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE

// ************ express() - (don't touch) ************
/*Es para crear la aplicacion express */
const app = express();

// ************ Middlewares - (don't touch) ************
/*
  Son funciones que se ejecutan durante el ciclo de vida de la solicitud.
   Algunos de los middlewares utilizados aquí son:
        express.static: Sirve archivos estáticos desde el directorio "public".

        express.urlencoded y express.json: Parsean datos de formularios y solicitudes JSON.

        logger: Muestra información de registro sobre las solicitudes HTTP en la consola.

        cookieParser: Analiza las cookies del encabezado de la solicitud.

        methodOverride: Permite usar los métodos PUT y DELETE en formularios HTML.
*/

app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
/*usamos*/app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
/*usamos*/app.use(methodOverride('_method')); // Para poder pisar el method="POST" en el formulario por PUT y DELETE

// ************ Template Engine - (don't touch) ************
/*
  Establece el motor de plantillas como EJS y define la ubicación de las vistas.
*/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas



// ************ WRITE YOUR CODE FROM HERE ************






// ************ Route System require and use() ************
/*
Se utilizan rutas modulares para organizar y manejar las diferentes rutas de la aplicación.
 (mainRouter y productsRouter) serian rutas principales que apartir de ellas, salen la rutas parmetrisadas
  que pueden regresar distintas vistas.*/
const mainRouter = require('./routes/main'); // Rutas main
const productsRouter = require('./routes/products'); // Rutas /products

app.use('/', mainRouter);
app.use('/products', productsRouter);



// ************ DON'T TOUCH FROM HERE ************
// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// ************ exports app - dont'touch ************
module.exports = app;
