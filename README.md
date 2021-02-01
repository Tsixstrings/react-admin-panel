# React Admin Panel

Un simple panel de administracion con login y CRUD de clientes y productos.

## Usuarios

Especificados en el archivo src/Login/Users.json

## CRUD Clientes

Hace uso de json-server para gestionar los datos desde un archivo JSON. (db.json).
Para iniciarlo debemos ejecutar el siguiente comando dentro del directorio del proyecto:

```sh
$ json-server --watch db.json --port 3001
```

## CRUD Productos
Esta sección hace uso de un servidor Graphql, el cual es un proyecto externo.
Puede descargarse desde aqui [simple-graphql-volatile-server](https://github.com/Tsixstrings/simple-graphql-volatile-server).

Para ejecutarlo simplemente abrimos una nueva consola y ejecutamos:
```sh
$ node index.js
```