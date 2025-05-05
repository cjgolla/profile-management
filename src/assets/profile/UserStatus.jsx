import { useState, useEffect } from 'react'
import axios from 'axios'

export default function UserStatus() {
    const [loggedUser, setLoggedUser] = useState(null);

    useEffect(()=> {
        axios.post('http://localhost:5000/api/authUser', {}, {
            withCredentials: true
        }).then(res => {
            setLoggedUser(res.data);
            console.log(`Logged in as ${loggedUser.username}`)
        })
        .catch(() => {
            console.log("Not logged in yet");
            setLoggedUser(null)
        })
    })
      if(loggedUser) {
        return(
            <div style={{width: "20px", height: "20px", background: `url(${loggedUser.imageUrl})`, backgroundSize: "cover"}}></div>
          )
      } else {
        return(
            <div></div>
        )
      }
      
      
}


