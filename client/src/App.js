import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect, createContext } from "react";

import MainRouter from "./MainRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UserContext = createContext(null);
export const ScreenWidthContext = createContext(window.innerWidth);

axios.defaults.withCredentials = true;

function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    const storedLoggedin = sessionStorage.getItem("loggedIn");
    return storedLoggedin ? JSON.parse(storedLoggedin) : false;
  });
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : { id: "", username: "", manager: false, member: false };
  });

  useEffect(() => {
    sessionStorage.setItem("loggedIn", JSON.stringify(loggedIn));
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [loggedIn, user]);

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
