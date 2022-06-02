const express = require('express')
const app = express()
const cors = require('cors');
const bcrypt = require('bcryptjs')
const saltRounds = 10
// var password = "Fkdj^45ci@Jad"
// var hashed = ''

var corsOptions = {
    origin: "*",
    methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    headers: "X-Requested-With, content-type",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json())
const env = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[env]
const knex = require('knex')(config)

// bcrypt.hash(password, saltRounds, function (err, hash) {
//     hashed = hash
//     console.log('hash: ', hash)
// })

// bcrypt.compare(password, hashed, function (err, result) {
//     console.log('compareResults: ', result)
// })

app.get('/', (req, res) => res.status(200).send('Hello World!'))

app.get('/posts', (request, response) => {
    knex('posts')
        .select('*')
        .then(posts => {
            let responseData = posts.map(post => ({
                id: post.id, user_id: post.user_id,
                title: post.title, content: post.content
            }))
            response.status(200).send(responseData)
        })
})

app.post("/registration", async (request, response) => {
    console.log('request: ', request.body)
    if (
        !request.body
    ) {
        return response.status(400).send("missing body")
    }
    if (
        !request.body.firstName || !request.body.lastName ||
        !request.body.username || !request.body.password
    ) { return response.status(400).send("missing req info") }

    const hash = await bcrypt.hash(request.body.password, saltRounds)

    await knex("users")
        .insert({
            first_name: request.body.firstName,
            last_name: request.body.lastName,
            username: request.body.username,
            password: hash
        })
    // response.status(201).json('successfully created')

})

// app.get('/users', (request, response) => {
//     knex('users')
//         .select('*')
//         .then(authorRecords => {
//             let responseData = authorRecords.map(author => ({ firstName: author.first_name, lastName: author.last_name}));
//             response.status(200).send(responseData)
//         })

// })

// app.get('/login', (request, response) => {
// })

// app.get('/user', (request, response) => {
// })

// app.get('/post', (request, response) => {
// })

// app.get('/login', (request, response) => {
// })



module.exports = app;