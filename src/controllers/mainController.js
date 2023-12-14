
const productService = require('../data/productService')





const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		/*es para que muestre la vista  */
		res.render( "index",{productos: productService.getAll()});
	},
	search: (req, res) => {
	
		/*
		En la vista index, el buscador que envia la peticion con GET ,
		se encuentra espesificado en "partials/headerNavbar"

		vamos a responde la peticion GET del buscador
		 */


       
        res.send("Estas buscando "+ req.query.Serchkeywords);
		/*pero la información enviada a través de una solicitud GET se encuentra generalmente en req.query */
		

	}
};

module.exports = controller;
