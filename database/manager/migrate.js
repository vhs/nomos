const fs = require("fs");

const migrations = fs.readdirSync("./migrations/")
  .filter(step => Number.isInteger(Number(step)))
  .map(step => Number(step))
  .sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;

    return 0;
  });

console.log(`available migrations: ${JSON.stringify(migrations)}`);

const migrateTo = async (db, version) => {
  console.log(`starting migration for ${version}`);
  const scripts = fs.readdirSync(`./migrations/${version}`);
  console.log(`scripts: ${JSON.stringify(scripts)}`);

  for(const scriptFile of scripts) {
    console.log(`executing script: ${scriptFile}`);
    // const script = fs.readFileSync(`./migrations/${version}/${scriptFile}`, 'utf8');

    // console.log(`script: \n----\n${script}\n----`);

    // await db.query(script);

    const result = await db.execute(`./migrations/${version}/${scriptFile}`);
    console.log(`result: ${result}`);

    console.log(`success for: ${scriptFile}`);
  }

  console.log(`updating version to ${version}`);
  await db.updateVersion(version);
};

const migrate = async (database) => {
  const db = await database.sudo();

  const version = await db.version();
  const desired = migrations[migrations.length - 1];

  console.log(`current version: ${version}`);
  console.log(`desired version: ${desired}`);
  
  if (version > desired) {
    throw new Error('FATAL manager is older than db schema version');
  }

  if (version === desired) {
    console.log(`Database already at ${desired} version`);

    return;
  }

  const steps = migrations.filter(step => step > version);

  console.log(`Attempt migrations for steps ${version} -> [${Array.from(steps).join(" -> ")}]`);

  //console.log("START TRANSACTION;");
  // await db.query("START TRANSACTION;");

  try {
    for(const step of steps) {
      await migrateTo(db, step);
    }
  } catch(err) {
    console.error(err);
    //console.log("ROLLING BACK!");
    //await db.query("ROLLBACK;");

    throw err;
  }

  const latestVersion = Number(await db.version());

  if (latestVersion !== desired) {
    const err = `post migration version : ${latestVersion} does not match desired version ${desired}`;
    console.error(err);

    //console.log("ROLLING BACK!");
    //await db.query("ROLLBACK;");

    throw new Error(err);
  }

  // await db.query('COMMIT;');

  console.log(`Successfully migrated to ${latestVersion}`);
};

module.exports = migrate;
