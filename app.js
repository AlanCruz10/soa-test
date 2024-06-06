const express = require('express');
const app = express();
// const tutorRoutes = require('./src/routes/tutorRoutes');
// const studentRoutes = require('./src/routes/studentRoutes');
// const subjectRoutes = require('./src/routes/subjectRoutes');

// const userAdmin = {
//   username: 'user',
//   password: 'pass'
// }

// Middleware
app.use(express.json());

// Rutas
// app.use('/api/v1', tutorRoutes);
// app.use('/api/v1', studentRoutes);
// app.use('/api/v1', subjectRoutes);

app.post('/api/v1/login', (req, res) => {
  const {username, password} = req.body;
  if (username == 'user' && password == 'pass') {
      res.status(200).json({ message: 'user logged' });
  } else {
      res.status(401).json({ error: 'invalid credentials' });
  }
});

app.get('/api/v1/users/:user', (req, res) => {
  if (req.params.user == 'user') {
      res.status(200).json({ message: 'user obtained' });
  } else {
      res.status(401).json({ error: 'user not found' });
  }
});

app.get('/api/v1/welcome', (req, res) => {
    res.status(200).json({ message: 'Welcome to this Api ya 3' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// process.on('SIGTERM', () => {
//   server.close(() => {
//       console.log('Servidor detenido');
//       process.exit(0);
//   });
// });

module.exports = app