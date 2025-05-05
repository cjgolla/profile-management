
const bcrypt = require('bcrypt')
const User = require('../models/User')

const createUser = async (req, res) => {
        try {
            const { username, name, password, email, bio, imageUrl } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new User({
                username,
                name,
                hashedPassword,
                email,
                bio,
                imageUrl
            }) 
            await newUser.save()
            console.log(`User ${username} was created`);
        } catch (err) {
            console.log("Error creating user: ", err)
            res.send("Error creating user:", err)
        }
}

module.exports = createUser;