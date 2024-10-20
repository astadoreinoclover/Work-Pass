const express = require('express');
const empresaRoutes = require('./routes/empresaRoutes');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(express.json());

app.use('/empresa', empresaRoutes);
app.use('/user', userRoutes);
app.use('/task', taskRoutes);

module.exports = app;
