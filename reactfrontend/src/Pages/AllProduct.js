import axios from "axios";
import {React, useEffect,useState} from "react";
import Header from "../Components/Header"
import Footer from "../Components/Footer";
import { Link } from 'react-router-dom'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const AllProduct = () => {

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
   <>
      <Header />

      
      <div className="container mt-5">
        <div className="h2 fw-bold mx-2 my-3">All Products</div>
</div>


      <div className="container">
      <div className="row">
        {
          products.map((product,i) => {
            return (
              <div className="col-lg-3 col-md-4 col-sm-6 my-3 all-prod" key={i}>
               
                <div className="card effect">
                <Link to={"/" + product.slug}>
                    <img className="card-img-top " src={"http://127.0.0.1:8000/storage/uploads/" + product.image} alt="Card image cap" />
                    </Link>
                  <div className="card-body">
                  <Link to={"/" + product.slug}>
                      <h5 className="card-title">{product.title}</h5>
                      </Link>
                      
                      <p className="card-text p-description">{product.description}</p>
                      
                      <h5 className="">{product.price} Rs</h5>

                      <a href="#" onClick={()=>addTOCart(product.id)} className="btn btn-orange cart-btn"><img src="/assets/images/cart-shopping-solid.svg" alt="" width="20" /></a>
                      
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
     
      </>
  );
};

export default AllProduct;
