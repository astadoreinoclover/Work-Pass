const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./Routes/routes.js');
const cors = require('cors');

app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/uploads/tasks", express.static("Middlewares/uploads/tasks"));
app.use(bodyParser.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
