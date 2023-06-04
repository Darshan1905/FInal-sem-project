import React from "react";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";


function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [discountedTotalPrice, setDiscountedTotalPrice] = useState(0);

  

  async function fetchCartItems() {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/cart/${
          JSON.parse(localStorage.getItem("user")).id
        }`
      );
      // const updatedCartItems = response.data.filter(item => item.product !== null);
      // setCartItems(updatedCartItems);

      setCartItems(response.data);

      // Total items
      const totalItemsCount = response.data.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      setTotalItems(totalItemsCount);

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

  

  useEffect(() => {
    fetchCartItems();
  }, []);

  async function removeItem(productId) {
    try {
      const userid = JSON.parse(localStorage.getItem("user")).id;
      await axios.delete(
        `http://127.0.0.1:8000/api/cart/${userid}/${productId}`
      );

      console.log("Product removed from cart successfully");

      fetchCartItems();
    } catch (error) {
      console.error(error);
    }
  }

  async function updateQuantity(productId, quantityChange) {
    const item = cartItems.find((item) => item.product.id === productId);

    if (!item) {
      console.error(`Item not found with productId ${productId}`);
      return;
    }

    const currentQuantity = item.quantity || 0;
    const updatedQuantity = currentQuantity + quantityChange;

    if (updatedQuantity < 1) {
      console.error(
        `Quantity cannot be less than 1 for productId ${productId}`
      );
      return;
    }

    try {
      const userid = JSON.parse(localStorage.getItem("user")).id;
      await axios.put(`http://127.0.0.1:8000/api/cart/${userid}/${productId}`, {
        quantity: updatedQuantity,
      });

      console.log("Quantity updated successfully");

      fetchCartItems();
     
    } catch (error) {
      console.error(error);
    }
  }

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
                              Shopping Cart
                            </h1>
                          </div>

                          <hr className="my-4" />
                          {cartItems.map((item, i) => {
                            return (
                              <>
                                <div
                                  className="row mb-4 d-flex justify-content-between align-items-center"
                                  key={i}
                                >
                                  <div className="col-md-2 col-lg-2 col-xl-2">
                                    <img
                                      src={
                                        "http://127.0.0.1:8000/storage/uploads/" +
                                        item.product.image
                                      }
                                      className="img-fluid rounded-3"
                                      alt="Product image"
                                    />
                                  </div>
                                  <div className="col-md-3 col-lg-3 col-xl-3">
                                    <h6 className="text-muted">
                                      {item.product.category.title}
                                    </h6>
                                    <h6 className="text-black mb-0">
                                      {item.product.title}
                                    </h6>
                                  </div>
                                  <div className="col-md-3 col-lg-3 col-xl-2 d-flex align-items-center justify-content-between border">
                                    <button
                                      className="btn px-2"
                                      onClick={() =>
                                        updateQuantity(item.product.id, -1)
                                      }
                                    >
                                      <h4>-</h4>
                                    </button>

                                    <h4>{item.quantity}</h4>

                                    <button
                                      className="btn px-2"
                                      onClick={() =>
                                        updateQuantity(item.product.id, 1)
                                      }
                                    >
                                      <h4>+</h4>
                                    </button>
                                  </div>
                                  <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                    <h6 className="mb-0">
                                      {item.quantity * item.product.price} Rs.
                                    </h6>
                                  </div>
                                  <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                    <button
                                      onClick={() =>
                                        removeItem(item.product.id)
                                      }
                                      className="btn text-muted"
                                    >
                                      <img
                                        src="/assets/images/delete.png"
                                        alt="site-logo"
                                        width="25px"
                                      />
                                    </button>
                                  </div>
                                </div>

                                <hr className="my-4" />
                              </>
                            );
                          })}

                          <div className="pt-5">
                            <h6 className="mb-0">
                              <i className="fas fa-long-arrow-alt-left me-2"></i>
                              <Link to="/allproduct" className="text-dark ">
                                Back to shop
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 bg-grey">
                        <div className="p-5">
                          <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                          <hr className="my-4" />
                          <div className="d-flex justify-content-between mb-4">
                            <h6 className="text-uppercase">Total items </h6>
                            <h6>{totalItems}</h6>
                          </div>
                          <hr className="my-4" />
                          <div className="d-flex justify-content-between mb-4">
                            <h6 className="text-uppercase">Subtotal</h6>
                            <h6>₹ {totalPrice}/-</h6>
                          </div>

                          {cartItems.length > 0 ? (
                            <>
                              <div className="d-flex justify-content-between mb-4">
                                <h6 className="text-uppercase">Shipping</h6>
                                <h6>₹ {shippingCharges}/-</h6>
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

                              <Link to='/checkout'>
                          <button
                            type="button"
                            className="btn btn-dark btn-block btn-lg"
                            data-mdb-ripple-color="dark"
                            // disabled={cartItems.length === 0} // Disable the button when cart is empty
                          > 
                            Go To Checkout 
                            </button>
                          </Link>
                            </>
                          ) : (
                            <>
                              <div className="d-flex justify-content-between mb-4">
                                <h6 className="text-uppercase">Shipping</h6>
                                <h6>₹ 0/-</h6>
                              </div>
                           
                              <div className="d-flex justify-content-between mb-5">
                                <h6 className="text-uppercase">
                                  Total(incl.taxes)
                                </h6>
                                <h6>₹ 0/-</h6>
                                </div>
                               
                          <button
                            type="button"
                            className="btn btn-dark btn-block btn-lg"
                            data-mdb-ripple-color="dark"
                            disabled={cartItems.length === 0} // Disable the button when cart is empty
                          > 
                            Go To Checkout 
                            </button>
                       
                            </>
                          )}
                          
                            
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
    </>
  );
}

export default Cart;
