const db = require("./connection_db")

const posts = db.sequelize.define("usersPost", {
  nome: {
    type: db.Sequelize.STRING, // tipo string
    allowNull: false, // não poderá ser nulo
    required: true, // será obrigatório
    timestamps: true // log de time ativado
  },
  conteudo: {
    type: db.Sequelize.TEXT, // tipo texto que armazena maiores quantidades que o string
    allowNull: true,
    required: false,
    timestamps: true
  }
})

posts.sync({ force: true })

module.exports = posts
