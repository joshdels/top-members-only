const pool = require("./pool");

async function getUsers() {
  const { rows } = await pool.query("SELECT * FROM users");
  return rows;
}

async function getPublicMessages() {
  const { rows } = await pool.query(
    "SELECT * FROM messages ORDER BY date DESC ",
  );
  return rows;
}

async function getPrivateMessages() {
  const { rows } = await pool.query(`
    SELECT messages.message, messages.date, users.username  
    FROM messages JOIN users
      ON users.id = messages.user_id
    ORDER BY messages.date ASC
    
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

module.exports = {
  getUsers,
  getPublicMessages,
  getPrivateMessages,
  postNewUsers,
  postNewMessage,
};
