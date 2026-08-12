const db = require("../db/queries")

async function getIndex(req, res, next) {
  try {
    const currentUser = req.user

    let data = []
    if (currentUser) {
      data = await db.getAll()
      console.log(data)
    }

    res.render("index", {
      currentUser,
      errors: [],
      form: {},
      data
    });
  } catch (err) {
    next(err)
  }
}


module.exports = { 
    getIndex
 }
