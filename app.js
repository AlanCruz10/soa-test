const express = require('express');
const app = express();
const tutorRoutes = require('./src/routes/tutorRoutes');
const studentRoutes = require('./src/routes/studentRoutes');
const subjectRoutes = require('./src/routes/subjectRoutes');

// Middleware
app.use(express.json());

// Rutas
app.use('/api/v1', tutorRoutes);
app.use('/api/v1', studentRoutes);
app.use('/api/v1', subjectRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
