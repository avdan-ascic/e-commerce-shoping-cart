import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Card,
  CardContent,
  Form,
  Icon,
  Header,
  Button,
} from "semantic-ui-react";
import { create } from "../../api/promotion-api";

const AddPromotion = () => {
  const [values, setValues] = useState({
    code: "",
    discount: "",
    expirationDate: "",
    error: "",
  });
  const navigate = useNavigate();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const validateForm = () => {
    if (!values.code) {
      setValues({ ...values, error: "Please enter Code !" });
      return false;
    }

    if (!values.discount) {
      setValues({ ...values, error: "Please enter Discount !" });
      return false;
    }

    if (
      parseFloat(values.discount) < 0 ||
      !Number.isInteger(parseFloat(values.discount))
    ) {
      setValues({
        ...values,
        error: "Discount has to be a positive integer!",
      });
      return false;
    }

    if (!values.expirationDate) {
      setValues({ ...values, error: "Please choose Expiration Date !" });
      return false;
    }

    const currentDate = new Date();
    const expirationDate = new Date(values.expirationDate);
    if (expirationDate < currentDate) {
      setValues({
        ...values,
        error: "Expiration Date cannot be in the past !",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    create(values)
      .then((data) => {
        if (data.error) return setValues({ ...values, error: data.error });
        else {
          toast.success("Promotion added successfully.");
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
      <Card style={{ padding: "2em", width: 500 }}>
        <CardContent>
          <Header
            size="large"
            style={{ marginBottom: "2rem", color: "#204e59" }}
          >
            Add Promotion
          </Header>
          <Form >
            <Form.Field>
              <label>Code</label>
              <input
                placeholder="Code"
                value={values.code}
                onChange={handleChange("code")}
              />
            </Form.Field>
            <Form.Field>
              <label>Discount</label>
              <input
                placeholder="Discount"
                value={values.discount}
                onChange={handleChange("discount")}
                type="number"
                min={0}
                step={1}
              />
            </Form.Field>
            <Form.Field>
              <label>Expiration Date</label>
              <input
                placeholder="Expiration Date"
                type="date"
                value={values.expirationDate}
                onChange={handleChange("expirationDate")}
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
                marginTop: "4em",
              }}
            >
              <Button
                secondary
                onClick={handleSubmit}
                style={{ backgroundColor: "#204e59" }}
              >
                Add
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddPromotion;
