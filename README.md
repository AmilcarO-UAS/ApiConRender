
# Comando para ingresar al contenedor
docker exec -it nodeJS_ApiPeliculas sh

npm init -y
npm install express sequelize sqlite3

# Si ya esta package.json ejecutar este comando para descargar las dependencias
npm install


npm install nodemon


### Comandos agregar a package.json manualmente en scripts
"start": "node app.js",
"dev": "nodemon app.js"



# Cambiar ultima parte de dockerfile a:
command: sh
tty: true
stdin_open: true

# Para poder inicializar el proyecto y crear el package.json


# Para insertar peliculas:
docker exec -it nodeJS_ApiPeliculas sh node seed.js


# Instalar nuevas librerias
docker exec -it nodeJS_ApiPeliculas npm install jsonwebtoken

docker exec -it nodeJS_ApiPeliculas sh -c "npm install jsonwebtoken"