import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Form,
  Icon,
  Header,
  Container,
  Card,
  CardContent,
} from "semantic-ui-react";

import { UserContext } from "../../App";
import { login, isAuthenticated } from "../../api/user-api";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    error: "",
  });
  const { setLoggedIn, setUser } = useContext(UserContext);
  const navigate = useNavigate();

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
        navigate("/");
      }
    });
    // eslint-disable-next-line
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  
  const handleSubmit = (e) => {
    if (!values.username) {
      setValues({ ...values, error: "Please enter Username !" });
      return;
    }

    if (!values.password) {
      setValues({ ...values, error: "Please enter Password !" });
      return;
    }

    login(values)
      .then((data) => {
        if (data.error) return setValues({ ...values, error: data.error });
        else {
          setLoggedIn(true);
          setUser({
            id: data.user._id,
            username: data.user.username,
            manager: data.user.manager,
            member: data.user.member,
          });
          setValues({ ...values, error: "" });
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container
      style={{
        marginTop: "3rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card style={{ padding: "2em", width: 400 }}>
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Header
            size="large"
            style={{ marginBottom: "2rem", color: "#204e59" }}
          >
            Login
          </Header>
          <Form>
            <Form.Field>
              <label>Username</label>
              <input
                placeholder="Username"
                value={values.username}
                onChange={handleChange("username")}
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                placeholder="Password"
                type="password"
                value={values.password}
                onChange={handleChange("password")}
              />
            </Form.Field>

            {values.error && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "1rem",
                }}
              >
                <Icon name="exclamation" color="red" />{" "}
                <p style={{ color: "red" }}>{values.error}</p>
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2em",
              }}
            >
              <Button
                secondary
                onClick={handleSubmit}
                style={{ backgroundColor: "#204e59" }}
              >
                Login
              </Button>
            </div>

            <div
              style={{
                marginTop: "1rem",
                textAlign: "center",
              }}
            >
              Don't have an account? <Link to="/register">Register</Link> here.
            </div>
          </Form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
