const express = require('express');
const mongoose = require('mongoose');
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

const routes = require('./routes/routes');
app.use('/api', routes);

// Conectando ao MongoDB usando a variável de ambiente MONGO_URL
const mongoURL = process.env.MONGO_URL;
if (!mongoURL) {
  console.error("MONGO_URL environment variable not set.");
  process.exit(1);
}

mongoose.Promise = global.Promise;

// Conexão e inicialização do servidor
mongoose.connect(mongoURL)
  .then(() => {
    console.log('Database Connected');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server Started at ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB Connection Error:', error);
  });
