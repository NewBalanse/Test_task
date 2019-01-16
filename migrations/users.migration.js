let {createConnection, closeConnection, db} = require('../libs/database');
let dbName = process.env.NODE_DB_NAME;

function run() {
    return new Promise((resolve, reject) => {
        createConnection({dbName}, () => {
            db().query(`
                CREATE TABLE \`users\`(
                    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    password VARCHAR(255) NOT NULL
                );
            `, (err, result, columns) => {
                    if (err) {
                        console.error('Error occur when perform users migration', err);
                        return reject();
                    }

                    console.log('Users migration success');
                    closeConnection();
                    resolve();
                }
            );
        });
    })
}

if (module.parent) {
    module.exports = run;
} else {
    run();
}
