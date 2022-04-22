/** Importar Express */
const express = require('express')
/** Importar arquivo de rotas */
const route = require('./route')
/** Estrutura os caminhos dos arquivos */
const path = require('path')
/** Criar o server (express iniciado) */
const server = express()
/** Configurar para usar a engine ejs */
server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'views'))
/** Configurar o uso da pasta 'public' */
server.use(express.static("public"))
/** Confirar o middleware antes da rota */
server.use(express.urlencoded({extended: true}))
/** Usar o arquivo de rotas */
server.use(route)

server.listen(3000, () => console.log('RODANDO'))
