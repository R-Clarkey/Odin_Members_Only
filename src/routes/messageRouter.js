const { Router } = require("express")
const messageController = require("../controllers/messageController")
const messageRouter = Router()

const { requireAuth } = require("../controllers/authController")

messageRouter.get("/post", requireAuth,  messageController.getPost)
messageRouter.post("/post", requireAuth, messageController.postPost)

module.exports = messageRouter
