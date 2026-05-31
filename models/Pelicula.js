const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Pelicula = sequelize.define('Pelicula', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  director: {
    type: DataTypes.STRING,
    allowNull: false
  },
  año: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duracion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  calificacion_imdb: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  sinopsis: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = Pelicula;