const pool = require("./pool");

async function getUserByUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);

  return rows[0];
}

async function getUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
}

async function postUpdateUserStatus(id, status) {
  await pool.query(
    `
    UPDATE users SET membership_status = $2 WHERE id = $1  
  `,
    [id, status],
  );
}

async function getPublicMessages() {
  const { rows } = await pool.query(
    "SELECT * FROM messages ORDER BY date DESC ",
  );
  return rows;
}

async function getPrivateMessages() {
  const { rows } = await pool.query(`
    SELECT messages.id, messages.message, messages.date, users.username  
    FROM messages JOIN users
      ON users.id = messages.user_id
    ORDER BY messages.date DESC  
    `);
  return rows;
}

async function postNewUsers(full_name, username, password) {
  await pool.query(
    `
    INSERT INTO users( full_name, username, password)
    VALUES (
    $1, $2, $3) 
    `,
    [full_name, username, password],
  );
}

async function postNewMessage(user_id, message) {
  await pool.query(
    `
    INSERT INTO messages( user_id, message) 
    VALUES (
    $1, $2)
    `,
    [user_id, message],
  );
}

async function deleteMessage(id) {
  await pool.query(
    `
      DELETE FROM messages WHERE id = $1
    `,
    [id],
  );
}

module.exports = {
  getPublicMessages,
  getPrivateMessages,
  postNewUsers,
  postNewMessage,
  getUserByUsername,
  getUserById,
  postUpdateUserStatus,
  deleteMessage,
};
