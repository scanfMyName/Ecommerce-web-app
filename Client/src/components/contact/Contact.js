import React from "react";
import stylec from "./contact.module.css";
import twitter from "../images/twitter@3x.png";
import face from "../images/facebook@3x.png"
import insta from "../images/insta@3x.png"

const Contact = () => {
  return (
    <div>

      <div className={stylec.restcontact}>
        <div className={stylec.contactcard}>
            <h1>
            REACH US AT
            </h1>
            <h2>support@kicksup.com</h2>
            <p>for any technical support</p>
            <h2>info@kicksup.com</h2>
            <p>for more information</p>
            <h2>feedback@kicksup.com</h2>
            <p>to send your feedback</p>
            <h2>jobs@kicksup.com</h2>
            <p>to work with us</p>
        </div>
        <div className={stylec.contactlink}>
            <p>stay in touch</p>
            <div className={stylec.linkicons}>
                <img src={twitter} className={stylec.imageicon} alt=""></img>
                <img src={face} className={stylec.imageicon} alt=""></img>
                <img src={insta} className={stylec.imageicon} alt=""></img>
                
            </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
