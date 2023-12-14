/*No entiendo bien este archivo

    modularisamos logica que no va en la "ruta products.js"
*/
const path = require('path');
//const path = require('../app');
const multer = require('multer'); //hay que instalarlo 


/*Los argumentos de los metodos STORAGE
    req = es el pedido que manda el cluente por el formulario   
    file= el archivo enviado
    cb= colback, para almacenar el archivo en el destino final
*/


const configPropiaStorage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
        let folder = path.join(__dirname, '../../public/images/products');//donde mandar el archivo
       cb(null, folder); 
    }, 
    filename: function (req, file, cb) { 
        //para definir el nombre del archivo 
        //compustos por "numeros unicos" + "indicar que es una imagens" + " la extencion .png o .jpg original del archivo"
       cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  } 
  })


//para decirle a multer que quiero usar la configuracion echa, como "Disco de almacenamiento de Archivos"

const upload = multer({storage : configPropiaStorage});

module.exports = upload;