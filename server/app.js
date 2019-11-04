const express = require('express')
const cors = require('cors')

const app =  express()
const port = 3000

app.use(cors())
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

const usersRouters = require('./routes/usersRouters.js')
const postsRouter = require('./routes/postsRouter.js')
const likesRouter = require('./routes/likesRouter.js')

app.use('/users', usersRouters)
app.use('/posts', postsRouter)
app.use('/likes', likesRouter)

app.use('/', (req,res) => {
    res.send('Welcome to Facebook')
})

app.listen(port, () => {
console.log(`Server listening at http://localhost:${port}`)
})