import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Home from './components/Home';
import HomeList from './components/HomeList';
import Profile from './components/Profile';
import SingleHome from './components/SingleHome';
import SignUp from './components/SignUp';


function App() {

  
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/homes" element={<HomeList />} />
        <Route path="/homes/:id" element={<SingleHome />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
      
    
    </>
  );
}

export default App;
