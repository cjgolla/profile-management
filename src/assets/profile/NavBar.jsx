import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom'
import Profile from './Profile'
import UpdateInfo from './UpdateInfo'
import DisplayUsers from './DisplayUsers'
import { useState, useEffect } from 'react'

export default function NavBar() {
    const navigate = useNavigate()
    const [filteredList, setFilteredList] = useState([])
    const [userList, setUserList] = useState([])
    const [user, setUser] = useState([])

    useEffect(() => {
        const res = axios.get('http://localhost:5000/api/users')
            .then(response => {
                setUserList(response.data)
                
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    function displayList() {
        console.log("Displaying list")
        if(!filteredList.length) {
            return <></>
        }
        console.log(filteredList)
        return (
            <div style={{position: "relative"}}>
                <ul className={"ul-dropdown"} style={{position: "absolute", padding: "0px"}}>
                    {filteredList.map(user => {
                        return <li className={"search-dropdown"} style={{ "padding": "10px"}} key={user._id}>{user.username}</li>
                    })}
                </ul>
            </div>
        )
    }

    function search(e) {
        const val = e.target.value.toLowerCase();
        const filtered = userList.filter(user =>
            user.username.toLowerCase().includes(val)
        )
        setFilteredList(filtered)
        setUser(filtered[0])
        console.log(user)
    }

    return (

            <nav>
                <div style={{"flex-direction": "row"}}>
                <input onChange={search} onKeyDown={e=>{
                    if(e.key === "Enter"){
                        axios.get(`/api/${user.username}`)
                        .then(res => 
                            navigate(`/api/${user.username}`))
                        .catch(err => console.log(err))
                    }
                }}></input>
                {displayList()}
                </div>
                <Link to='/api/users'>Users List</Link>

            </nav>
        
    )
}