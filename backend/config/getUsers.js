const User = require('../models/User')

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (err) {
        console.log("Error finding users", err)
        res.send(500)
    }
}

module.exports = getUsers