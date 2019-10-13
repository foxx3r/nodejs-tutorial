const app = require("express")()
const api100 = require("../routes/api_1.0.0")
const usersRoute = require("../routes/users")

app.use("/api/1.0.0", api100)
app.use("/", usersRoute)

module.exports = app
