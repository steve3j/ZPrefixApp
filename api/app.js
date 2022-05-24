const express = require('express')
const app = express()
const port = 3000
const bcrypt = require ('bcrypt')
const saltRounds = 10
var password = "Fkdj^45ci@Jad"
var hashed = ''


bcrypt.hash(password, saltRounds, function(err, hash) {
    hashed = hash
    console.log('hash: ', hash)
})

bcrypt.compare(password, hashed, function(err, result) {
    console.log('compareResults: ', result)
})

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))