const express = require('express')
const router = express.Router()
const verifyJWT = require(('./middleware/verifyJWT'))
const createUser = require('./config/createUser')
const authUser = require('./config/authUser.js')
const updateUser = require('./config/updateUser')
const logoutUser = require('./config/logoutUser')
const getUser = require('./config/getUser')
const getUsers = require('./config/getUsers')

router.route('/createUser').post(verifyJWT, createUser)
router.put('/updateUser', updateUser)
router.route('/logoutUser').post(verifyJWT, logoutUser)
router.get('/user/:username', getUser)
router.get('/users', getUsers)
router.post('/authUser', authUser)

module.exports = router
