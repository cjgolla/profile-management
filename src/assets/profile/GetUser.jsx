import { useParans, useEffect, useState } from 'react';
import axios from 'axios'


function getUser() {
    const { username } = useParams();
    const [user, setUser] = useState(null);

    useEffect(()=>{
        axios.get(`/api/${username}`)
        .then(res => setUser(res.data))
        .catch(err => console.log("Couldn't find user via frontend", err))
    }, [username]);

    if (!user) return <p>Loading...</p>
}