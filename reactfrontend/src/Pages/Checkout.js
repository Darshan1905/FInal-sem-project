import React from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedTotalPrice, setDiscountedTotalPrice] = useState(0);
  const [discountprice, setDiscountprice] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
    



  const [checkoutInput, setCheckoutInput] = useState({
      firstname : '',
      lastname : '',
      phone : '',
      email : '',
      address : '',
      city : '',
      state : '',
      zipcode: '',
      payment_mode: '',
  });
    
    const handleInput = (e) => {
        e.persist();
        setCheckoutInput({...checkoutInput,[e.target.name]:e.target.value});
        
    }

    const submitOrder = (e) => {
        e.preventDefault();

        const data = {    
          
            userid: JSON.parse(localStorage.getItem('user')).id,
            firstname : checkoutInput.firstname,
            lastname : checkoutInput.lastname,
            phone : checkoutInput.phone,
            email : checkoutInput.email,
            address : checkoutInput.address,
            city : checkoutInput.city,
            state : checkoutInput.state,
            zipcode : checkoutInput.zipcode,
            payment_mode: checkoutInput.payment_mode,
        }

        axios.post(`http://127.0.0.1:8000/api/placeorder`, data ).then(res => {
            if (res.data.status === 200) {
                toast.success('order placed successfully');
                setError([]);
                navigate('/');
            } else if (res.data.status === 422) {
                toast.error('All fields are mandetory');
                setError(res.data.errors); 
            }
        })
    }

  async function fetchCartItems() {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/cart/${
          JSON.parse(localStorage.getItem("user")).id
        }`
      );
      console.log(response.data);

      // const updatedCartItems = response.data.filter(item => item.product !== null);
      // setCartItems(updatedCartItems);

      setCartItems(response.data);
      // Calculate total price
      const totalPrice = response.data.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      setTotalPrice(totalPrice);
    } catch (error) {
      console.error("error");
    }
  }

  const shippingCharges = 50;

  function applyCouponCode() {
    if (couponCode === "CODE10") {
      const discountAmount = (totalPrice * 0.1).toFixed(2);
      const discountedTotalPrice = (
        totalPrice -
        discountAmount -
        shippingCharges
      ).toFixed(2);
      setDiscountedTotalPrice(discountedTotalPrice);

      const discountprice = (totalPrice * 0.1).toFixed(2);
      setDiscountprice(discountprice);

      setCouponError("");
    } else if (couponCode === "CODE20") {
      const discountAmount = (totalPrice * 0.2).toFixed(2);
      const discountedTotalPrice = (
        totalPrice -
        discountAmount -
        shippingCharges
      ).toFixed(2);
      setDiscountedTotalPrice(discountedTotalPrice);

      const discountprice = (totalPrice * 0.2).toFixed(2);
      setDiscountprice(discountprice);

      setCouponError("");
    } else {
      setCouponError("Invalid coupon code");
    }
  }

  useEffect(() => {
    fetchCartItems();
  }, []);

 

 
  return (
    <>
      <div>
        <Header />

        <section className="h-100 h-custom">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12">
                <div className="card card-registration card-registration-2">
                  <div className="card-body p-0">
                    <div className="row shadow g-0">
                      <div className="col-lg-8">
                        <div className="p-5">
                          <div className="d-flex justify-content-between align-items-center mb-5">
                            <h1 className="fw-bold mb-0 text-black">
                             Checkout
                            </h1>
                          </div>

                          <hr className="my-4" />
                          
                          <div className="card border">
                            <div className="card-header">
                               <h4> Basic Information</h4>
                            </div>
                            <div className="card-body">
                                
                                <div className="row py-4">
                                    <div className="my-2 col-md-6">
                                        <div className="form-group">
                                            <label>First name</label>
                                            <input type="text" name="firstname" onChange={handleInput} value={checkoutInput.firstname} className="form-control" />
                                            <span className="text-danger">{error.firstname}</span>
                                        </div>
                                    </div>
                                    <div className="my-2 col-md-6">
                                        <div className="form-group">
                                            <label>Last name</label>
                                            <input type="text" name="lastname" onChange={handleInput} value={checkoutInput.lastname} className="form-control" />
                                            <span className="text-danger">{error.lastname}</span>
                                            
                                        </div>
                                    </div>
                                    <div className="my-2 col-md-6">
                                        <div className="form-group">
                                            <label>Phone number</label>
                                            <input type="number" name="phone" onChange={handleInput} value={checkoutInput.phone} className="form-control" />
                                            <span className="text-danger">{error.phone}</span>
                                        
                                        </div>
                                    </div>
                                    <div className="my-2 col-md-6">
                                        <div className="form-group">
                                            <label>Email address</label>
                                            <input type="email" name="email" onChange={handleInput} value={checkoutInput.email} className="form-control" />
                                            <span className="text-danger">{error.email}</span>
                                            
                                        </div>
                                    </div>
                                    <div className="my-2 col-md-12">
                                        <div className="form-group">
                                            <label>Address</label>
                                            <textarea name="address" id="" cols="30" rows="5" onChange={handleInput} value={checkoutInput.address} className="form-control"></textarea>
                                            <span className="text-danger">{error.address}</span>
                                            
                                        </div>
                                    </div>
                                    <div className="my-2 col-md-4">
                                        <div className="form-group">
                                            <label>City</label>
                                            <input type="text" name="city" onChange={handleInput} value={checkoutInput.city} className="form-control" />
                                            <span className="text-danger">{error.city}</span>
                                            
                                        </div>
                                    </div>
                                    <div className="my-2 col-md-4">
                                        <div className="form-group">
                                            <label>State</label>
                                            <input type="text" name="state" onChange={handleInput} value={checkoutInput.state} className="form-control" />
                                            <span className="text-danger">{error.state}</span>
                                       
                                            
                                        </div>
                                    </div>
                                    <div className="my-2 col-md-4">
                                        <div className="form-group">
                                            <label>Zip code</label>
                                            <input type="text" name="zipcode" onChange={handleInput} value={checkoutInput.zipcode} className="form-control" />
                                            <span className="text-danger">{error.zipcode}</span>
                                        </div>
                                   </div>
                                   <div className="my-2 col-md-6">
                                      <div className="form-group">
                                  <label className="my-3">Payment Method:</label>
                                 
                                        <div className="form-check">
                                          <input
                                            type="radio"
                                            name="payment_mode"
                                            value="COD"
                                            checked={checkoutInput.payment_mode === "COD"}
                                            onChange={handleInput}
                                            className="form-check-input"
                                          />
                                          <label className="form-check-label">Cash on Delivery</label>
                                        </div>
                                        <div className="form-check">
                                          <input
                                            type="radio"
                                            name="payment_mode"
                                            value="Razorpay"
                                            checked={checkoutInput.payment_mode === "Razorpay"}
                                            onChange={handleInput}
                                            className="form-check-input"
                                          />
                                          <label className="form-check-label">Razorpay</label>
                                  </div>
                                  <span className="text-danger">{error.payment_mode}</span>
                                  </div>
                                  </div>
                                     <div className="mt-5 col-md-12">
                                        <div className="form-group text-end">
                                        <button className="btn btn-dark text-white rounded" onClick={submitOrder}>Place order</button>                                            
                                        </div>
                                    </div>
                                                              
                                </div>

                            </div>
                        </div>                      
                                                  

                          <div className="pt-5">
                            <h6 className="mb-0">
                              <i className="fas fa-long-arrow-alt-left me-2"></i>
                              <Link to="/cart" className="text-dark ">
                                Back
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 bg-grey">
                        <div className="p-5">
                          <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                          <hr className="my-4" />

                          <h6 className="text-uppercase mb-3">Coupon code</h6>
                          <div className="mb-5">
                            <div className="form-outline">
                              <input
                                type="text"
                                id="couponCode"
                                className="form-control form-control-lg"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                placeholder="Enter coupon code"
                              />
                            </div>
                            {couponError && (
                              <p className="text-danger">{couponError}</p>
                            )}
                            <button
                              type="button"
                              className="btn btn-dark btn-block mt-3"
                              onClick={applyCouponCode}
                              disabled={cartItems.length === 0}
                            >
                              Apply Coupon
                            </button>
                          </div>

                          <hr className="my-4" />

                          <div className="d-flex justify-content-between mb-4">
                            <h6 className="text-uppercase">Total items </h6>
                            <h6>{cartItems.length}</h6>
                          </div>
                          <hr className="my-4" />
                          <div className="d-flex justify-content-between mb-5">
                            <h6 className="text-uppercase">Subtotal</h6>
                            <h6>₹ {totalPrice}/-</h6>
                          </div>

                         
                              <div className="d-flex justify-content-between mb-4">
                                <h6 className="text-uppercase">Shipping</h6>
                                <h6>₹ {shippingCharges}/-</h6>
                              </div>

                              <div className="d-flex justify-content-between mb-4">
                                <h6 className="text-uppercase">Discount</h6>
                                <h6>₹ {discountprice}/-</h6>
                              </div>
                              <div className="d-flex justify-content-between mb-5">
                                <h6 className="text-uppercase">
                                  Total(incl.taxes)
                                </h6>

                                <h6>
                                  ₹
                                  {discountedTotalPrice > 0
                                    ? discountedTotalPrice
                                    : (totalPrice + shippingCharges).toFixed(2)}
                                  /-
                                </h6>
                                                  </div>
                                                  
                                                  {/* <button className="btn btn-dark text-white rounded" onClick={submitOrder}>Place order</button>   */}
                        
                         
                            
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
}

export default Cart;
