import { useState, useRef, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DisplayUsers from './assets/profile/DisplayUsers'
import MainPage from './assets/profile/MainPage'

import './App.css'
import Profile from './assets/profile/Profile'
import CreateUser from './assets/profile/CreateUser'
import LogUser from './assets/profile/LogUser'
import axios from 'axios'
import UserStatus from './assets/profile/UserStatus'



function App() {

  return (
    <>

    <LogUser />
    <UserStatus />
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
