import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Nav from './Components/Nav';
import CreatePost from './Pages/CreatePost';

function App() {
  return (
    <div className='App'>
      <Router>
        <Nav/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/createPost' element={<CreatePost/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
