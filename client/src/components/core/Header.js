import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { Menu, Image, Dropdown, Icon } from "semantic-ui-react";
import { UserContext } from "../../App";
import { logout } from "../../api/user-api";
import Logo from "../../assets/images/logo.png";

const Header = ({ setCartItems }) => {
  const { loggedIn, setLoggedIn, user, setUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();


  const handleLogout = () => {
    logout()
      .then(() => {
        setLoggedIn(false);
        setUser({
          id: "",
          username: "",
          manager: false,
          member: false,
        });
        setCartItems([]);
        toast.success("You are logout successfully.");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Menu
      inverted
      style={{
        height: "8vh",
        borderRadius: 0,
        border: "none",
        margin: 0,
        backgroundColor: "#204e59",
      }}
    >
      <Menu.Item name="Logo">
        <Image src={Logo} size="mini" />
      </Menu.Item>
      <Menu.Item name="home" onClick={() => navigate("/")}>
        <Icon name="home" />
        Home
      </Menu.Item>
      {!loggedIn ? (
        <Menu.Menu position="right">
          <Menu.Item
            name="login"
            active={location.pathname.includes("/login")}
            onClick={() => navigate("/login")}
          >
            <Icon name="sign-in" />
            Login
          </Menu.Item>
          <Menu.Item
            name="register"
            active={location.pathname.includes("/register")}
            onClick={() => navigate("/register")}
          >
            <Icon name="sign-out" />
            Register
          </Menu.Item>
        </Menu.Menu>
      ) : !user.manager ? (
        <Menu.Menu position="right">
          <Menu.Item name="welcome">Welcome {user.username} !</Menu.Item>
          <Menu.Item name="logout" onClick={handleLogout}>
            <Icon name="sign-out" />
            Logout
          </Menu.Item>
        </Menu.Menu>
      ) : (
        <>
          <Dropdown item text="Manage System">
            <Dropdown.Menu>
              <Dropdown.Item
                selected={location.pathname.includes("/add-item")}
                onClick={() => navigate("/add-item")}
              >
                Add Item
              </Dropdown.Item>
              <Dropdown.Item
                selected={location.pathname.includes("/add-promotion")}
                onClick={() => navigate("/add-promotion")}
              >
                Add Promotion
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Menu position="right">
            <Menu.Item name="welcome">Welcome Manager !</Menu.Item>
            <Menu.Item name="logout" onClick={handleLogout}>
              <Icon name="sign-out" />
              Logout
            </Menu.Item>
          </Menu.Menu>
        </>
      )}
    </Menu>
  );
};

export default Header;
