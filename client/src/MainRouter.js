import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import { readAll } from "./api/book-api";
import Header from "./components/core/Header";
import Footer from "./components/core/Footer";
import Home from "./components/core/Home";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import AddItem from "./components/book-shop/AddItem";
import AddPromotion from "./components/book-shop/AddPromotion";
import EditItem from "./components/book-shop/EditItem";
import Cart from "./components/book-shop/Cart";

const MainRouter = () => {
  const [allItems, setAllItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    readAll()
      .then((data) => {
        setAllItems(data.books);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header setCartItems={setCartItems} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              allItems={allItems}
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/add-item"
          element={<AddItem setAllItems={setAllItems} />}
        />
        <Route path="/add-promotion" element={<AddPromotion />} />
        <Route
          path="/edit-item/:id"
          element={<EditItem setAllItems={setAllItems} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              setCartItems={setCartItems}
              allItems={allItems}
            />
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default MainRouter;
