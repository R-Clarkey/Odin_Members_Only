// validators/authValidators.js
const pool = require("../db/pool");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

const validateSignUp = [
  body("username").trim().notEmpty().withMessage("Username is required"),

  body("password")
    .isString().notEmpty().withMessage("Password is required")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),

  body("confirm_password").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match")
    }
    return true;
  }),

  body("first_name")
    .trim().notEmpty().withMessage("First name is required"),

  body("last_name")
    .trim().notEmpty().withMessage("Last name is required"),
]

const validateLogIn = [
  body("username").trim().notEmpty().withMessage("Username is required"),

  body("password").isString().notEmpty().withMessage("Password is required"),

  body("password").custom(async (password, { req }) => {
    const username = req.body.username;

    const { rows } = await pool.query(
      "SELECT password FROM users WHERE username = $1",
      [username]
    )

    if (!rows.length) {
      throw new Error("Invalid username or password")
    }

    const passwordHash = rows[0].password

    const isMatch = await bcrypt.compare(password, passwordHash)
    if (!isMatch) {
      throw new Error("Invalid username or password")
    }

    return true
  }),
]

const validateMembership = [
  body("password")
    .trim()
    .notEmpty().withMessage("Password is required")
    .custom((value) => value === "Password!")
    .withMessage("That password is incorrect"),
]


const handleValidationErrors = (req, res, next) => {
  const result = validationResult(req)
  if (result.isEmpty()) return next()

  return res.status(400).render("sign-up-form", {
    errors: result.array(),
    form: req.body,
  })
}

const handleLogInValidationErrors = (req, res, next) => {
  const result = validationResult(req)
  if (result.isEmpty()) return next()

  return res.status(400).render("index", {
    errors: result.array(),
    form: req.body,
  })
}

const handleMembershipValidationErrors = (req, res, next) => {
  const result = validationResult(req)
  if (result.isEmpty()) return next()

  return res.status(400).render("membership", {
    errors: result.array(),
  })
}

module.exports = {
  validateSignUp,
  validateLogIn,
  validateMembership,
  handleValidationErrors,
  handleLogInValidationErrors,
  handleMembershipValidationErrors
}
