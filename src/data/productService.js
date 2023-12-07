/*Es para gestionar todo el manejo de mis productos, para no tener
toda la logica en el "productController" y no ser muy grande
*/

const fs = require('fs');
const path = require('path');

const produtos = require('../data/productsDataBase.json');





const productService = {

    

    getAll: function(){
        /*****Es para pasar el JASON a un arreglo de objetos y poder manipularlo ******/
        const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


        return products;    
    },
    save : function(product){

    }

}

module.exports = productService;