import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router";
import {NavDropdown} from 'react-bootstrap';



const Header = () => {

  const users = JSON.parse(localStorage.getItem('user'));

  let navigate = useNavigate();
  
  function logout() {
    localStorage.removeItem('user');
    navigate('/login');
  }
  
  return (
    <>
  <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-lg">
  <div className="container">
    <Link to="/" className='navbar-brand'><img src="/assets/images/logo.png" alt="site-logo" width="150" /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        
        {/* <Link to="/about"  className='fw-bold nav-item' >About</Link>
        
       
        <Link to="/product" className='fw-bold nav-item' >Products</Link> */}
            
             

              <Link to="/allproduct" className='fw-bold nav-item' >All Products</Link>

              <Link to="/category" className='fw-bold nav-item' >Categories</Link>

              <Link to="/contactus" className='fw-bold nav-item' >Contact Us</Link>
              
              <Link to="/cart"> <img className='mx-2 heade-cart' src="/assets/images/cart-shopping-solid.svg" alt="" width="20" /></Link>
              
        
            </ul>
           
            {
                localStorage.getItem("user") ?
                <>
                
                  <div className="btn-group">
                    <button className="btn dropdown-toggle fw-bold border border-0" data-bs-toggle="dropdown" aria-expanded="false">
                    {users.name}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end cursor-pointer" onClick={logout}>
                      <li className='btn curser-pointer fw-semibold border border-0'> Logout </li>
                    </ul>
                  </div>
                 
                  </>
                  :
                  <>
                    <Link to="/login"  className='nav-link ' >Login</Link>
                  <Link to="/register" className='nav-link ' >Register</Link>
                 
                 
             
                  </>
              }
    </div>
  </div>
</nav>

    </>
  )
}

export default Header
