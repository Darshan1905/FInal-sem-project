import axios from "axios";
import {React, useEffect,useState} from "react";
import Header from "../Components/Header"
import Footer from "../Components/Footer";
import { Link } from 'react-router-dom'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Home = () => {

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

      <div id="carouselExampleSlidesOnly" className="carousel slide " data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="/assets/images/Banner.webp" className="d-block w-100 index-banner" alt="" />
    </div>
    <div className="carousel-item">
      <img src="/assets/images/Banner.webp" className="d-block w-100 index-banner" alt="" />
    </div>
    <div className="carousel-item">
      <img src="/assets/images/Banner.webp" className="d-block w-100 index-banner" alt="" />
    </div>
  </div>
</div>

      <div className="container mt-5">
        <div className="h2 fw-bold mx-2 my-3">New Products</div>
</div>


      <div className="container">
      <div className="row">
        {
          products.map((product,i) => {
            return (
              <div className="col-lg-3 col-md-4 col-sm-6 my-3 all-prod" key={i}>
                <Link to={"/" + product.slug}>
                  <div className="card effect">
                    <img className="card-img-top " src={"http://127.0.0.1:8000/storage/uploads/" + product.image} alt="Card image cap"/>
                    <div className="card-body">
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text p-description">{product.description}</p>
                      
                      <h5 className="">{product.price} Rs</h5>

                      <span className="btn btn-orange cart-btn"><img src="/assets/images/cart-shopping-solid.svg" alt="" width="20" /></span>
                      
                    </div>
                  </div>
                  </Link>
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

export default Home;
