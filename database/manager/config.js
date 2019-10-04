const fs = require("fs");

const db_user_file = process.env.DB_USER_FILE || "/run/secrets/db_user";
const db_password_file = process.env.DB_PASSWORD_FILE || "/run/secrets/db_password";
const db_database_file = process.env.DB_DATABASE_FILE || "/run/secrets/db_database";
const db_root_password_file = process.env.DB_ROOT_PASSWORD_FILE || "/run/secrets/db_root_password";

const db_user = fs.readFileSync(db_user_file, 'utf8').trim();
const db_password = fs.readFileSync(db_password_file, 'utf8').trim();
const db_database = fs.readFileSync(db_database_file, 'utf8').trim();
const db_root_password = fs.readFileSync(db_root_password_file, 'utf8').trim();

module.exports = {
  db: {
    user: db_user,
    password: db_password,
    database: db_database,
    root_password: db_root_password
  }
};
