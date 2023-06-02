import React from 'react'
import { Link } from 'react-router-dom'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Footer = () => {

    function top() {
        window.scrollTo(0, 1);
    }

  return (
    <>
          
          <div className="container-fluid bg-light shadow-lg footer mt-5">
              <div className="container text-center">
                  <div className="row py-5 align-items-center">
                  <div className="col-lg-4">
                          <div className='text-center'>
                              <h3> Support </h3>
                              <p> FAQs<br />
                                  Returns<br/>
                                  Reviews<br/>
                                  Shipping<br />
                                  Contact Us<br /></p> 
                            </div>
                  </div>
                      <div className="col-lg-4"> <Link to="/" onClick={top} className='navbar-brand'><img src="/assets/images/logo.png" alt="site-logo" width="80%" /></Link></div>
                      <div className="col-lg-4">
                          <div className='text-center'>
                            <h3> Contact Us </h3>
                        <p>951-262-4584<br/>
                        info@skyweb.com<br/>
                        Krishnanagar, Ahmedabad - 382345, INDIA</p>
                            </div>
                      </div>
                 
                     
                  </div>
                  <hr />
                  <div className="row pb-5">
                      <div className="col-lg-6">© skyweb.com 2023</div>
                      <div className="col-lg-6">Privacy Policy & Terms</div>
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

export default Footer
