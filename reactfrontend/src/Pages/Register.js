import { React, useState,useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
  
 
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();
  
  async function signUp() {

    if (validate()) {

 
      try {
        let item = { name, email, password }
        await axios.post("http://127.0.0.1:8000/api/register", item).then(response => {
          localStorage.setItem('user', JSON.stringify(response.data));
          navigate('/');
          
        })
      } catch (err) {
        
        if (err.response?.data?.errors?.email?.length === 1 ) {
          toast.error('Email has already been taken ');
        } 
        if (err.response?.data?.errors?.password?.length === 1) {
          toast.error('Password must be min 8 ');
        }
        
      
      }

     
     
     
      
      //  if (result.data !== 422) {
      //   toast.error('Please provide valid username and password');
      // } else {
      //   localStorage.setItem('user', JSON.stringify(result.data));
      //   navigate('/');
      // }

    }
  }

  const validate = () => {
    let result = true;

    if (name === '' || name === null) { 
      result = false;
      toast.error('Name Required');
    }
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
  });


 

  return (
      <>
       <div className="container my-5">
        <div className="d-flex align-items-center justify-content-between">
          <div className="logo"> <Link to="/" className='navbar-brand'><img src="/assets/images/logo.png" alt="site-logo" width="200" /></Link></div>
          <div className='d-flex align-items-center'>
            <h6 className='mx-5'>Already a user?</h6>
            <Link to="/login" className="btn btn-site">Sign in</Link>
            </div>
        </div>
     </div>

      <div className="container">
        <div className="row registerpage">
          <div className="col-lg-6">
          <p className='my-3 display-3 fw-bold'>Create<br/> Account<br/>--</p>
          </div>

          <div className="col-lg-6">
          <div className="row justify-content-center">
         
      <input className='form-control my-3' type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input className='form-control my-3' type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input className='form-control my-3' type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
           
              <button className='btn btn-site my-3' onClick={signUp}>Register</button>
             
           
            
          </div>
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

export default Register
