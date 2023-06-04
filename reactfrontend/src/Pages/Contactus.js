import axios from "axios";
import { React } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../Components/Header"
import Footer from "../Components/Footer";
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Contactus = () => {

  const [error, setError] = useState("");
  const navigate = useNavigate();
 
  const [checkoutInput, setCheckoutInput] = useState({
    fname : '',
    email : '',
    mobile : '',
    msg: '',
});
  
  const handleInput = (e) => {
      e.persist();
      setCheckoutInput({...checkoutInput,[e.target.name]:e.target.value});
      
  }

  const submitOrder = (e) => {
      e.preventDefault();

      const data = {    
          fname : checkoutInput.fname,
          email : checkoutInput.email,
          mobile : checkoutInput.mobile,
          msg : checkoutInput.msg,
      }

      axios.post(`http://127.0.0.1:8000/api/contactus`, data ).then(res => {
          if (res.data.status === 200) {
              toast.success('Email sent Successfully, We will get in touch with you.');
              setError([]);
              // navigate('/');
          } else if (res.data.status === 422) {
              toast.error('All fields are mandetory');
              setError(res.data.errors); 
          }
      })
  }

  useEffect(() => {
    
    window.scrollTo(0, 1);
  
  }, [])
  
  
 

  return (
   <>
      <Header />

      <div className="container mt-5">
        <div className="h2 fw-bold  my-5">Contact us</div>
</div>


      <div className="container">
      <div className="row">
     <form>
      <div className="mb-3">
    <label className="form-label"> Full Name</label>
              <input type="text" name="fname" className="form-control" id="exampleInputName1" onChange={handleInput} value={checkoutInput.fname} />
              <span className="text-danger">{error.fname}</span>
  </div>
  <div className="mb-3">
    <label className="form-label">Email address</label>
    <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  onChange={handleInput} value={checkoutInput.email}/>
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              <span className="text-danger">{error.email}</span>
  </div>
  <div className="mb-3">
    <label  className="form-label">Mobile Number</label>
              <input type="number" name="mobile" className="form-control" id="exampleInputNumber1" onChange={handleInput} value={checkoutInput.mobile} />
              <span className="text-danger">{error.mobile}</span>
       </div>
       <div className="mb-3">
      <label className="form-label" >Message</label>
              <textarea name="msg" className="form-control" id="textAreaExample1" rows="4" onChange={handleInput} value={checkoutInput.msg}></textarea>
              <span className="text-danger">{error.msg}</span>
                         
                          </div>
  <button type="submit" className="btn btn-site"  onClick={submitOrder}>Submit</button>
</form>
          </div>
      </div>
     
     
      <Footer />
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
  );
};

export default Contactus;
