const http = require("http")
const app = require("./api/middleware/app")
require("dotenv").config()

const server = http.createServer(app)
const PORT = process.env.PORT
const HOSTNAME = process.env.HOSTNAME

server.listen(PORT, HOSTNAME, () => {
    console.log(`servidor rodando na URL http://${HOSTNAME}:${PORT}`)
})
