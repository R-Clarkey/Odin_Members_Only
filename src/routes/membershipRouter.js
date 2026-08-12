const { Router } = require("express")
const membershipController = require("../controllers/membershipController")
const membershipRouter = Router()
const { validateMembership, handleMembershipValidationErrors } = require("../validators/authValidator");
const { requireAuth } = require("../controllers/authController")

membershipRouter.get("/secret", requireAuth,  membershipController.getSecret)
membershipRouter.post("/secret", requireAuth, validateMembership, handleMembershipValidationErrors, membershipController.postSecret)

module.exports = membershipRouter
