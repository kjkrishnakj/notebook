import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credeantials, setCredeantials] = useState({ name: "", email: "", password: "", cpassword: "" })
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credeantials;
    navigate("/")
    const response = await fetch(`http://localhost:3200/api/auth/createuser`, {
      //destructuring
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password })
    })
    const json = await response.json();
    // console.log(json);
    localStorage.setItem("token", json.authtoken);
    navigate("/")
    props.showAlert("Account created successfully", "success")
  }
  const onChange = (e) => {
    setCredeantials({ ...credeantials, [e.target.name]: e.target.value })
  }

  return (
    <div className='container'>
      <h1 className='my-3'>Signup</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name="name" onChange={onChange} id="name" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name="email" onChange={onChange} id="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" onChange={onChange} id="Password" minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name="cpassword" onChange={onChange} id="cpassword" minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup