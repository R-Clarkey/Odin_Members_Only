const bcrypt = require("bcryptjs");
const pool = require("../db/pool");

function signUpPage(req, res) {
  res.render("sign-up-form", { errors: [], form: {} });
}

async function createUser(req, res, next) {
  try {
    const { username, password, first_name, last_name } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (username, password, first_name, last_name) VALUES ($1, $2, $3, $4)",
      [username, hashedPassword, first_name, last_name]
    );

    return res.redirect("/");
  } catch (err) {
    if (err && err.code === "23505") {
      return res.status(409).render("sign-up-form", {
        errors: [{ msg: "That username is already taken." }],
        form: req.body,
      });
    }
    return next(err);
  }
}

function logOut(req, res, next) {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
}

function requireAuth(req, res, next) {
  if (!req.user) {
    console.log("Redirecting to login")
    return res.redirect("/")
  }
  next()
}


module.exports = { signUpPage, createUser, logOut, requireAuth };
