import React, { useEffect, useState } from "react";
import "./storeshoe.css";
import cart from "../images/carticon.png";
import Alert from "./Alert";
import axios from "axios";

const Cart = ({datacart, cartTitles, cartImages, cartPost, setCartRemoved}) => {
  const [cartdata, setCartdata] = useState([]);
  const [image, setImg] = useState([]);
  const [title, setTitle] = useState([]);
  const [post, setPost] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
 const removecart = (id) => {
    console.log("this is id at the removecart function with cart id:", id);
    axios
      .delete(`http://localhost:5000/cart/delete-cartItem/${id}`)
      .then((res) => {
        //err.response.data.message
        console.log(res);
        setCartRemoved(true);
      }
      )
      .catch((err) => {
        console.log("At the remove cart catch:",err);
        err.response.data.map((e) => {
          return <Alert type="danger" message={e.msg} />;
        }
        );
      }
      );
  };
  useEffect(() => {
    console.log("Cart Images:",cartImages);
    setCartdata([...datacart]);
    setImg([...cartImages]);
    setTitle([...cartTitles]);
    setPost([...cartPost]);

  }, [datacart, cartImages, cartTitles, cartPost]);
  return <div>
    {}
    <div className="cartdiv">
          <div className="filterdivheader">
            <div>
              <p>CART</p>
            </div>
            <div>
              <p>
                <img src={cart} style={{ width: 50 }} alt=""></img>
              </p>
            </div>
          </div>
          <div className="cartshoes">
            {
              cartdata?.map((e, ind) => {
              return (
                <div className="cartcontent">
                  <button id={e.id} onClick={() => removecart(e.id)}>
                    ❌
                  </button>
                  <img src={image[ind]} alt=""></img>
                  <div>
                    <h4>{title[ind]}</h4>
                    <p>{e.username}</p>
                    <br></br>
                    <p>by {post[ind]}</p>
                    <h5>Rs {e.cartPrice}/-</h5>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="des">
            <div className="designer">What's stopping you, designer?</div>
            <div className="ordernow">
              <button>order now</button>
            </div>
          </div>
        </div>
  </div>;
};

export default Cart;
