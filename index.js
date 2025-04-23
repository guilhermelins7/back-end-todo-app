const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, PATCH, DELETE');
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

const PORT = process.env.PORT || 3000;  // Porta definida pela variável de ambiente
const routes = require('./routes/routes');
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});

// Conectando ao MongoDB usando a variável de ambiente MONGO_URL
var mongoURL = process.env.MONGO_URL;  // Usando variável de ambiente
if (!mongoURL) {
  console.error("MONGO_URL environment variable not set.");
  process.exit(1);  // Encerra o processo caso não haja URL de conexão
}

// Configurando a conexão com o MongoDB
var mongoose = require('mongoose');
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', (error) => {
  console.log('MongoDB Connection Error:', error);
});

db.once('connected', () => {
  console.log('Database Connected');
});
