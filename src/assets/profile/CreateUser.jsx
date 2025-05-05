import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import ImageUploader from './ImageUploader'

export default function CreateUser() {
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value})
    }
async function sendInfo() {
    try{
        const fullname = `${user.firstName} ${user.lastName}`
        const res = await axios.post(`http://localhost:5000/api/createUser`, {
            "username": user.username,
            "name": fullname,
            "password": user.password,
            "email": user.email,
            "imageUrl": user.imageUrl
        })
        console.log("User created!")
        navigate(`/api/${user.username}`)
    } catch (err) {
        console.log("Error creating user", err)
    }   
}
    return(
        <>
        <div>
            <ImageUploader user={user} setUser={setUser} createUser={true}/>
            <input 
                name="firstName"
                placeholder="First name"
                value= {user.firstName}
                onChange={handleChange}>     
            </input>
            <input 
                name="lastName"
                placeholder="Last name"
                value= {user.lastName}
                onChange={handleChange}>     
            </input>
            <input 
                name="username"
                placeholder="username"
                value= {user.username}
                onChange={handleChange}>     
            </input>
            <input 
                name="password"
                placeholder="Enter password"
                value= {user.password}
                onChange={handleChange}>     
            </input>
            <input 
                name="email"
                placeholder="Email"
                value= {user.email}
                onChange={handleChange}>     
            </input>
            <input 
                name="bio"
                placeholder="Enter Bio"
                value= {user.bio}
                onChange={handleChange}>     
            </input>
            <button onClick={sendInfo}></button>
        </div>
        </>
    )
}