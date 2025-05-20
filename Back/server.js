const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./Routes/routes.js');
const cors = require('cors');
const path = require('path');


app.use(cors());
// app.use("/uploads", express.static("uploads"));
// app.use("/uploads/tasks", express.static("Middlewares/uploads/tasks"));
app.use('/Middlewares/uploads', express.static(path.join(__dirname, 'Middlewares/uploads')));
app.use(bodyParser.json());
app.use('/api', routes);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
