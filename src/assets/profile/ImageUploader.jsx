import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { ReactComponent as CameraIcon } from '../cameraIcon.svg';
const cloudinaryUrl = import.meta.env.VITE_CLOUDINARY_URL;

function ImageUploader({user, setUser, createUser}) {
    const inputRef = useRef();
    const [image, setImage] = useState(null)
  
/*     useEffect(() => {
      const storedImage = localStorage.getItem('uploadedImage');
      if(storedImage) {
        setImage(storedImage)
      }
    }, []) */

    useEffect(() => {
      setImage(user.imageUrl)
    }, [user.imageUrl])
    const handleImageChange = async (e) => {
      const file = e.target.files[0]
      if (file) {
        const imageUrl = URL.createObjectURL(file);
     
        setImage(imageUrl)
      }
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'art_img')
    
      try {
        const res = await fetch(cloudinaryUrl, {
          method: 'POST',
          body: formData
        })
      

        const data = await res.json();
        localStorage.setItem('uploadedImage', data.secure_url)
        setImage(data.secure_url);
        console.log(user.imageUrl)
        console.log(data.secure_url)
        setUser({...user, imageUrl: data.secure_url})
        async function updateUser() {
          try {
            await axios.put('http://localhost:5000/api/updateUser', {
              username: user.username,
              name: user.name,
              bio: user.bio,
              imageUrl: data.secure_url
              
            })
            console.log(user.imageUrl)
            console.log("User updated")
          } catch (err) {
            console.log("Couldn't update user: ", err)
          }
        }
        if (!createUser) {
          updateUser();
        }
        
      } catch (err) {
        console.log('Upload error: ', err)
      }
    
    };
  
    const triggerInput = () => {
      inputRef.current.click()
    }    
    return (
      <div>
        
        <input type="file" accept="image/*" ref={inputRef} onChange={handleImageChange} style={{display: "none"}}/>
        <div className="profile-pic" onClick={triggerInput} style={{"background-image": `url(${image})`, "background-size": "cover", "background-position": "center"}}>
        <CameraIcon className="camera-icon"/>
        </div>
      </div>
    )
  }

  export default ImageUploader