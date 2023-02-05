import { useState, useEffect } from "react"
import {FaSignInAlt} from 'react-icons/fa'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''             
  })

  const onChange=(e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit=(e)=>{
    e.preventDefault();
  }
  const {email, password} = formData
  return <>
  <section className="heading">
    <h1>
      <FaSignInAlt /> Sign in!
      <p>Login to get your goals</p>
    </h1>
  </section>
  <section className="form">
    <form onSubmit={onSubmit} >
      <div className="form-group">
      <input 
      type="email" 
      id="email"
      className="form-control" 
      name='email'
      value={email}
      placeholder="Enter your email"
      onChange={onChange}
      />
      </div>      
      <div className="form-group">
      <input 
      type="password" 
      id="password"
      className="form-control" 
      name='password'
      value={password}
      placeholder="Enter Password"
      onChange={onChange}
      />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-block">Submit</button>
      </div>
    </form>
  </section>
  </>
}

export default Login