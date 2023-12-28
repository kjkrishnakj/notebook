import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
export default function Navbar(props) {

  let navigate=useNavigate();

  let location = useLocation();
  const logout=()=>{
    localStorage.removeItem('token');
    navigate("/login")
    props.showAlert("Thanks for using notebook, logged out sucessfully ","success")
  }
  useEffect(() => {
  }, [location])
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-transparent" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)' }} >
        <div className="container-fluid " >
          <Link className="navbar-brand" style={{color:"black"}} to="/">NoteBook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse"  id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} style={{color:"black"}} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} style={{color:"black"}} to="/about">about</Link>
              </li>
            </ul>
            {!localStorage.getItem('token') ? <form><Link className='btn btn-outline-success mx-2' to="/login" role="button">Login</Link>
            <Link className='btn btn-outline-primary mx-2' to="/signup" role="button">Signup</Link>
            </form>: <button className='btn btn-outline-danger mx-2'onClick={logout}>Logout</button>}
           
              
          </div>
        </div>
      </nav>
    </div>
  )
}
