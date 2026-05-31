require('dotenv').config();

const express = require('express');
const sequelize = require('./database');
const Pelicula = require('./models/Pelicula');

//
/* Lineas para importar JWT y el middleware */
const jwt = require('jsonwebtoken');
const { verificarToken, SECRET_KEY } = require('./middlewares/auth');
//

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//
/* Middleware logger */
app.use((req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} - ${req.method} ${req.url}`
  );
  next();
});
//

// Ruta principal
app.get('/', (req, res) => {
  res.send('API completa de películas en funcionamiento...');
});


//
/* LOGIN */
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Usuario de prueba
  if (username === 'admin' && password === '1234') {
    const usuario = {
      id: 1,
      nombre: 'Administrador'
    };
    const token = jwt.sign(usuario, SECRET_KEY, {
      expiresIn: '1h'
    });
    return res.status(200).json({
      mensaje: 'Login exitoso',
      token
    });
  }

  res.status(401).json({
    mensaje: 'Credenciales inválidas'
  });
});

//


// GET: Obtener todas las películas
app.get('/api/peliculas', verificarToken, async (req, res) => {
  try {
    const peliculas = await Pelicula.findAll();
    res.status(200).json(peliculas);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener las películas',
      error: error.message
    });
  }
});

// GET: Obtener una película por ID
app.get('/api/peliculas/:id', verificarToken, async (req, res) => {
  try {
    const pelicula = await Pelicula.findByPk(req.params.id);

    if (!pelicula) {
      return res.status(404).json({
        mensaje: 'Película no encontrada'
      });
    }

    res.status(200).json(pelicula);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener la película',
      error: error.message
    });
  }
});

// POST: Crear una película
app.post('/api/peliculas', verificarToken, async (req, res) => {
  try {
    const {
      titulo,
      director,
      año,
      genero,
      duracion,
      calificacion_imdb,
      sinopsis
    } = req.body;

    if (!titulo || !director || !año || !genero || !duracion || !calificacion_imdb || !sinopsis) {
      return res.status(400).json({
        mensaje: 'Todos los campos son obligatorios'
      });
    }

    const nuevaPelicula = await Pelicula.create({
      titulo,
      director,
      año,
      genero,
      duracion,
      calificacion_imdb,
      sinopsis
    });

    res.status(201).json({
      mensaje: 'Película creada correctamente',
      pelicula: nuevaPelicula
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al crear la película',
      error: error.message
    });
  }
});

// PUT: Actualizar una película
app.put('/api/peliculas/:id', verificarToken, async (req, res) => {
  try {
    const pelicula = await Pelicula.findByPk(req.params.id);

    if (!pelicula) {
      return res.status(404).json({
        mensaje: 'Película no encontrada'
      });
    }

    await pelicula.update(req.body);

    res.status(200).json({
      mensaje: 'Película actualizada correctamente',
      pelicula
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al actualizar la película',
      error: error.message
    });
  }
});

// DELETE: Eliminar una película
app.delete('/api/peliculas/:id', verificarToken, async (req, res) => {
  try {
    const pelicula = await Pelicula.findByPk(req.params.id);

    if (!pelicula) {
      return res.status(404).json({
        mensaje: 'Película no encontrada'
      });
    }

    await pelicula.destroy();

    res.status(200).json({
      mensaje: 'Película eliminada correctamente'
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al eliminar la película',
      error: error.message
    });
  }
});


//
/* Middleware de manejo de errores */
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({
    mensaje: 'Error interno del servidor',
    error: error.message
  });
});
//

// Iniciar servidor
async function iniciarServidor() {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL conectado');

    await sequelize.sync();
    console.log('Modelos sincronizados');

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en puerto ${PORT}`);
    });

  } catch (error) {
    console.error('Error de conexión:', error);
  }
}

iniciarServidor();