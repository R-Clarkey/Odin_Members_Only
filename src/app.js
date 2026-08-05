const dotenv = require("dotenv");
if (process.env.NODE_ENV !== "production") {
  dotenv.config()
}
const path = require("node:path")
const express = require("express")
const session = require("express-session")
const passport = require("passport")
const configurePassport = require("./config/passportConfig")

const homeRouter = require("./routes/homeRouter")
const authRouter = require("./routes/authRouter")

configurePassport()

const app = express()

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
const assetsPath = path.join(__dirname, "public")
app.use(express.static(assetsPath))
app.use(express.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: false }))

app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: false
  })
)

app.use(passport.session())

app.use((req, res, next) => {
  res.locals.currentUser = req.user
  next()
});

app.use("/", homeRouter)
app.use("/", authRouter)

module.exports = app
