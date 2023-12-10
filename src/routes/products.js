// ************ Require's ************
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const multer = require('multer')

// ************ Controller Require ************


const productsController = require('../controllers/productsController');

// /*** GET ALL PRODUCTS ***/ 
//para este tengo que poner un for en index ???
router.get('/', productsController.index); 





// /*** CREATE ONE PRODUCT ***/ 
/* Para mostrar todos los productos */
 router.get('/create/', productsController.create); 
//el 2°do paramepro, son ".single", para procesar el campo "image" del formulario, para aplicarle la logica "upload"
 router.post('/',upload.single('image'), productsController.store); 






// /*** GET ONE PRODUCT ***/ 
router.get('/:id/', productsController.detail); // /products/15/

//cuando pido un producto puedo editarlo o liminatlo 





// /*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', productsController.edit); 
router.put('/:id', productsController.update); 






// /*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy); 




module.exports = router;
