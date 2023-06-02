import { React, useState, useEffect } from 'react'
import Header from '../Components/Header'
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();
  
  async function logIn(e) { 
    e.preventDefault();
    if (validate()) {
     
      let item = { email, password }
      let result = await axios.post("http://127.0.0.1:8000/api/login", item)
      console.log(result.data);
      if (result.data === 'Login failed') {
        toast.error('Please provide valid credentials');
      } else {
        localStorage.setItem('user', JSON.stringify(result.data));
        navigate('/');
        toast.success('Login successfull');
        
      }
    }
  }


  const validate = () => {
    let result = true;

    if (email === '' || email === null) { 
      result = false;
      toast.error('Email Required');
    }
    if (password === "") {
      result = false;
  toast.error('Password Required');
    }
    return result;

    
  }
 

  useEffect(() => {
    let token = localStorage.getItem('user');
    if (token) {
      navigate('/');
    }
  })

  return (
      <>
      <div className="container my-5">
        <div className="d-flex align-items-center justify-content-between">
          <div className="logo"> <Link to="/" className='navbar-brand'><img src="/assets/images/logo.png" alt="site-logo" width="200" /></Link></div>
          <div className='d-flex align-items-center'>
            <h6 className='mx-5'>New user?</h6>
            <Link to="/register" className="btn btn-site">Sign Up</Link>
            </div>
        </div>
     </div>

      <div className="container ">
        <div className="row loginpage">
          <div className="col-lg-6">
            <p className='my-3 display-3 fw-bold'>Customer<br/> Login<br/>--</p>
          </div>
          <div className="col-lg-6">
            <form onSubmit={logIn}>
            <div className="row justify-content-center">
            <input className='form-control my-3' type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"  />
           
            <input className='form-control my-3' type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit" className='btn btn-site my-3' >Login</button>
              
              </div>
              </form>
          </div>
        </div>
      </div>
      
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      </>
  )
}

export default Login
