const User = require('../models/User')

const getUser = async(req, res) => {
    console.log(`Getting ${req.params.username}`)
    try {
        
            const user = await User.findOne({username: req.params.username})
    
            if (!user) {
                res.status(404).send("User not found")
                console.log("User not found", err.status)
            } else {
                res.json({
                    username: user.username,
                    name: user.name,
                    bio: user.bio,
                    imageUrl: user.imageUrl
                })
                console.log(`User ${username} found`)
            }
        } catch (err) {
            console.log(`Couldn't find user: ${req.params.username}`)
        }
}

module.exports = getUser