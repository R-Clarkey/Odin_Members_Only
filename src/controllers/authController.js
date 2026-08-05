const bcrypt = require("bcryptjs")
const pool = require("../db/pool")

function signUpPage(req, res) {
  res.render("sign-up-form")
}

async function createUser(req, res, next) {
  try {
    const { username, password, first_name, last_name } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    await pool.query(
      "INSERT INTO users (username, password, first_name, last_name) VALUES ($1, $2, $3, $4)",
      [username, hashedPassword, first_name, last_name]
    )
    res.redirect("/")
  } catch (err) {
    next(err)
  }
}

function logOut(req, res, next) {
  req.logout((err) => {
    if (err) return next(err)
    res.redirect("/")
  })
}

module.exports = { signUpPage, createUser, logOut }
