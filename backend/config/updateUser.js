const User = require('../models/User')
 const updateUser = async (req, res) => {
    try {
        const { username, name, bio, imageUrl} = req.body;
        const user = await User.findOne({username: req.body.username})
        user.username = username;
        user.name = name;
        user.bio = bio;
        user.imageUrl = imageUrl;
        console.log("User updated")
        console.log(user)
        res.status(200).json({message: "User updated!"})
        await user.save();
    } catch (err) {
        console.log("Failed to update user:", err)
    }
 }

 module.exports = updateUser