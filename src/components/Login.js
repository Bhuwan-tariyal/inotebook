import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';


const host = "http://localhost:5000"; 
function Login(props) {
    const [credentials, setCredentials] = useState({email:"",password:""});
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();//page does not load again and agin
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({email:credentials.email,password:credentials.password}) //sending to ther server
        });
        const json = await response.json();
        console.log(json);
        if(json.success)
        {
            //save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            props.showAlert("successfull login",'success');
            navigate('/');
            }
        else{
            props.showAlert("invilid cadential",'danger');
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
      }


    return (
        <>
            <div className="container mt-3">
                <h2>Login to contiune to iNotebook</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} autoComplete='"username' onChange={onChange} id="email" aria-describedby="emailHelp" name="email" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} autoComplete="current-password"  onChange={onChange} id="password" name="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </>
    )
}

export default Login