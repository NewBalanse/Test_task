let {createConnection, closeConnection, db} = require('../libs/database');
let dbName = process.env.NODE_DB_NAME;

function run () {
    return new Promise ((resolve, reject) => {
        console.log('Start creating unique indexes for table \'users\'');
        createConnection({dbName}, () => {
            db().query(`
                CREATE UNIQUE INDEX \`idx-username-email\`
                ON users(username, email)
            `, (err) => {
                if (err) {
                    console.error('Error occur when try to create indexes for users', err);
                    return reject();
                }

                console.log('Indexes for users table successfully created');
                closeConnection();
                resolve();
            });
        });
    })
}

if (module.parent) {
    module.exports = run;
} else {
    run();
}
