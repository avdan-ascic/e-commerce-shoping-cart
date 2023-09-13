import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect, createContext } from "react";

import { isAuthenticated } from "./api/user-api";
import MainRouter from "./MainRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UserContext = createContext(null);
export const ScreenWidthContext = createContext(window.innerWidth);

axios.defaults.withCredentials = true;

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    username: "",
    manager: false,
    member: false,
  });
  
  useEffect(() => {
    isAuthenticated().then((data) => {
      if (data.user) {
        setUser({
          id: data.user._id,
          username: data.user.username,
          manager: data.user.manager,
          member: data.user.member,
        });
        setLoggedIn(true);
      } else {
        setUser({
          id: "",
          username: "",
          manager: false,
          member: false,
        });
        setLoggedIn(false);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ loggedIn, setLoggedIn, user, setUser }}>
        <BrowserRouter>
          <ToastContainer position="bottom-left" />
          <MainRouter />
        </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
