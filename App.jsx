import React from 'react'
import {BrowserRouter, Routes , Route} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/AddStudent';
import AddUser from './pages/AddUser';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = "/" element={<Login/>}/>
      <Route path = "/dashboard" element={<Dashboard />}/>
      <Route path = "/addstudent" element={<AddStudent />}/>
      <Route path = "/adduser" element={<AddUser />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App