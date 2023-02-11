import { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {FaUser} from 'react-icons/fa'
import {register,reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'


function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''                
  })
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const {user, isLoading, isError, isSuccess,message}= useSelector((state)=> state.auth)

useEffect(()=>{
if(isError)
toast.error(message)

if(isSuccess || user){
  navigate('/')
}

dispatch(reset())
},[user,isError,isSuccess,message,navigate,dispatch])

  const onChange=(e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit=(e)=>{
    e.preventDefault();

    if(password!==password2){
      toast.error('Passwords do not match')
    }
    else{
      const userData={
        name,
        email,
        password
      }
      dispatch(register(userData))
    }
  }

  if(isLoading)
  return <Spinner/>

  const {name, email, password, password2} = formData
  return <>
  <section className="heading">
    <h1>
      <FaUser /> Register
      <p>Please create an account</p>
    </h1>
  </section>
  <section className="form">
    <form onSubmit={onSubmit} >
      <div className="form-group">
      <input 
      type="text" 
      id="name"
      className="form-control" 
      name='name'
      value={name}
      placeholder="Enter your name"
      onChange={onChange}
      />
      </div>
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
      <input 
      type="password" 
      id="password2"
      className="form-control" 
      name='password2'
      value={password2}
      placeholder="Confirm Password"
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

export default Register