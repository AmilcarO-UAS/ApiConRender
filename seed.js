const sequelize = require('./database');
const Pelicula = require('./models/Pelicula');

async function insertarPeliculas() {
  try {
    await sequelize.sync({ force: true });

    await Pelicula.bulkCreate([
      {
        titulo: 'The Shawshank Redemption',
        director: 'Frank Darabont',
        año: 1994,
        genero: 'Drama',
        duracion: 142,
        calificacion_imdb: 9.3,
        sinopsis: 'Dos hombres encarcelados desarrollan una amistad durante varios años mientras buscan esperanza y redención.'
      },
      {
        titulo: 'The Godfather',
        director: 'Francis Ford Coppola',
        año: 1972,
        genero: 'Crimen, Drama',
        duracion: 175,
        calificacion_imdb: 9.2,
        sinopsis: 'La historia de la familia Corleone y el traspaso del poder dentro de una organización criminal.'
      },
      {
        titulo: 'The Dark Knight',
        director: 'Christopher Nolan',
        año: 2008,
        genero: 'Acción, Crimen, Drama',
        duracion: 152,
        calificacion_imdb: 9.0,
        sinopsis: 'Batman enfrenta al Joker, un criminal que busca sembrar el caos en Ciudad Gótica.'
      },
      {
        titulo: 'Pulp Fiction',
        director: 'Quentin Tarantino',
        año: 1994,
        genero: 'Crimen, Drama',
        duracion: 154,
        calificacion_imdb: 8.9,
        sinopsis: 'Varias historias criminales se cruzan en Los Ángeles con un estilo narrativo no lineal.'
      },
      {
        titulo: 'Forrest Gump',
        director: 'Robert Zemeckis',
        año: 1994,
        genero: 'Drama, Romance',
        duracion: 142,
        calificacion_imdb: 8.8,
        sinopsis: 'Un hombre con una forma simple de ver la vida presencia eventos importantes de la historia de Estados Unidos.'
      },
      {
        titulo: 'Inception',
        director: 'Christopher Nolan',
        año: 2010,
        genero: 'Ciencia ficción, Acción',
        duracion: 148,
        calificacion_imdb: 8.8,
        sinopsis: 'Un ladrón especializado en robar secretos mediante los sueños recibe una misión casi imposible.'
      },
      {
        titulo: 'Interstellar',
        director: 'Christopher Nolan',
        año: 2014,
        genero: 'Ciencia ficción, Drama',
        duracion: 169,
        calificacion_imdb: 8.7,
        sinopsis: 'Un grupo de astronautas viaja a través de un agujero de gusano para buscar un nuevo hogar para la humanidad.'
      },
      {
        titulo: 'Fight Club',
        director: 'David Fincher',
        año: 1999,
        genero: 'Drama',
        duracion: 139,
        calificacion_imdb: 8.8,
        sinopsis: 'Un hombre insatisfecho con su vida forma un club clandestino que evoluciona hacia algo mucho más peligroso.'
      },
      {
        titulo: 'Gladiator',
        director: 'Ridley Scott',
        año: 2000,
        genero: 'Acción, Drama',
        duracion: 155,
        calificacion_imdb: 8.5,
        sinopsis: 'Un general romano traicionado busca venganza después de convertirse en gladiador.'
      },
      {
        titulo: 'The Matrix',
        director: 'Lana Wachowski, Lilly Wachowski',
        año: 1999,
        genero: 'Ciencia ficción, Acción',
        duracion: 136,
        calificacion_imdb: 8.7,
        sinopsis: 'Un programador descubre que la realidad que conoce es una simulación creada por máquinas.'
      }
    ]);

    console.log('Películas insertadas correctamente.');
    process.exit();
  } catch (error) {
    console.error('Error al insertar películas:', error);
    process.exit(1);
  }
}

insertarPeliculas();