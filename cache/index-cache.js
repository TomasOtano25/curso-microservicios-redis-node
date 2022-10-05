const express = require('express')

const config = require('../config')
const network = require('./routes')

const app = express()

app.use(express.json())

//RUTAS
app.use('/', network)

app.listen(config.cacheService.port, () => {
  console.log('>>> Servicio de cache redis escuchando en el puerto: ' + config.cacheService.port);
})
