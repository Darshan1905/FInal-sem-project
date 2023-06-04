import axios from "axios";
import {React, useEffect, useState} from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../Components/Header"


const Productbycat = () => {

  const { items } = useParams();

  const [getproduct, setGetproduct] = useState([])

  
  useEffect(() => {

    async function productsbycat() {

      try {
        const item = await axios.get(`http://127.0.0.1:8000/api/allcategories/${items}`)
        console.log(item.data)
        setGetproduct(item.data)
        
      } catch (error) {
        console.log(error);
      }
      
    }
  
    productsbycat();


  },[])
   
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
      
      
        <div className="container">
          <div className="row">
          {
            getproduct.map((getitem,i) => {
            return (
              <div className="col-lg-3 col-md-4 col-sm-6 my-3 all-prod" key={i}>
              
                  <div className="card effect">
                  <Link to={"/" + getitem.slug}>
                      <img className="card-img-top" src={"http://127.0.0.1:8000/storage/uploads/" + getitem.image} alt="Card image cap" />
                      </Link>
                      <div className="card-body">
                      <Link to={"/" + getitem.slug}>
                        <h5 className="card-title">{getitem.title}</h5>
                        </Link>
                      <p className="card-text p-description">{getitem.description}</p>
                      <h4 className="">{getitem.price} Rs</h4>

                      <a href="#" onClick={()=>addTOCart(getitem.id)} className="btn btn-orange cart-btn"><img src="/assets/images/cart-shopping-solid.svg" alt="" width="20" /></a>
                    
                    </div>
                  </div>
                
                </div>
            )
          })
          }
            
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

export default Productbycat
