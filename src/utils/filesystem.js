// filesystem.js
// Archivo con funciones para el manejo de archivos

// fs con promesas
const fs = require('fs').promises;

const filesystem = {};

/**
* Funcion para agregar datos en un archivo del filesystem. 
* @param    {String} path       ruta del archivo
* @param    {JSON} content      datos a agregar en formato JSON
*/
filesystem.fsPush = async function (path, content){
    try {
        readed = await filesystem.fsRead(path); // Leo el archivo
        readed.push(content);   // Agrego el contenido
        readed = JSON.stringify(readed,null,"   ") // Convierto a JSON 
        await fs.writeFile(path, readed); // Escribo en archivo
    }  
    catch(err) {
        console.log(err); // TypeError: failed to fetch
    }
}
// TODO: En caso de archivos muy extensos, es preferible utilizar Streams.

/**
* Funcion escribir en un archivo del filesystem. Reemplaza su contenido
* @param    {String} path       ruta del archivo
* @param    {JSON} content      datos a agregar en formato JSON
*/
filesystem.fsWrite = async function (path, content){
    try {
        await fs.writeFile(path, JSON.stringify(content,null,"   "));
    } 
    catch(err) {
        console.log(err); // TypeError: failed to fetch
    }
}

/**
* Funcion para leer de un archivo del filesysten
* @param    {String} path       ruta del archivo
* @return   {Object} content    datos leidos
*/
filesystem.fsRead =  async function (path){
    data = await fs.readFile(path, 'utf8');
    const content = JSON.parse(data);
    return content;
}
// TODO: En caso de archivos muy extensos, es preferible utilizar Streams.

module.exports = filesystem;