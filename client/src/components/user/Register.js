import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Form,
  Icon,
  Header,
  Checkbox,
  Card,
  Container,
  CardContent,
} from "semantic-ui-react";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { create } from "../../api/user-api";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    rePassword: "",
    street: "",
    city: "",
    zipCode: "",
    country: "",
    error: "",
  });

  const [memberCheck, setMemberCheck] = useState(false);
  const navigate = useNavigate();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const validateForm = () => {
    if (!values.username) {
      setValues({ ...values, error: "Please enter Username !" });
      return false;
    }
    if (!values.name) {
      setValues({ ...values, error: "Please enter Name !" });
      return false;
    }

    if (!values.email) {
      setValues({ ...values, error: "Please enter Email !" });
      return false;
    }

    if (!values.password) {
      setValues({ ...values, error: "Please enter Password !" });
      return false;
    }

    if (!values.rePassword) {
      setValues({ ...values, error: "Please Re-Type Password !" });
      return false;
    }

    if (values.password !== values.rePassword) {
      setValues({ ...values, error: "Passwords do not match !" });
      return false;
    }

    if (!values.street) {
      setValues({ ...values, error: "Please enter Street !" });
      return false;
    }

    if (!values.city) {
      setValues({ ...values, error: "Please enter City !" });
      return false;
    }

    if (!values.zipCode) {
      setValues({ ...values, error: "Please enter ZIP Code !" });
      return false;
    }

    if (!values.country) {
      setValues({ ...values, error: "Please enter Country !" });
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const user = {
      username: values.username,
      name: values.name,
      email: values.email,
      password: values.password,
      member: memberCheck,
      address: {
        street: values.street,
        city: values.city,
        zipCode: values.zipCode,
        country: values.country,
      },
    };

    create(user)
      .then((data) => {
        if (data.error) return setValues({ ...values, error: data.error });
        else {
          toast.success("Account registered successfully.");
          setValues({ ...values, error: "" });
          navigate("/login");
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
      <Card style={{ padding: "2em", width: 500 }}>
        <CardContent>
          <Header
            size="large"
            style={{ marginBottom: "2rem", color: "#204e59" }}
          >
            Registration for a Book-E-Commerce
          </Header>
          <Form style={{ marginBottom: "5rem" }}>
            <Form.Field>
              <label>Username</label>
              <input
                placeholder="Username"
                value={values.username}
                onChange={handleChange("username")}
              />
            </Form.Field>
            <Form.Field>
              <label>Name</label>
              <input
                placeholder="Name"
                value={values.name}
                onChange={handleChange("name")}
              />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input
                placeholder="Email"
                value={values.email}
                onChange={handleChange("email")}
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
            <Form.Field>
              <label>Re-Type Password</label>
              <input
                placeholder="Re-Type Password"
                type="password"
                value={values.rePassword}
                onChange={handleChange("rePassword")}
              />
            </Form.Field>
            <Form.Field>
              <label>Street</label>
              <input
                placeholder="Street"
                value={values.street}
                onChange={handleChange("street")}
              />
            </Form.Field>
            <Form.Field>
              <label>City</label>
              <input
                placeholder="City"
                value={values.city}
                onChange={handleChange("city")}
              />
            </Form.Field>
            <Form.Field>
              <label>ZIP Code</label>
              <input
                placeholder="ZIP Code"
                value={values.zipCode}
                onChange={handleChange("zipCode")}
              />
            </Form.Field>
            <Form.Field>
              <label>Country</label>
              <input
                placeholder="Country"
                value={values.country}
                onChange={handleChange("country")}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                label="I would like to become member to receive additional discounts."
                checked={memberCheck}
                onClick={() => setMemberCheck(!memberCheck)}
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

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                secondary
                onClick={handleSubmit}
                style={{ backgroundColor: "#204e59" }}
              >
                Register
              </Button>
            </div>

            <div
              style={{
                marginTop: "1rem",
                textAlign: "center",
              }}
            >
              Already have an account? <Link to="/login">Login</Link> instead.
            </div>
          </Form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Register;
