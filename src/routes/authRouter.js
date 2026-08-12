const { Router } = require("express")
const passport = require("passport")
const authController = require("../controllers/authController")
const authRouter = Router()
const { validateSignUp, validateLogIn, handleValidationErrors, handleLogInValidationErrors } = require("../validators/authValidator");

authRouter.get("/sign-up", authController.signUpPage)
authRouter.post("/sign-up", validateSignUp, handleValidationErrors, authController.createUser)

authRouter.post(
  "/log-in", validateLogIn, handleLogInValidationErrors,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureMessage: true
  })
);

authRouter.get("/log-out", authController.logOut)

module.exports = authRouter
