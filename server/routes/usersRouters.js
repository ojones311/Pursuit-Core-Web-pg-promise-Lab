const express = require('express');
const router = express.Router();

const db = require('./database_module/db.js') //Connected db instance

router.get('/', async (req, res) => {
    // db.any("SELECT * FROM users")
    // .then(rows => {
    //     console.log(rows)
    //     res.json(rows)
    // }) 
    // .catch(error => {
    //     console.log(error)
    // })

    try {
        let users = await db.any("SELECT * FROM users")
        res.json({
            payload: users,
            message: 'Success. Retrieved all the users'
        });
    } catch (error) {
        res.status(500)
        res.json({
            message: 'Error. No data to send'
        })
        console.log(error)
    }
})
router.get('/:userId', async (req, res) => {
    const params = req.params.userId
    try{
        let myUser = await db.one(`SELECT * FROM users WHERE id =${params}`)
        res.json({
            payload: myUser,
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
    let {firstname, lastname, age} = req.body
    const insertQuery = `INSERT INTO users(firstname, lastname, age)
                            VALUES($1, $2, $3)`
    try{
        await db.none(insertQuery, [firstname, lastname, age])
        res.json({
            payload: req.body,
            message: 'POST request arrived at /users/register'
        })
    }catch(error) {
        res.json({
            message: 'There was an error registering the user'
        })
    }
    
})

module.exports = router;