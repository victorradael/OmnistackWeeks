const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const {setupWebsocket} = require('./websocket')
const {connectDB} = require('./cred.json')

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect(connectDB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

app.use(cors()); // { origin: 'http://localhost:3000'} para executar com o front Web
app.use(express.json());
app.use(routes);  

//Métodos HTTP: get, post, put, delete
// Tipos de parâmetros
// Query Params: req.query (filtros, ordenações, paginação, ...)
// Route Params: req.params (identificar um recurso na alteração ou remoção)
// Body: req.body (Dados para criação ou alteração de um registro)
// MongoDB (Não-relacional) 

server.listen(3333) 