const config = require("./config");

const fs = require("fs");
const { spawn } = require('child_process');

let steps = fs.readdirSync("./migrations/");

steps = steps
.filter(step => Number.isInteger(Number(step)))
.map(step => Number(step))
.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
      
    return 0;
});


const mysql = require("mysql");
const ManagedDatabase = require('./ManagedDatabase');

// TODO host
const host = "master";

const db = new ManagedDatabase({
    driver: mysql,
    host: host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
});

console.log(JSON.stringify({
    
    host: host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
}));

console.log(JSON.stringify(steps));

const execScript = scriptFile => {
  return new Promise((resolve, reject) => {
    const mysql = spawn('script', ['-c', `"mysql -h ${host} -D ${config.db.database} -u root -p${config.db.root_password} < ${scriptFile}"`], { shell: true });
    
    let output = "";
    let error = "";
    
    mysql.stdout.on('data', data => {
        output += data.toString('utf8');
    });
    
    mysql.stderr.on('data', data => {
        error += data.toString('utf8');
    });
    
    mysql.on('error', err => {
      error += err.toString();
    });
    
    mysql.on('close', (code) => {
      if (code != 0) {
        reject(error);
      } else {
        resolve(output);
      }
    });
    
  });
};

const migrate = async () => {
  await db.connect();

  const version = await db.version();
  const desired = steps[steps.length - 1];

  console.log(`current version: ${version}`);
  console.log(`desired version: ${desired}`);
  
  if (version > desired) {
    throw new Error('FATAL manager is older than db schema version');
  }
  
  if (version < desired) {
    steps = steps.filter(step => step > version);
    
    console.log(`Attempt migrations for steps ${version} -> [${Array.from(steps).join(" -> ")}]`);
    
    const migrateTo = async (v) => {
      console.log(`starting migration for ${v}`);
      const scripts = fs.readdirSync(`./migrations/${v}`);
      console.log(`scripts: ${JSON.stringify(scripts)}`);
      
      for(const scriptFile of scripts) {
        console.log(`executing script: ${scriptFile}`);
        const script = fs.readFileSync(`./migrations/${v}/${scriptFile}`, 'utf8');
        
        // console.log(`script: \n----\n${script}\n----`);
        
        // await db.query(script);
        
        const result = await execScript(`./migrations/${v}/${scriptFile}`);
        console.log(`result: ${result}`);
        
        console.log(`success for: ${scriptFile}`);
      }
      
      console.log(`updating version to ${v}`);
      await db.updateVersion(v);
    };
    
    //console.log("START TRANSACTION;");
   // await db.query("START TRANSACTION;");
    
    try {
      for(const step of steps) {
        await migrateTo(step);
      }
    } catch(err) {
      console.error(err);
      //console.log("ROLLING BACK!");
      //await db.query("ROLLBACK;");
      await db.disconnect();
      
      throw err;
    }
    
    const latestVersion = Number(await db.version());
  
    if (latestVersion !== desired) {
      const err = `post migration version : ${latestVersion} does not match desired version ${desired}`;
      console.error(err);
      
      //console.log("ROLLING BACK!");
      //await db.query("ROLLBACK;");
      await db.disconnect();
      
      throw new Error(err);
    }
    
   // await db.query('COMMIT;');
    
    console.log(`Successfully migrated to ${latestVersion}`);
  }

  await db.disconnect();
}

module.exports = migrate;
