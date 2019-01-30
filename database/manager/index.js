const fs = require("fs");

let steps = fs.readdirSync("./migrations/");

steps = steps
.filter(step => Number.isInteger(Number(step)))
.sort((a, b) => {
    const na = Number(a);
    const nb = Number(b);
    
    if (na < nb) return -1;
    if (na > nb) return 1;
      
    return 0;
});

const db_user_file = process.env.DB_USER_FILE || "/run/secrets/db_user";
const db_password_file = process.env.DB_PASSWORD_FILE || "/run/secrets/db_password";
const db_database_file = process.env.DB_DATABASE_FILE || "/run/secrets/db_database";

const db_user = fs.readFileSync(db_user_file, 'utf8').trim();
const db_password = fs.readFileSync(db_password_file, 'utf8').trim();
const db_database = fs.readFileSync(db_database_file, 'utf8').trim();

const mysql = require("mysql");
const ManagedDatabase = require('./ManagedDatabase');

const db = new ManagedDatabase({
    driver: mysql,
    host: "localhost",
    user: db_user,
    password: db_password,
    database: db_database
});

console.log(JSON.stringify({
    
    host: "localhost",
    user: db_user,
    password: db_password,
    database: db_database
}));

console.log(JSON.stringify(steps));

db.connect()
    .then(async () => {
        const version = await db.version();
        
        console.log(version);
        
        await db.disconnect();
        
        return;
    })
    .catch(err => {
        console.log(err);
        
    });



