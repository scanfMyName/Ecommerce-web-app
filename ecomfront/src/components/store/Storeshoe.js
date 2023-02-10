import React, { useEffect, useState } from "react";
import "./storeshoe.css";
import Cart from "./Cart";
import axios from "axios";
import Alert from "./Alert";

const Storeshoe = ({
  datacart,
  idm,
  setshow,
  username,
  setCartAdded,
  cartTitles,
  cartImages,
  cartPost,
  setCartRemoved,
}) => {
  const [curUser, setCurUser] = useState(username);
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [colours, setColours] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [postedBy, setPostedBy] = useState("");
  const [price, setPrice] = useState(0.0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(0);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [mid, setMid] = useState([
    { link: "yzyz", colour: "xyxy" },
    { link: "yzyz", colour: "xyxy" },
    { link: "yzyz", colour: "xyxy" },
  ]);
  const [front, setFront] = useState([
    { link: "yzyz", colour: "xyxy" },
    { link: "yzyz", colour: "xyxy" },
    { link: "yzyz", colour: "xyxy" },
  ]);
  const [back, setBack] = useState([
    { link: "yzyz", colour: "xyxy" },
    { link: "yzyz", colour: "xyxy" },
    { link: "yzyz", colour: "xyxy" },
  ]);
  const [shole, setShole] = useState([
    { link: "yzyz", colour: "xyxy" },
    { link: "yzyz", colour: "xyxy" },
    { link: "yzyz", colour: "xyxy" },
  ]);
  const [cartTitl, setCartTitl] = useState([]);
  const [cartImg, setCartImg] = useState([]);
  const [cartPoste, setCartPoste] = useState([]);
  const [cartPrice, setCartPrice] = useState([]);

  // for selecting a particular size and colour and design and quantity subsequently the price and finally will add the fiunctionality for adding to cart
  const [quantity, setQuantity] = useState(0);
  const [addToCart, setAddToCart] = useState(false);
  const [selectedc, setSelected] = useState(""); // for selecting a particular colour
  const [selectedSize, setSelectedSize] = useState(""); // for selecting a particular size
  const [selectedFront, setSelectedFront] = useState(""); // for selecting a particular front design
  const [selectedMid, setSelectedMid] = useState(""); // for selecting a particular mid design
  const [selectedBack, setSelectedBack] = useState(""); // for selecting a particular back design
  const [selectedShole, setSelectedShole] = useState(""); // for selecting a particular shole design
  const [ammount, setAmmount] = useState(0); // for calculating the ammount
  const [showAlert, setShowAlert] = useState(false);
  const [msgs, setMsg] = useState("");
  const [msgTyp, setType] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/product/details/${idm}`).then((res) => {
      console.log(
        "In the then of details api axios of single product id:",
        idm,
        " with data:",
        res.data
      );
      setId(res.data.id);
      setTitle(res.data.title);
      setColours(res.data.colour);
      setSizes(res.data.size);
      setPostedBy(res.data.postedBy);
      setPrice(res.data.price);
      setCategory(res.data.category);
      setImage(res.data.image);
      setRating(res.data.rating);
      setReviews(res.data.reviews);
      setStock(res.data.stock);
      setDescription(res.data.description);
      setCartTitl(cartTitles);
      setCartImg(cartImages);
      setCartPoste(cartPost);
      // everyone should have a colour(in Hex to be able to show in the image) and a link for the image corresponding to that particular part.
    });
  }, [idm, cartImages, cartPost, cartTitles]);

  const handleChange = (e) => {
    if (e.target.id === "size") {
      setSelectedSize(e.target.value);
    } else if (e.target.id === "front") {
      setSelectedFront(e.target.value);
    } else if (e.target.id === "mid") {
      setSelectedMid(e.target.value);
    } else if (e.target.id === "shole") {
      setSelectedShole(e.target.value);
    } else if (e.target.id === "back") {
      setSelectedBack(e.target.value);
    }
    setSelected(e.target.value);
  };
  const addtocart = (e) => {
    let temp = {
      productId: id,
      username: curUser,
      price: ammount,
      quantity: quantity,
      size: selectedSize,
      color: selectedc,
    };
    console.log(
      "Printing the temp for cart item before sending to backend:",
      temp
    );
    axios
      .post("http://localhost:5000/cart/create-cartItem", temp)
      .then((res) => {
        console.log(res.data);
        setCartAdded(true);
        setMsg("Added to your cart successfully");
        setType("success");
      })
      .catch((err) => {
        console.log(
          "Error while adding an item to the cart in the backend:",
          err
        );
        setShowAlert(true);
        setMsg("Error: Please select both the size and the colour:");
        setType("error");
      });
  };
  const showRatings = (rat) => {
    let arr = [];
    for (let i = 0; i < rat; i++) {
      arr.push(<p>&#9733;</p>);
    }
    return arr;
  };
  return (
    <div>
      {showAlert && <Alert type={msgTyp} message={msgs} />}
      <div className="shoe">
        <div className="left">
          <div className="leftheader">
            <button onClick={() => setshow(0)}>
              <p>&#8249;</p>
            </button>
            <p className="designp">your design space</p>
          </div>
          <div className="leftbody">
            <div className="limage">
              <img src={image[0]} alt=""></img>
            </div>
            <div className="limages">
              {image.map((e) => {
                return <img src={e} alt=""></img>;
              })}
            </div>
            <div className="rdetails">
              <div>
                <h1>{title}</h1>
                <h2>{postedBy}</h2>
              </div>
              <div>
                <p>Rating:{showRatings(rating)} </p>
              </div>
              <div>
              <p>Review count:{reviews}</p>
              </div>
              <p>Stocks available:{stock}</p>
              <div>
                <h2>Rs {price}/-</h2>
                <p>{description}</p>
              </div>
              <div className="boxes">
                <h5>Front</h5>
                {front.map((e) => {
                  return (
                    <div className="box">
                      <input
                        id="front"
                        type="checkbox"
                        value={e}
                        checked={selectedFront === e}
                        onChange={handleChange}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="boxes">
                <h5>Middle</h5>
                {mid.map((e) => {
                  return (
                    <div className="box">
                      <input
                        id="mid"
                        type="checkbox"
                        value={e}
                        checked={selectedMid === e}
                        onChange={handleChange}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="boxes">
                <h5>Back</h5>
                {back.map((e) => {
                  return (
                    <div className="box">
                      <input
                        type="checkbox"
                        value={e}
                        id="back"
                        checked={selectedBack === e}
                        onChange={handleChange}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="boxes">
                <h5>Sole</h5>
                {shole.map((e) => {
                  return (
                    <div className="box">
                      <input
                        id="shole"
                        type="checkbox"
                        value={e}
                        checked={selectedShole === e}
                        onChange={handleChange}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="boxes">
                <h5>Colours available:</h5>
                <div className="color">
                  {colours?.map((item) => {
                    return (
                      <div>
                        <input
                          type="checkbox"
                          id="colour"
                          value={item}
                          checked={selectedc === item}
                          onChange={handleChange}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="boxes">
                <h5>Size</h5>
                {sizes.map((e) => {
                  return (
                    <div className="boxsize">
                      <input
                        id="size"
                        type="checkbox"
                        value={e}
                        checked={selectedSize === e}
                        onChange={handleChange}
                      />
                      <label style={{ marginTop: "1vh" }}> {e}</label>
                    </div>
                  );
                })}
              </div>

              <div className="boxes">
                <h5>Quantity</h5>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              
            </div>
            <div className="starp">
              <p style={{ marginLeft: 30, marginBottom: 30 }}>
                Rate Product{" "}
                <span style={{ color: "orange" }}>
                  &#9734;&#9734;&#9734;&#9734;&#9734;
                </span>
              </p>
            </div>
            <div className="leftfooter">
              <button style={{ cursor: "pointer" }}>share design</button>
              <button style={{ cursor: "pointer" }} onClick={addtocart}>
                add to cart
              </button>
            </div>
          </div>
        </div>
        <Cart
          datacart={datacart}
          cartTitles={cartTitl}
          cartImages={cartImg}
          cartPost={cartPoste}
          setCartRemoved={setCartRemoved}
        />
      </div>
    </div>
  );
};

export default Storeshoe;
