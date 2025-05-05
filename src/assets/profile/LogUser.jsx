import {useState} from 'react'
import axios from 'axios'

export default function LogUser() {

    const [logUser, setLogUser] = useState('')
    function handleChange(e) {
        setLogUser({...logUser, [e.target.name] : e.target.value})
    }

    async function handleEnter(e) {
        if(e.key === "Enter") {
            try{
                const res = await axios.post(
                    'http://localhost:5000/api/authUser',
                    { user: logUser.username, pwd: logUser.password},
                    { withCredentials: true}    
                );
                setLogUser(res.data);
                console.log(res.data)
            } catch {
                console.log("Failed to authenticate user")
            }
        }
    }

    return (
        <div>
            <input name="username" onChange={handleChange} onKeyDown={handleEnter} placeholder={"username"}></input>
            <input name="password" onChange={handleChange} onKeyDown={handleEnter} placeholder={"password"}></input>
        </div>
    )
}