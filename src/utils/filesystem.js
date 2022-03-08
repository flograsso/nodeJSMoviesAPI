//const fs = require('fs')
// version de promesas
const fs = require('fs').promises;
const filesystem = {};

/**
* Funcion para escribir en filesystem. Primero lee todo el archivo, agrega el dato y vuelve a escribirlo entero
* @param    {String} path       ruta del archivo
* @param    {JSON} content    datos a almacenar en formato JSON
*/
filesystem.fsPush = async function (path, content){
    readed = await filesystem.fsRead(path); // Leo el archivo
    readed.push(content); // Agrego el contenido
    readed = JSON.stringify(readed,null,"   ") // Convierto a JSON 
    // Escribo
   
   try {
    await fs.writeFile(path, readed);
  } catch(err) {
    console.log(err); // TypeError: failed to fetch
  }
}
// Mejora: en caso de archivos muy extensos, es preferible utilizar Streams.


filesystem.fsWrite = async function (path, content){
  try {
    await fs.writeFile(path, JSON.stringify(content,null,"   "));
  } catch(err) {
    console.log(err); // TypeError: failed to fetch
}
}

/**
* Funcion para leer en filesystem
* @param    {String} path       ruta del archivo
* @return   {String} content    datos leidos
*/
/*
filesystem.fsRead =  function (path){
    fs.readFile(path,'utf8', (error,content) => {
        if (error) {
          console.error(error)
          return
        }
        console.log("Logueo");
        console.log(content);
        return content;
      })
}
*/
// Mejora: en caso de archivos muy extensos, es preferible utilizar Streams.
filesystem.fsRead =  async function (path){
   data = await fs.readFile(path, 'utf8');
  const content = JSON.parse(data);
  //console.log(content)
  return content;
 
  
}

module.exports = filesystem;