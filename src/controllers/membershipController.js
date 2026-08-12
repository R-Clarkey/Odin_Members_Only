const db = require("../db/queries")

function getSecret(req, res) {
  res.render("membership", { errors: [], form: {} })
}

async function postSecret(req, res) {
  result = await db.postMembership(req.user.user_id)
  res.redirect("/")
}

module.exports = { 
    getSecret,
    postSecret
 }
