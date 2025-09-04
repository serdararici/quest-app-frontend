
import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home/Home'
import User from './components/User/User'
import Navbar from './components/Navbar/Navbar'
import Auth from './components/Auth/Auth'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:userId" element={<User />} />
        <Route
          path="/auth"
          element={
            localStorage.getItem("currentUser") != null
              ? <Navigate to="/" />
              : <Auth />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
