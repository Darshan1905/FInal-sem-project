import axios from "axios";
import {React, useEffect,useState} from "react";

import Header from "../Components/Header"
import { Link  } from 'react-router-dom'

const Category = () => {

  const [category, setCategory] = useState([])


    async function getallcategory() {
        try {
            const item = await axios.get("http://127.0.0.1:8000/api/allcategories")
          setCategory(item.data);
          console.log(item.data);
        } catch (error) {
            console.log(error);
        }
    }

   
    useEffect(() => {
        getallcategory(); 
        
    },[])

  return (
    <div>
          <Header />
      <div className="container">
      <div className="container mt-5">
        <div className="h2 fw-bold my-5">All Categories</div>
</div>
      <div className="row">
        {
            category.map((cat,i) => {
            return (
              <div className="col-lg-3 col-md-4 col-sm-6 my-3 all-prod" key={i}>
                <Link to={"/category/" + cat.slug}>
                  <div className="card effect">
                    <img className="card-img-top" src={"http://127.0.0.1:8000/storage/uploads/" + cat.image} alt="Card image cap"/>
                    <div className="card-body">
                      <h5 className="card-title">{cat.title}</h5>  
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

export default Category
