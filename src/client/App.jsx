import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Home from './components/Home';
import HomeList from './components/HomeList';
import Profile from './components/Profile';
import SingleHome from './components/SingleHome';
import SignUp from './components/SignUp';
import AllHomes from './components/AllHomes';
import AgentList from './components/AgentsList';
import Sphere from './components/AddHomeForm';


function App() {

  
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/homes" element={<HomeList />} />
        <Route path="/all-homes" element={<AllHomes />} />
        <Route path="/homes/:id" element={<SingleHome />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/agents" element={<AgentList />} />
        <Route path="/sell" element={<Sphere />} />
      </Routes>
      
    
    </>
  );
}

export default App;
