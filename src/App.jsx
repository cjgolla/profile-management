import { useState, useRef, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import DisplayUsers from './assets/profile/DisplayUsers'
import MainPage from './assets/profile/MainPage'

import { ReactComponent as CameraIcon } from './assets/cameraIcon.svg';
import './App.css'
import Profile from './assets/profile/Profile'
import CreateUser from './assets/profile/CreateUser'

function App() {
  return (
    <>
    <Router >
      <Routes>
        <Route path='/' element={<MainPage />}></Route>
        <Route path='/api/:username' element={<Profile />}></Route>
        <Route path='/api/createUser' element={<CreateUser />}></Route>
        <Route path='/api/users' element ={<DisplayUsers />}></Route> 
      </Routes>
    </Router>
    </>
  )
}
export default App
