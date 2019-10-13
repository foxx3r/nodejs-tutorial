const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
const Post = require("../model/Post")
const helmet = require("helmet")

// config
app.engine("handlebars", handlebars({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(express.static("public"))
app.use(express.static("views"))

app.use(helmet())

// routes
app.get("/", (req, res, next) => {
    Post.findAll().then( (posts) => {
        res.render("pages/home", { posts: posts })
    })
})

app.get("/register", (req, res, next) => {
    res.render("pages/register")
})

app.post("/register", (req, res, next) => {
    Post.create({
        nome: req.body.nome,
        conteudo: req.body.conteudo
    }).then( () => {
        res.redirect("/")
    }).catch( (error) => {
        res.send("Ocorreu um erro ao cadastrar usuario no banco de dados")
        console.log(error)
    })
})

module.exports = app
