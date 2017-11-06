const knex = require('knex')({
    client: 'mysql',
    connection: {
        host     : 'localhost',
        user     : 'root',
        password : 'password',
        database : 'restaurant',
        charset  : 'utf8'
    }
});
var bookshelf = require('bookshelf')(knex);

module.exports= bookshelf;