const express = require('express')
const app = express()
const cors = require('cors');
const bcrypt = require ('bcrypt')
const saltRounds = 10
var password = "Fkdj^45ci@Jad"
var hashed = ''

app.use(cors());
const env = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[env]
const knex = require('knex')(config)

bcrypt.hash(password, saltRounds, function(err, hash) {
    hashed = hash
    console.log('hash: ', hash)
})

bcrypt.compare(password, hashed, function(err, result) {
    console.log('compareResults: ', result)
})

app.get('/', (req, res) => res.status(200).send('Hello World!'))

// app.get('/authors', (request, response) => {
//     knex('app_authors')
//         .select('*')
//         .then(authorRecords => {
//             let responseData = authorRecords.map(author => ({ firstName: author.first_name, lastName: author.last_name}));
//             response.status(200).send(responseData)
//         })

// })

module.exports = app;