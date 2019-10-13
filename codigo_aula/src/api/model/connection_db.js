const Sequelize = require("sequelize")
const sequelize = new Sequelize({
  dialect: "sqlite"
})

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}
