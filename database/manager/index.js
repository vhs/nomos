const web = require("./web");
const migrate = require("./migrate");
const { master, replica } = require("./databases");

async function provision_master(db) {
  const su = await db.sudo();
  await su.query(`GRANT REPLICATION SLAVE ON *.* TO 'slave_user'@'%' IDENTIFIED BY 'password';`);
  await su.query(`FLUSH PRIVILEGES;`);
  // await master.query(`FLUSH TABLES WITH READ LOCK;`);
  const status = await su.query(`SHOW MASTER STATUS;`);
  const { File, Position } = status[0];
  console.log(`SHOW MASTER STATUS: ${JSON.stringify(status)}`);

  return { file: File, position: Position };
}

async function provision_slave(db, master, file, position) {
  const su = await db.sudo();

  const status = await su.query(`SHOW SLAVE STATUS;`);
  console.log(`SHOW SLAVE STATUS; ${JSON.stringify(status)}`);

  if (status.length < 1 || status[0].Master_Host !== "master") {
    //await su.query(`CHANGE MASTER TO MASTER_HOST='${master.connection.host}',MASTER_USER='slave_user', MASTER_PASSWORD='password', MASTER_LOG_FILE='${file}', MASTER_LOG_POS=${position};`);
    await su.query(`STOP SLAVE;`);
    await su.query(`CHANGE MASTER TO MASTER_HOST='${master.connection.host}',MASTER_USER='slave_user', MASTER_PASSWORD='password', MASTER_AUTO_POSITION=1;`);
    await su.query(`START SLAVE;`);
  }
}

async function initialize() {
  await master.connect();

  const { file, position } = await provision_master(master);
  await provision_slave(replica, master, file, position);

  await replica.connect(); // slave replication will create default user
  await migrate(master);
}

initialize().then(() => {
  web.server.listen(3000);

  console.log("listening 3000...");
}).catch(err => {
  console.error(err);
  process.exit(1);
});
