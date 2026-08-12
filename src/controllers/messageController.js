const db = require("../db/queries")

function getPost(req, res) {
  res.render("post", { errors: [], form: {} })
}

async function postPost(req, res) {
  console.log(req.body.title, req.body.message, req.user.user_id)
  result = await db.postPost(req.user.user_id, req.body.title, req.body.message)
  res.redirect("/")
}

module.exports = { 
    getPost,
    postPost
 }
