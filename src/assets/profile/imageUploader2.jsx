import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { ReactComponent as CameraIcon } from '../cameraIcon.svg';

function ImageUploader(user, setUser) {
    const inputRef = useRef();
    const [image, setImage] = useState(null)

    useEffect(() => {
      const storedImage = localStorage.getItem('uploadedImage');
      if(storedImage) {
        setImage(storedImage)
      }
    }, [])

  
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
        const res = await fetch('https://api.cloudinary.com/v1_1/dlskbjlfy/image/upload', {
          method: 'POST',
          body: formData
        })
  
        const data = await res.json();
        localStorage.setItem('uploadedImage', data.secure_url)
        setImage(data.secure_url);
        console.log('Uploaded:', data.secure_url)
        console.log(res)
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