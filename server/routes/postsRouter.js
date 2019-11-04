const express = require('express');
const router = express.Router();

const db = require('./database_module/db.js')

router.get('/all', async (req, res) => {
    try {
        let posts = await db.any("SELECT poster_id, body FROM posts")
        res.json({
            payload: posts,
            message: 'Message received. Posts incoming'
        })
    } catch (error){
        res.json({
            message: 'Error.Error. Something is wrong'
        })
        console.log(error)
    }
})

router.get('/:userId', async (req, res) => {
    const params = req.params.userId
    try{
        let myPost = await db.any(`SELECT body FROM posts WHERE poster_id =${params}`)
        res.json({
            payload: myPost,
            message: 'Success. Retrieved the user by ID'
        })
    } catch (error) {
        res.status(500)
        res.json({
            message: 'Error. No data to send'
        })
        console.log(error)
    }
})


router.post('/register', async (req, res) => {
    let {posterId, body} = req.body
    const insertQuery = `INSERT INTO posts(poster_id, body) 
                            VALUES($1, $2)`
    try{
        await db.none(insertQuery, [posterId, body])
        res.json({
            payload: req.body,
            message: "Success. POST request arrived."
        })
    } catch (error){
        res.json({
            message: 'Error. Try again!'
        })
        console.log(error)
    }
})

module.exports = router;