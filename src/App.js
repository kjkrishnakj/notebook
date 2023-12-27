import './App.css';
import Navbar from './components/Navbar';
// import Home from './components/Home';
import { Home } from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
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
        <Alert message= "hello" />
        <div className="container">

      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>

      <Routes>
        <Route path="/about" element={<About />} />

      </Routes>

        </div>
    </Router >
    
    </NoteState>
  );
}

export default App;
