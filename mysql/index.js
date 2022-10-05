const express = require('express')

const config = require('../config')
const network = require('./routes')

const app = express()

app.use(express.json())

//RUTAS
app.use('/', network)

app.listen(config.mysqlService.port, () => {
  console.log('>>> Servicio de mysql escuchando en el puerto: ' + config.mysqlService.port);
})
