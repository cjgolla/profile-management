const express = require('express');
const mongoose = require('mongoose')
const router = require('./router');
const User = require('./models/User')
const app = express();
const cors = require('cors')
const uri = "mongodb://localhost:27017/profileProject"
const uriUsers = "mongodb://localhost:27017/profileProject/users"
const db = mongoose.connection.db

const PORT = 5000;
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Mongoose is connected");
}).catch(err => {
    console.log("Mongo connection error:", err);
});
/*
router.get('/users',  async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (err) {
        console.log("Error finding users", err)
        res.send(500)
    }
})

router.delete('/users', async (req, res) => {
    console.log(req.body.id)
    try {
        const deletedUser = await User.findByIdAndDelete(req.body.id);

        if (!deletedUser){
            return res.status(404).json({message: "user not found"})
        } else {
            res.status(200).json({ message: `user ${deletedUser.username} deleted`})
        }
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
})

router.get('/user/:username', async (req, res) => {
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
})

router.post('/updateUser', async (req, res) => {
    const { username, name, bio, imageUrl} = req.body;

    try {
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

})

router.post('/createUser', async (req, res) => {
    const { username, name, password, email, bio, imageUrl } = req.body;

        try {
            const newUser = new User({
                username,
                name,
                password,
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
) */
app.use(express.json())
app.use('/api', router)

app.listen(PORT, ()=> {
    console.log("Connected to port ", PORT)
})
