const pool = require("./pool")

async function postPost(owner, title, message) {
  const { rows } = await pool.query(
    `INSERT INTO messages (owner_id, title, message, "timestamp")
     VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
     RETURNING owner_id, title, message, "timestamp"`,
    [owner, title, message]
  )

  return rows[0]
}

async function getAllMessages() {
    const { rows } = await pool.query(
        `
        SELECT * FROM messages;
        `
    )
    return rows
}

async function getAll() {
  const { rows } = await pool.query(
    `SELECT
      m.message_id,
      m.owner_id,
      u.first_name,
      u.last_name,
      m.title,
      m.message,
      to_char(m."timestamp", 'DD/MM/YYYY') AS "date",
      to_char(m."timestamp" AT TIME ZONE 'BST', 'HH24:MI') AS time
     FROM messages m
     JOIN users u
       ON u.user_id = m.owner_id
     ORDER BY m."timestamp" DESC`
  )

  return rows
}

async function postMembership(user) {
  const { rows } = await pool.query(`
    UPDATE public.users
    SET is_member = TRUE
    WHERE user_id = ${user}
  `)
}



module.exports = {
    postPost,
    getAllMessages,
    getAll,
    postMembership
}