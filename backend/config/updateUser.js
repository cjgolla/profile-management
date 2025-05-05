const User = require('../models/User')
 const updateUser = async (req, res) => {
    try {
        
        const { username, name, bio, imageUrl} = req.body;
        
        const user = await User.findOne({username: req.body.username})
        console.log(`${username}'s imageurl: ${user.imageUrl}`)
        user.username = username;
        user.name = name;
        user.bio = bio;
        user.imageUrl = imageUrl;
        console.log("User updated")
        await user.save();
        console.log(`${username}'s new imageurl: ${imageUrl}`)
        res.status(200).json({message: "User updated!"})
        
    } catch (err) {
        console.log("Failed to update user:", err)
    }
 }

 module.exports = updateUser