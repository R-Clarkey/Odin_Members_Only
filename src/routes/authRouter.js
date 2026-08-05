const { Router } = require("express")
const passport = require("passport")
const authController = require("../controllers/authController")
const authRouter = Router()

authRouter.get("/sign-up", authController.signUpPage)
authRouter.post("/sign-up", authController.createUser)

authRouter.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureMessage: true
  })
);

authRouter.get("/log-out", authController.logOut)

module.exports = authRouter
