const fs = require('fs');
const path = require('path');
const productService = require('../data/productService');


const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
		res.render('index',{product : productService.getAll()});//me regresa el arreglo completo
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		let aux = productService.getOne(req.params.id);
		if(aux!== undefined){
			res.render('detail',{product:productService.getOne(req.params.id)});//me regrea solo un obj
		}else{
			res.send("id invalido");
		}
		
	},


	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		//Gracias a multer "req del usuari" tiene el campo "file" tenemos la info de la imagen aguardada
		//file es un OBJ que uno de sus atributos configurados es "filename: '1702076892532_img_.jpg'"
		console.log(req.file);
		// al metodo "save" le poso por parametro el OBJ "body" que obtengo del POST
		productService.save(req);

		//res.send(products); //Para ver si lo modifico, que si
		res.redirect('/products/');

	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		res.render('product-edit-form', ({productToEdit : productService.getOne(req.params.id)}));


	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		/*buscamos un prod por id y busco cambiarle los datos, por los que tengo en el req */
		productService.edit(req);
		res.redirect('detail/'+req.params.id);
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		productService.delete(req.params.id);
		res.send("El producto fue eliminado con exito");

	}
};

module.exports = controller;