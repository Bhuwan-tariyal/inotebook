import './App.css';
import React , { useState } from "react";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';

import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <>
      <NoteState>
        <Router>
          <Navbar></Navbar>
          <Alert alert={alert}></Alert>
          <div className="container">
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert}></Home>} />
            <Route path="/about" element={<About></About>} />
            <Route path="/login" element={<Login showAlert={showAlert}></Login>}/>
            <Route path="/signup" element={<Signup showAlert={showAlert}></Signup>}/>
          </Routes>
          </div>
        </Router>

      </NoteState>
    </>
  );
}

export default App;
