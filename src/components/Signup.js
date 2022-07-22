import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
function Signup(props) {
  const host = "http://localhost:5000";
  const [credentials, setCredentials] = useState({ name: " ", email: "", password: "", cpassword: "" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${host}/api/auth/createuser`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);

    //save the auth token and redirect
  if(json.success)
   { localStorage.setItem('token', json.authtoken);
   props.showAlert("successfull SignUp",'success');
    navigate('/');
  }

    else
    {
      props.showAlert("invilid cadential",'danger');
    }



  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  return (
    <>
      <div className="container my-3">
        <h2>Create an account to use inotebook</h2>
      </div>
      <form onSubmit={handleSubmit} >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" value={credentials.name} minLength={4} aria-describedby="emailHelp" onChange={onChange} name="name" />

        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" autoComplete='"username' id="email" minLength={5} value={credentials.email} aria-describedby="emailHelp" onChange={onChange} name="email" />

        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" autoComplete="current-password" minLength={5} onChange={onChange} value={credentials.password} id="password" name="password" />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" autoComplete="current-password" minLength={5} onChange={onChange} value={credentials.cpassword} id="cpassword" name="cpassword" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>


    </>
  )
}

export default Signup