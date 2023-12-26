import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import {
  Routes,
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
function App() {
  return (
    <NoteState>
      
    <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>

      <Routes>
        <Route path="/about" element={<About />} />

      </Routes>

    </Router >
    
    </NoteState>
  );
}

export default App;
