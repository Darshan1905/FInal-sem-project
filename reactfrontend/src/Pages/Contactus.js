import axios from "axios";
import {React, useEffect,useState} from "react";
import Header from "../Components/Header"
import Footer from "../Components/Footer";
import { Link } from 'react-router-dom'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Contactus = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    
    async function getallProducts() {

      try {
   
        const products = await axios.get("http://127.0.0.1:8000/api/allproducts")
        
        setProducts(products.data)
         
      } catch (error) {
        console.log(error);
      }
       
      } 
     
    getallProducts();

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
    <input type="text" className="form-control" id="exampleInputName1"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label  className="form-label">Mobile Number</label>
    <input type="number" className="form-control" id="exampleInputNumber1"/>
       </div>
       <div className="mb-3">
      <label className="form-label" >Message</label>
  <textarea className="form-control" id="textAreaExample1" rows="4"></textarea>
                         
                          </div>
  <button type="submit" className="btn btn-site">Submit</button>
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
