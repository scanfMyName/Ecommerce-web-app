import React, { useEffect, useState } from "react";
import styles from "./allstore.module.css";
import filter from "../images/filter.png";
import search from "../images/search.png";
import Cart from "./Cart";
import Storeshoe from "./Storeshoe";
import axios from "axios";
import Alert from "./Alert";

const Allstore = () => {
  const [, updateState] = React.useState();
  const [username, setUsername] = useState("dfhhgd");
  const [prodData, setProdData] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);
  const [minprice, setminprice] = useState(0);
  const [maxprice, setmaxprice] = useState(0);
  const [type, settype] = useState("");
  const [typeval, settypeval] = useState("");
  const [priMax, setpriMax] = useState(0);
  const [addedToCart, setAddedToCart] = useState(true);
  const [removedFromCart, setRemovedFromCart] = useState(false);
  const [datacart, setDatacart] = useState([]);
  const [cartTitles, setCartTitless] = useState([]);
  const [cartImg, setCartImg] = useState([]);
  const [cartProd, setCartProd] = useState([]);

  const [alldesign, setAlldesign] = useState(["2", "3", "3+"]);
  const [allcolor, setAllcolor] = useState([
    "red",
    "blue",
    "yellow",
    "gray",
    "black",
  ]);

  const [cselected, setCselected] = useState(false);
  const [dselected, setDselected] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const colorchange = (e) => {
    if (cselected === "") {
      setCselected(e.target.value);
    } else {
      setCselected("");
    }
  };
  const designChange = () => {
    if (dselected === "") {
      setDselected("design");
    } else {
      setDselected("");
    }
  };
  useEffect(() => {
    if (typeval) {
      axios
        .post("http://localhost:5000/filter/category", { category: typeval })
        .then((res) => {
          // console.log(res.data);
          setProdData(res.data);
        });
    } else if (minprice && maxprice) {
      // console.log("minprice:", minprice);
      // console.log("maxprice:", maxprice);

      axios
        .post("http://localhost:5000/filter/price", {
          minPrice: minprice,
          maxPrice: maxprice,
        })
        .then((res) => {
          // console.log(res.data);
          setProdData(res.data);
          setminprice(0);
          setmaxprice(0);
        });
      // axios.get(`http://localhost:5000/filter/price`, {}).then((res) => {
    } else {
      axios.get("http://localhost:5000/product/getall").then((res) => {
        // console.log(res.data);
        setProdData(res.data);
        let categories = [];
        res.data.map((item) => {
          categories.push(item.category);
        });

        // make a set of the categories array
        let uniqueCategories = new Set(categories);
        uniqueCategories = [...uniqueCategories];
        setAllCategories(uniqueCategories);
        // console.log("All categories:", allCategories);
      });
    }
    if (removedFromCart || addedToCart) {
      axios
        .get("http://localhost:5000/cart/getUserCart/" + username)
        .then((res) => {
          console.log(res.data);
          setDatacart(res.data);
          let titles = [];
          let imgs = [];
          let prods = [];
          let ids = [];
          res.data?.map((item) => {
            ids.push(item.productId);
          });
          ids?.map((id) => {
            axios
              .get("http://localhost:5000/product/details/" + id)
              .then((res) => {
                titles.push(res.data.title);
                imgs.push(res.data.image[0]);
                prods.push(res.data.postedBy);
              })
              .catch((err) => {
                console.log(err);
              });
          });
          setCartTitless(titles);
          setCartImg(imgs);
          setCartProd(prods);
          setAddedToCart(false);
          setRemovedFromCart(false);
        });
    }
  }, [filterApplied, removedFromCart, addedToCart]);

  const typeChange = (e) => {
    if (e.target.id === "category") {
      if (e.target.checked === true) {
        settype(e.target.id);
        settypeval(e.target.value);
      } else {
        settype("");
        settypeval("");
      }
    } else if (e.target.id === "price") {
      if (e.target.checked === true) {
        let prices = e.target.value.split("-");
        settype(e.target.id);
        setminprice(prices[0]);
        setmaxprice(prices[1]);
        setpriMax(prices[1]);
      } else {
        settype("");
        setminprice(0);
        setmaxprice(0);
        setpriMax(0);
      }
    }
  };

  const [shoesid, setshoesid] = useState("");
  const [show, setshow] = useState(0);
  const showfun = (e) => {
    if (show) {
      setshow(0);
      setshoesid("");
    } else {
      setshoesid(e.id);
      setshow(1);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      {show ? (
        <Storeshoe
          setCartRemoved={setRemovedFromCart}
          cartTitles={cartTitles}
          cartImages={cartImg}
          cartPost={cartProd}
          username={username}
          datacart={datacart}
          setCartAdded={setAddedToCart}
          setDatacart={setDatacart}
          idm={shoesid}
          setshow={setshow}
        />
      ) : (
        <div>
          <div className={styles.all}>
            <div className={styles.filterdiv}>
              <div className={styles.filterdivheader}>
                <div>
                  <p>FILTERS</p>
                </div>
                <div>
                  <p>
                    <img src={filter} alt=""></img>
                  </p>
                </div>
              </div>
              <div className={styles.remaining}>
                <p>Cost</p>
                <div>
                  <div>
                    <input
                      type="checkbox"
                      value="1-50"
                      id="price"
                      checked={priMax === "50"}
                      onChange={typeChange}
                    />
                    <p>Rs. 1-50</p>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      value="51-1000"
                      id="price"
                      checked={priMax === "1000"}
                      onChange={typeChange}
                    />
                    <p>Rs. 51-1000</p>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      value="1001-100000000"
                      checked={priMax === "100000000"}
                      id="price"
                      onChange={typeChange}
                    />
                    <p>Rs. 1001+</p>
                  </div>
                </div>
                <p>Category</p>
                <div>
                  {allCategories?.map((item) => {
                    return (
                      <div>
                        <input
                          type="checkbox"
                          value={item}
                          id="category"
                          checked={typeval === item}
                          onChange={typeChange}
                        />
                        <p>{item}</p>
                      </div>
                    );
                  })}
                </div>
                <p>Colour</p>
                <div className="color">
                  {allcolor?.map((item) => {
                    return (
                      <div>
                        <input
                          type="checkbox"
                          value={item}
                          checked={cselected === item}
                          onChange={colorchange}
                        />
                      </div>
                    );
                  })}
                </div>
                <p>Design Templates</p>
                <div>
                  {alldesign?.map((item) => {
                    return (
                      <div>
                        <input
                          type="checkbox"
                          value={item}
                          checked={dselected === item}
                          onChange={designChange}
                        />
                        <p>{item}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={styles.filterbutton}>
                <button
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setFilterApplied(!filterApplied);
                  }}
                >
                  apply
                </button>
              </div>
            </div>
            <div className={styles.shoediv}>
              <div className={styles.shoedivheader}>
                <div>
                  <p>SHOES</p>
                </div>
                <div>
                  <p>
                    <button>
                      <img src={search} alt=""></img>
                    </button>

                    {showSearchInput && (
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                      />
                    )}
                  </p>
                  <select >
                    <option >sort by</option>
                    <option >Ascending</option>
                    <option >Descending</option>
                  </select>
                </div>
              </div>
              <div className={styles.shoedivbody}>
                {prodData?.map((item) => {
                  return (
                    <button

                      id={item.id}
                      onClick={(e) => {
                        showfun(item);
                      }}
                    >
                      <div className={styles.shoecard}>
                        <img src={item.image[0]} alt=""></img>
                        <p>{item.title}</p>
                        <div>
                          <p>Rs. {item.price}/-</p>
                          <p>
                            <span style={{ color: "orange" }}>
                              &#9734;&#9734;&#9734;&#9734;&#9734;
                            </span>
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            <Cart
              setCartRemoved={setRemovedFromCart}
              datacart={datacart}
              cartTitles={cartTitles}
              cartImages={cartImg}
              cartPost={cartProd}
            ></Cart>
          </div>
        </div>
      )}
    </>
  );
};

export default Allstore;
