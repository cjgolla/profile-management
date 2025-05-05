import axios from 'axios'
import {useEffect, useState} from 'react'
import { ReactComponent as Trash} from '../trash.svg'

export default function DisplayUsers() {

    const [filteredList, setFilteredList] = useState([])
    const [userList, setUserList] = useState([])

    useEffect(() => {
        const res = axios.get('http://localhost:5000/api/users')
            .then(response => {
                setUserList(response.data)
                setFilteredList(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    function changeHistory() {
        console.log("History changed")
        //setUserList(history[history.length - 1])
    }
    function removeUser(userId) {
        axios.delete('http://localhost:5000/api/users', {
            data: {id: userId}
            
        })
        .then(function (response) {
            console.log("User removed", response)
            setUserList(prevList => prevList.filter(user => user._id !== userId))
        }).catch(function (error) {
            console.log(error)
        })
    }

    function search(e) {
        const val = e.target.value.toLowerCase();
        const filtered = userList.filter(user =>
            user.name.toLowerCase().includes(val)
        )
        setFilteredList(filtered)
    }

    function ListUsers() {
        return (
            <div>
                {filteredList.map(user => (
                <div key={user._id}>
                {user.name}
                <Trash
                style={{fill: "maroon", marginLeft: "5px", marginTop: "5px",width: "12px", cursor: "pointer"}}onClick={() => removeUser(user._id)}/>
                </div>
                ))}
            </div>
        )
    }

    return (
        <>
            <input
                placeholder="User"
                onChange={search}
                onKeyDown={(e) => {
                    if (e.key === "Backspace" && e.target.value === "") {
                        setFilteredList(userList)  // restore full list
                    }
                }}
            />
            <ListUsers />
        </>
    )
}