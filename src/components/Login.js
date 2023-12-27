import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credeantials,setCredeantials] = useState({email : "",password : ""})
    let navigate = useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:3200/api/auth/login`, {
            
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({email: credeantials.email,password:credeantials.password})
        })
        const json =await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem("token",json.authtoken);
            navigate("/")
            props.showAlert("Successfully logged in","success")
        }
        else{
            props.showAlert("Invalid Credentials!","danger")
        }
    }
    const onChange = (e)=>{
        setCredeantials({...credeantials,[e.target.name]:e.target.value})
    }
    return (
        <div className='container'>
      <h1 className='my-3'>Login</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email"  className="form-label">Email address</label>
                    <input type="email" value={credeantials.email} onChange={onChange} className="form-control" id="email" name='email' aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={credeantials.password} onChange={onChange} className="form-control" id="password" name='password'/>
                </div>
                
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
