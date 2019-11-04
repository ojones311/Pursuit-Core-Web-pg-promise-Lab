const express = require('express');
const router = express.Router();

const db = require('./database_module/db.js')

router.get('/:postId', async (req, res) => {
    const postId = parseInt(req.params.postId)
    let inputQuery = `SELECT liker_id JOIN FROM likes WHERE post_id = ${postId}`
    try{
        let myLikes = await db.any(inputQuery)
        res.json({
            payload: myLikes,
            message: 'Success. GET received.'
        })
    } catch(error){
        res.json({
            message: 'Error. Wrong input'
        })
    }
})

// router.get('/:postId', async (req, res) => {
//     const postId = parseInt(req.params.postId)
//     let inputQuery = `SELECT body FROM likes WHERE liker_id = ${likerId}`

// })

router.get('/filter/:min/:max')


module.exports = router;