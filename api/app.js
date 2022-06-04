const express = require('express')
const app = express()
const cors = require('cors');
const bcrypt = require('bcryptjs')
const saltRounds = 10
const jwt = require("jsonwebtoken");
// var password = "Fkdj^45ci@Jad"
// var hashed = ''
require("dotenv").config()

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

app.get('/posts', async (request, response) => {
    let responseData = await knex('posts')
        .join("users", "users.id", "=", "posts.user_id")
        .select(
            "posts.id",
            "posts.user_id",
            "posts.title",
            "posts.content",
            "posts.creation_date",
            "users.id",
            "users.username"
        )
        .then((data) => response.status(200).send(data))
        .catch((err) => {
            console.log(err)
            response.status(500).send("server error")
        })


    // .select('*')
    // .then(posts => {
    //     let responseData = posts.map(post => ({
    //         id: post.id, user_id: post.user_id,
    //         title: post.title, content: post.content, creation_date: post.creation_date
    //     }))
    //     response.status(200).send(responseData)
    // })
})

app.get('/post/:id', async (request, response) => {
    let id = request.params
    let responseData = await knex('posts')
        .join("users", "users.id", "=", "posts.user_id")
        .select(
            "posts.id",
            "posts.user_id",
            "posts.title",
            "posts.content",
            "posts.creation_date",
            "users.id",
            "users.username"
        )
        .where("posts.id", "=", id.id)
        .then((data) => response.status(200).send(data))
        .catch((err) => {
            console.log(err)
            response.status(500).send("server error")
        })


    // .select('*')
    // .then(posts => {
    //     let responseData = posts.map(post => ({
    //         id: post.id, user_id: post.user_id,
    //         title: post.title, content: post.content, creation_date: post.creation_date
    //     }))
    //     response.status(200).send(responseData)
    // })
})

app.get('/user/:id/posts', async (request, response) => {
    let id = request.params
    // console.log(id)

    await knex("posts")
        .join("users", "users.id", "=", "posts.user_id")
        .select(
            "posts.id",
            "posts.user_id",
            "posts.title",
            "posts.content",
            "posts.creation_date",
            "users.id",
            "users.username"
        )
        .where("user_id", "=", id.id)
        .then((data) => response.status(200).send(data))
        .catch((err) => {
            console.log(err)
            response.status(500).send("server error")
        })
})

app.post("/registration", async (request, response) => {
    // console.log('request: ', request.body)
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
            password: hash,
            creation_date: request.body.creation_date
        })
    response.status(201).json('successfully created')

})

app.post("/login", async (request, response) => {
    // console.log('request: ', request.body)
    if (
        !request.body
    ) {
        return response.status(400).send("missing body")
    }
    if (
        !request.body.username || !request.body.password
    ) { return response.status(400).send("missing req info") }

    let user = await knex("users")
        .select(
            "users.id",
            "users.first_name",
            "users.last_name",
            "users.username",
            "users.password",
            "users.creation_date"
        )
        .where("username", "=", request.body.username)

    try {
        if (user[0] === undefined) {
            response.status(403).send("Username not found")
        }
        console.log('request.body.password ', request.body.password)
        console.log('user[0].password ', user[0])
        if (await bcrypt.compare(request.body.password, user[0].password)) {
            const accessToken = jwt.sign(JSON.stringify(user), process.env.ACCESS_TOKEN_SECRET)

            response.status(201).send({ accessToken: accessToken })
        } else {
            //error, unsuccessful
            response.status(403).send("Username or pass not correct")
        }
    } catch (err) {
        response.status(500).send(console.log(err))
    }

})

app.post('/post', async (request, response) => {
    await knex("posts")
        .insert({
            user_id: request.body.user_id,
            title: request.body.title,
            content: request.body.content,
            creation_date: request.body.creation_date
        })
        .then((data) => response.status(201).json('successfully added post'))
        .catch((err) => {
            console.log(err)
            response.status(500).send("server error")
        })

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



// app.get('/login', (request, response) => {
// })



module.exports = app;