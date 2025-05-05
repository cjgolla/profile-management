const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config

const authUser = async (req, res) => {
    console.log(req.body)
    try {
        const {user, pwd} = req.body;
        if (!user || !pwd) {
            
            
            console.log("username/password not included")
            return res.status(404).json("user not found")
        }
        const foundUser = await User.findOne({username: user})
        if(!foundUser) {
            console.log("User not found")
            res.send(404).json({"User not found": `${user} does not exist in db`})
        }

        const match = await bcrypt.compare(pwd, foundUser.password)
        if(match){
            const accessToken = jwt.sign(
                {id: foundUser._id},
                "secretkey1",
                { expiresIn: '15m'}
            )
            const refreshToken = jwt.sign(
                {id: foundUser._id},
                'secretkey2',
                { expiresIn: '24h' }
            )
            
            foundUser.refreshToken = refreshToken;
            console.log({imageUrl: foundUser.imageUrl})
            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                maxAge: 24*60*60 *1000,
                sameSite: 'Strict',
                secure: true
            }).json({imageUrl :foundUser.imageUrl})
            console.log("Success!") 
            
        } else {
            console.log("incorrect info")
            res.send(401).json({"message": "incorrectinfo"})
        }
    } catch (err) {
        console.log("Error authenticating user", err)
        res.send(500)
    }
    
}

module.exports = authUser;