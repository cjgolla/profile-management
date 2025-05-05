import ImageUploader from './ImageUploader'
import { ReactComponent as SaveIcon } from '../save.svg'
import axios from 'axios'
import { ReactComponent as Back} from '../back1.svg'
import { useState, useEffect } from 'react'

export default function UpdateInfo({user, style, handleChange, setUser, changeEditing}) {
   const [save, setSave] = useState(false)
   const saved = !save? {
    opacity: 0
  } : {
    opacity: 1,
    color: "lime"
  }

   useEffect(() => {

   })
    async function updateUser() {
      console.log("User updating")
      try {
        console.log("Sending request")
        await axios.post('http://localhost:5000/api/updateUser', {
          username: user.username,
          name: user.name,
          bio: user.bio,
          imageUrl: user.imageUrl
        }, { timeout: 3000})
        console.log("User saved")
        setSave(true)
        setTimeout(()=> {
          setSave(false)
        }, 3000)
      } catch (err) {
        console.log("Couldn't update user: ", err)
      }
      
    }

    const allowedKeys = ["username", "name", "bio"]

    const filtered = Object.fromEntries(
      Object.entries(user).filter(([key]) => allowedKeys.includes(key))
    )
    console.log(filtered)

    let display = Object.keys(filtered).map((key) => {
        return(
          key==="bio"?
          <div key={key}>
          <div>{key}</div>
          <textarea 
            className="text"
            type="text"
            value={user[key]} 
            name={key} 
            placeholder={user.firstName} 
            onChange={handleChange} 
            onKeyDown={(e) => {if (e.key === "Enter"){setIsEditing(false)}}}>
          </textarea>
          </div>:
          
          <div key={key}>
          <div>{key}</div> 
          <input 
            value={user[key]} 
            name={key} 
            placeholder={user.firstName} 
            onChange={handleChange} 
            ></input>
          </div>
        )
      }) 
      console.log(user)
      return(
        <div style={style}>
            <ImageUploader user={user} setUser={setUser}/>
        <>{display}</>
        <Back onClick={changeEditing} style={{color:"white", width:20,margin: 10, cursor: "pointer"}} />
        <SaveIcon onClick={updateUser} style={{ fill: 'white', width: 20, height: 40 ,"margin-top": 10, cursor: "pointer", pointerEvents: 'all'}} />
        <div style={saved}>Saved</div>
        </div>
      )
}
