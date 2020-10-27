const express = require('express');
require('dotenv').config();
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { dbConnection } = require('./database');
const { format } = require('timeago.js');

// Crear el servidor de express
const app = express();
//conexion a DB
dbConnection();
app.set('port', process.env.PORT || 4000);
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//midlewares 
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
/**
 * configuracion de multer 
 * añadimos uuid 
 */
const storage  = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) =>{
        cb(null, uuidv4() + path.extname(file.originalname) );
    }
});
app.use(multer({storage:storage}).single('image'));

//rutas
app.use(require('./routes/images'));
//global variables 
app.use((req, res, next) =>{
    app.locals.format = format;
    next();
})
//static files 
app.use(express.static(path.join(__dirname, 'public')));
// Escuchar peticiones
app.listen( app.get('port'), () => {
    console.log(`Servidor corriendo en puerto ${app.get('port')}`);
});