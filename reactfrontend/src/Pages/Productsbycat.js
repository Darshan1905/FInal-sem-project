import axios from "axios";
import {React, useEffect, useState} from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

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
   

  return (
    <div>
      <Header />
      
      
        <div className="container">
          <div className="row">
          {
            getproduct.map((getitem,i) => {
            return (
              <div className="col-lg-3 col-md-4 col-sm-6 my-3 all-prod" key={i}>
                <Link to={"/" + getitem.slug}>
                  <div className="card effect">
                    <img className="card-img-top" src={"http://127.0.0.1:8000/storage/uploads/" + getitem.image} alt="Card image cap"/>
                    <div className="card-body">
                      <h5 className="card-title">{getitem.title}</h5>
                      <p className="card-text p-description">{getitem.description}</p>
                      <h4 className="">{getitem.price} Rs</h4>
                      <Link className="btn btn-orange cart-btn"><img src="/assets/images/cart-shopping-solid.svg" alt="" width="20" /></Link>
                    </div>
                  </div>
                  </Link>
                </div>
            )
          })
          }
            
          </div>
        </div>
      
        

    </div>
  )
}

export default Productbycat
