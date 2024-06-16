import './App.css';
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import NoteState from './context/notes/NoteState';
import Signup from './components/Signup';
import Login from './components/Login';
import { useState } from 'react';
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  const [alert, setAlert] = useState(null);
  const backendUrl = "https://notebook-api-flame.vercel.app/";

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <NoteState>
      <Router>
        <Navbar showAlert={showAlert} />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert} backendUrl={backendUrl} />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup showAlert={showAlert} backendUrl={backendUrl} />} />
            <Route path="/login" element={<Login showAlert={showAlert} backendUrl={backendUrl} />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
