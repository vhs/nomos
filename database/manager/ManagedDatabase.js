const { spawn } = require("child_process");

class DatabaseConnection {
    constructor({driver, host, user, password, root_password, database}) {
        this.driver = driver;
        this.host = host;
        this.user = user;
        this.password = password;
        this.root_password = root_password;
        this.database = database;

        this.endpoint = this.driver.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            multipleStatements: true,
            insecureAuth: true
        });
    }
}

class ManagedDatabase {
  constructor(connection) {
    this.connection = connection;
  }

  async sudo() {
    const su = new ManagedDatabase(new DatabaseConnection({
        driver: this.connection.driver,
        host: this.connection.host,
        user: "root",
        password: this.connection.root_password,
        database: this.connection.database
    }));

    await su.connect();

    return su;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.connection.endpoint.connect(err => {
        if (err) {
          console.error(`[${this.connection.host}] Database connect failed: ${err}`);
          return reject(err);
        }

        console.log(`[${this.connection.host}] Database connected threadId: ${this.connection.endpoint.threadId}`);

        this.connection.endpoint.query(`CREATE DATABASE IF NOT EXISTS ${this.connection.database};`, err => {
          if (err) {
            console.error(`[${this.connection.host}] Database connect failed: ${err}`);
            return reject(err);
          }

          this.connection.endpoint.changeUser({database: this.connection.database}, err => {
            if (err) {
              console.error(`[${this.connection.host}] Database connect failed: ${err}`);
              return reject(err);
            }

            console.log(`[${this.connection.host}] Database ${this.connection.database} available`);

            return resolve(this);
          });
        });
      });
    });
  }

  disconnect() {
    return new Promise((resolve, reject) => {
      this.connection.endpoint.end(err => {
        if (err) {
          console.error(`[${this.connection.host}] Error on disconnect: ${err}`);
          return reject(err);
        }

        return resolve();
      });
    });
  }

  query(query) {
    return new Promise((resolve, reject) => {
      this.connection.endpoint.query(query, (err, result) => {
        if (err) {
          console.error(`[${this.connection.host}] Query '${query}' failure: ${err}`);
          return reject(err);
        }

        resolve(result);
      });
    });
  }

  version() {
    return new Promise(async (resolve, reject) => {
      try {
        const settingsTable = await this.query("SHOW TABLES LIKE 'settings';");

        if (settingsTable.length !== 1) {
          return resolve(0);
        }

        const schemaversionColumn = await this.query("SHOW COLUMNS FROM `settings` like 'schemaversion';");

        if (schemaversionColumn.length === 1) {
          const versionQuery = await this.query("SELECT schemaversion FROM `settings`;");

          return resolve(versionQuery[0].schemaversion);
        } else {
          return resolve(1);
        }
      } catch (err) {
        console.error(`[${this.connection.host}] Error resolving version: ${err}`);
        return reject(err);
      }
    });
  }

  updateVersion(v) {
    return new Promise(async (resolve, reject) => {
      try {
        const settingsTable = await this.query("SHOW TABLES LIKE 'settings';");

        if (settingsTable.length !== 1) {
          return resolve(0);
        }

        const schemaversionColumn = await this.query("SHOW COLUMNS FROM `settings` like 'schemaversion';");

        if (schemaversionColumn.length === 1) {
          await this.query(`UPDATE settings SET schemaversion = ${v};`);

          return resolve(v);
        } else {
          return resolve(0);
        }
      } catch (err) {
        console.error(`[${this.connection.host}] Error updating version: ${err}`);
        return reject(err);
      }
    });
  }

  execute(scriptFile) {
    return new Promise((resolve, reject) => {
      const { host, database, user, password } = this.connection;

      const mysql = spawn(
        'script',
        [
          '-c',
          `"mysql -h ${host} -D ${database} -u ${user} -p${password} < ${scriptFile}"`
        ],
        {shell: true}
      );

      let output = "";
      let error = "";

      mysql.stdout.on("data", data => {
        output += data.toString("utf8");
      });

      mysql.stderr.on("data", data => {
        error += data.toString("utf8");
      });

      mysql.on("error", err => {
        error += err.toString();
      });

      mysql.on("close", (code) => {
        if (code !== 0) {
          reject(error);
        } else {
          resolve(output);
        }
      });
    });
  }
}

module.exports = {
    DatabaseConnection,
    ManagedDatabase
};
