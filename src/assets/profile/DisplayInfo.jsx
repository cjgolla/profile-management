import { useState, useRef, useEffect } from 'react'
import ImageUploader from './ImageUploader';
import { ReactComponent as EditIcon } from '../edit.svg'

function DisplayInfo({user, style, setUser, changeEditing}) {
    console.log(user)
      return(
        
        <div style={style}><ImageUploader user={user} setUser={setUser}/>
        <div>{user.name}</div>
        <div>{user.bio}</div>
        <EditIcon onClick={changeEditing} style={{color: "white", fill: "white", width:"20px", cursor: "pointer"}}/>
        
        </div>
      )
    }

    export default DisplayInfo