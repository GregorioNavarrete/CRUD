/*Es para gestionar todo el manejo de mis productos, para no tener
toda la logica en el "productController" y no ser muy grande
*/

const fs = require('fs');
const path = require('path');
const upload = require('../middlewares/multer');



const produtos = require('../data/productsDataBase.json');

/*****Es para pasar el JASON a un arreglo de objetos y poder manipularlo ******/
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');



const productService = {

    //es un atributo que tiene todos los productos en un Arrglo de objetos
    products:JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')),

    getAll: function(){
        return this.products;    
    },
    save : function(req){
        if (req.file !== undefined) {
            //le paso todo el req al back
            let product = req.body;
            let imagen = req.file;
            product.image = imagen.filename;//no me reconose el filename

            //ME BUSCA EL OBJ, CON EL id MAS GRANDE
            let mayorID = this.products.reduce((maxID, Obj) => {
                if (Obj.id > maxID.id) {
                    return Obj;
                } else {
                    return maxID;
                }
                });
            product.id = mayorID.id+1;
            //Lo agrego al nuevo producto al arreglo de OBJ de productos
            this.products.push(product);
            //re escribimos el JSON anterio por el nuevo con mi nuevo producto
            fs.writeFileSync(productsFilePath,JSON.stringify(this.products),'utf-8');
        } else {            
            let product = req.body;
            //como no se puede poner null, los deja sin campo image
            //let imagen = "null";  con string traba el html 
            product.image = 0;

            //ME BUSCA EL OBJ, CON EL id MAS GRANDE
            let mayorID = this.products.reduce((maxID, Obj) => {
                if (Obj.id > maxID.id) {
                    return Obj;
                } else {
                    return maxID;
                }
                });
            product.id = mayorID.id+1;
            this.products.push(product);
            fs.writeFileSync(productsFilePath,JSON.stringify(this.products),'utf-8');
        }
        
       // let nuevoProducto ={
           // id: 4,     Tenia un metodo raro implenteara esto
        //    name: product.name,
        //    description: product.description,
        //    price: product.price,
        //    discount: product.discount,
        //    image: imagen.filename ,
       //     category: product.category
       // }
    },

    getOne: function(id){
        product = this.products.find((elem)=>elem.id == id);
            return product;
    },

    delete: function(id){
        indice = this.products.findIndex((elem)=>elem.id == id);
        this.products.splice(indice,1);
        fs.writeFileSync(productsFilePath,JSON.stringify(this.products),'utf-8');
    },
    edit: function(req){
        let producto = this.getAll(req.params.id);
        let nuevoProducto = req.body; // es porque el PUT viaja de forma privada

        producto.name = nuevoProducto.name;
        producto.price = nuevoProducto.price;
        producto.discount = nuevoProducto.discount;
        producto.category = nuevoProducto.category ;
        producto.description = nuevoProducto.description;

        let indece = this.products.findIndex(elem => elem == req.params.id);
        this.products[indece]= producto;
        fs.writeFileSync(productsFilePath,JSON.stringify(this.products),'utf-8');
    }

}

module.exports = productService;