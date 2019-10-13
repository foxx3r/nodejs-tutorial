const express = require("express")
const app = express()
const helmet = require("helmet")

// config
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(helmet())

// routes
app.get("/", (req, res, next) => {
    res.send("<h1>Ola mundo</h1>")
})

app.get("/json", (req, res, next) => {
    res.status(200).json({
        hello: "World"
    })
})

app.post("/teste", (req, res, next) => {
    res.send("seu email: " + req.body.email + "\nsua senha: " + req.body.password)
})

// export
module.exports = app
