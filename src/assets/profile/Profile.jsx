import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DisplayInfo from './DisplayInfo'
import UpdateInfo from './UpdateInfo'
import axios from 'axios'
import '../../App.css'

  function Profile() {
     const [visible, setVisible] = useState(true)
      const [visible2, setVisible2] = useState(false)
      const [buttonFade, setButtonFade] = useState(false)
      const [isEditing, setIsEditing] = useState(false)
      const [user, setUser] = useState(null)
      const { username } = useParams();
      
      useEffect(()=>{
        const fetchUser = async () => {
          try {
            const res = await axios.get(`http://localhost:5000/api/user/${username}`);
            setUser(res.data)
            console.log(res.data)
          } catch (err) {
            console.log(ErrorEvent)
          }
        }
        fetchUser();
    }, [username]);
    
    if (!user) return <div>Loading...</div>
        
      const textStyle = visible?{
        animation: "appear 0.5s",
    
      }:{animation: "disappear 0.5s",
      
    
      }
      const inputStyle = visible?{
        animation: "appear 0.5s",
        "display": "block",
      }:{animation: "disappear 0.5s",
        "display": "block",
        display: "block"
      }

      function changeEditing() {
        setVisible(false);
        setTimeout(()=> {
          setVisible(true)
          setIsEditing(!isEditing);
        }, 400)
      }

      function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value})
      }

    return (
      <>
        {!isEditing?
        <>
        <DisplayInfo style={inputStyle} user={user} changeEditing={changeEditing}/></>:
        <>
        <UpdateInfo user={user} style={inputStyle} visible={visible2} handleChange={handleChange} setUser={setUser} changeEditing={changeEditing}/>
        </>
        }
      </>
    )
  }

  export default Profile