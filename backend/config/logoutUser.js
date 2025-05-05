const User = require('../models/User')

const logoutUser = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204)
    
    const refreshToken = cookies.jwt;

    try {
        const foundUser = await User.findOne({refreshToken})

        foundUser.refreshToken = '';
        await foundUser.save()

        res.clearCookie('jwt', { http: true});
        console.log("Successfully logged out")
        res.status(204).json({"message": "successfully logged out"})
    } catch (err) {
        console.log("Could not logout")
        res.status(500).json({"Could not log out": err})
    }
}

module.exports = logoutUser