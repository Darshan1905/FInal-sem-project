import axios from "axios";
import { React, useEffect,useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import Header from "../Components/Header"
import Footer from "./Footer";
import { toast } from "react-toastify";
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Singleproduct = () => {

  let { product } = useParams();
 
  const [sproduct, setSproduct] = useState([])
  

  // const getUser = async () => {
  //   try {
  //     const token = await localStorage.getItem('user');
  //     await axios.get("http://127.0.0.1:8000/api/user").then(res => {
  //       console.log(res.data)//this is logging nothing.
       
  //     }).catch(e => console.log(e));
  //   } catch (e) {
  //     console.log('error' + e);
  //   }
  // };

  // useEffect(() => {
  //   getUser();
  // });


   
    
  useEffect(() => {
    
    async function productdetails() {
    
      try {
        await axios.get(`http://127.0.0.1:8000/api/allproducts/${product}`).then(response => {
          setSproduct(response.data)
          console.log(response.data);
        })

      } catch (error) {
        console.log(error);
      }
    }

    productdetails();
  
    
  }, [product]);

  const navigate = useNavigate();

  function addTOCart(id) {
    // e.preventDefault();

    const data = {
      userid:JSON.parse(localStorage.getItem('user')).id,
      productid: id,
      quantity: 1
    }

    // console.log(data)
    axios.post('http://127.0.0.1:8000/api/addtocart', data).then(response => {
      console.log(response.data);
      if (response.data.status == 201) {
        toast.success('Product successfully added to cart');
      } else if (response.data.status == 202) {
        toast.error('Product is already in the cart');
      }
    })
   
    
  }





  return (
      <div>
          <Header />

      <div className="container my-5">
        <div className="row">
          <div className="col-lg-6">
            <img src={"http://127.0.0.1:8000/storage/uploads/" + sproduct.image} alt="" width="80%" />
          </div>
          <div className="col-lg-6">
            <h3>{sproduct.title}</h3>
            <h6 className="my-4"><b>Category:</b> {sproduct?.category?.title}</h6>
            <h5 className="my-4"><b>{sproduct.price} Rs</b></h5>
         
            {sproduct.quantity <= 0 ?  <button className="btn btn-danger mb-4">Out Of Stock</button>
            : <button className="btn btn-success mb-4">In Stock</button> }

            <h6><b>About this item: </b><br></br><br></br>{sproduct.description}</h6>
            
            {sproduct.quantity > 0 ? <div className="d-flex align-items-center justify-content-between w-75">
            <a href="#" className="btn btn-site my-3" onClick={()=>addTOCart(sproduct.id)}>
              Add to cart
            </a><br></br>
            <a href="https://wa.me/6353850703" target="_blanck" className="btn btn-site  bg-success text-white" >
              Contact Via WhatsApp
              </a>
            </div>
              
            : <h4 className="my-5">Product will be available soon</h4> }

          </div>
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
    </div>
  )
}

export default Singleproduct
