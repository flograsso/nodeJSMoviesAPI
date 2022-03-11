# Movies API Node JS

API que permite interfacear con un backend de administracion de peliculas

**Provee los siguientes métodos:**
- Registrar un nuevo usuario
- Autenticar un usuario mediante la obtencion de un token
- Listar peliculas (obtenidas de IMDB) con la opcion de filtrar por un keyword (filtro en campo "title"). Solo para usuarios autenticados
- Agregar una pelicula a la base de datos de peliculas favoritas del usuario. Solo para usuarios autenticados
- Listar las peliculas favoritas del usuario. Solo para usuarios autenticados
- Utiliza un archivo txt para almacenar los usuarios y otro para almacenar las peliculas favoritas del usuario.



## Puesta en marcha

1. Instalar dependencias (algunos paquetes requieren de sudo para instalarse) con : 
```
sudo npm install  
```

2. Correr la aplicacion con:
```
npm start
```

3. Correr los tests con:
```
npm test
```

## Colección de requests en Postman

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/5863112-379997ae-0752-4847-87d5-5757a868e8d2)

