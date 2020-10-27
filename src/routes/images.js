const { Router } = require('express');

const router = Router();
const path =  require('path');
const { unlink } = require('fs-extra');
const Image = require('../models/Image');
/**
 * Rutas para las imagenes 
 */

router.get('/', async (req, res, next) =>{
    const images = await Image.find();
    res.render('index', {images: images});
});
router.get('/upload',(req, res, next) =>{
    res.render('upload');

});
router.post('/upload', async(req, res, next) =>{
    
    const image = new Image();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = '/img/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;
    console.log(image);
    await image.save();

    res.redirect('/');
    
});
router.post('/image/:id',async (req, res, next) =>{
    const { id } = req.params;
    const image =  await  Image.findById( id );
    console.log(`imagen de DB /id: ${image}`);
    res.render('profile', {image})
    

});
router.get('/image/:id/delete', async(req, res, next) =>{
    const { id } = req.params;
    //imagen eliminada 
    const image = await Image.findByIdAndDelete(id);
    //eliminar img de nuestro folder
    await unlink(path.resolve('./src/public' + image.path));
    res.redirect('/');
});


module.exports = router;