class ManagedDatabase {
    constructor({ driver, host, user, password, database }) {
        this.database = database;
        
        this.connection = driver.createConnection({
            host: host,
            user: user,
            password: password,
            multipleStatements: true,
            insecureAuth: true
        });
    }
    
    connect() {
        return new Promise((resolve, reject) => {
            this.connection.connect(err => {
                if (err) {
                    console.error(`Database connect failed: ${err}`);
                    return reject(err);
                }
                
                console.log(`Database connected threadId: ${this.connection.threadId}`);
                
                this.connection.query(`CREATE DATABASE IF NOT EXISTS ${this.database};`, err => {
                    if (err) {
                        console.error(`Database connect failed: ${err}`);
                        return reject(err);
                    }
                    
                    this.connection.changeUser({ database: this.database }, err => {
                        if (err) {
                            console.error(`Database connect failed: ${err}`);
                            return reject(err);
                        }
                        
                        console.log(`Database ${this.database} available`);
                        
                        return resolve(this);
                    });
                });
            });
        });
    }
    
    disconnect() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err) {
                    console.error(`Error on disconnect: ${err}`);
                    return reject(err);
                }
                
                return resolve();
            });
        });
    }
    
    query(query) {
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, result) => {
                if (err) {
                    console.error(`Query '${query}' failure: ${err}`);
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
            } catch(err) {
                console.error(`Error resolving version: ${err}`);
                return reject(err);
            }
        });
    }
}

module.exports = ManagedDatabase;
