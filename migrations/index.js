let users_migration = require('./users.migration');
let user_unique_indexes = require('./user.unique.indexes');

users_migration()
    .then(() => user_unique_indexes())
    .catch(err => console.error('Error occur in migrations', err));
