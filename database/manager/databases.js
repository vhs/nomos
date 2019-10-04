const mysql = require("mysql");
const config = require("./config");
const { DatabaseConnection, ManagedDatabase } = require('./ManagedDatabase');

const master = new ManagedDatabase(new DatabaseConnection({
  driver: mysql,
  host: "master",
  user: config.db.user,
  password: config.db.password,
  root_password: config.db.root_password,
  database: config.db.database
}));

const replica = new ManagedDatabase(new DatabaseConnection({
  driver: mysql,
  host: "replica",
  user: config.db.user,
  password: config.db.password,
  root_password: config.db.root_password,
  database: config.db.database
}));

module.exports = {
  master: master,
  replica: replica
};
