import './App.css';
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import NoteState from './context/notes/NoteState';
import {
  Routes,
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';
import { useState } from 'react';
function App() {
  const [alert,setAlert]=useState(null);
  const showAlert = (message,type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    },2000)
  }
  return (
    <NoteState>
       
    <Router>
        <Navbar />
        <Alert alert= {alert }/>
        <div className="container">

      <Routes>
        <Route path="/" element={<Home showAlert={showAlert}/>} />
      </Routes>

      <Routes>
        <Route path="/about" element={<About />} />

      </Routes>
      <Routes>
        <Route path="/signup" element={<Signup showAlert={showAlert}/>} />

      </Routes>
      <Routes>
        <Route path="/login" element={<Login showAlert={showAlert}/>} />

      </Routes>

        </div>
    </Router >
    
    </NoteState>
  );
}

export default App;
