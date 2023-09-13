import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Button,
  Form,
  Icon,
  Header,
  Checkbox,
  Card,
  CardContent,
} from "semantic-ui-react";
import { create, readAll } from "../../api/book-api";

const AddItem = ({ setAllItems }) => {
  const [values, setValues] = useState({
    title: "",
    author: "",
    price: "",
    reorderThreshold: "",
    stock: "",
    error: "",
  });
  const [stopOrderCheck, setStopOrderCheck] = useState(false);
  const [bookImage, setBookImage] = useState();
  const navigate = useNavigate();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleImageChange = (event) => {
    setBookImage(event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!values.title) {
      setValues({ ...values, error: "Please enter Title !" });
      return false;
    }

    if (!values.author) {
      setValues({ ...values, error: "Please enter Author !" });
      return false;
    }

    if (!values.price) {
      setValues({ ...values, error: "Please enter Price !" });
      return false;
    }

    if (parseFloat(values.price) < 0) {
      setValues({
        ...values,
        error: "Price has to be a positive number!",
      });
      return false;
    }

    if (
      parseFloat(values.reorderThreshold) < 0 ||
      !Number.isInteger(parseFloat(values.reorderThreshold))
    ) {
      setValues({
        ...values,
        error: "Reorder Threshold has to be a positive integer!",
      });
      return false;
    }

    if (
      parseFloat(values.stock) < 0 ||
      !Number.isInteger(parseFloat(values.stock))
    ) {
      setValues({
        ...values,
        error: "Stock has to be a positive integer!",
      });
      return false;
    }

    if (!bookImage) {
      setValues({ ...values, error: "Please enter Image !" });
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    values.stopOrder = stopOrderCheck;

    const formData = new FormData();
    formData.append("image", bookImage);
    formData.append("book", JSON.stringify(values));

    create(formData)
      .then((data) => {
        if (data.error) return setValues({ ...values, error: data.error });
        else {
          toast.success("Book added successfully.");
          setValues({ ...values, error: "" });
          readAll()
            .then((data) => {
              setAllItems(data.books);
            })
            .catch((err) => console.log(err));
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
      <Card style={{ padding: "2em", width: 500, marginBottom:"2em" }}>
        <CardContent>
          <Header
            size="large"
            style={{ marginBottom: "2rem", color: "#204e59" }}
          >
            Add Item to Book Store
          </Header>
          <Form >
            <Form.Field>
              <label>Image</label>
              <input
                placeholder="Image"
                type="file"
                onChange={handleImageChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Title</label>
              <input
                placeholder="Title"
                value={values.title}
                onChange={handleChange("title")}
              />
            </Form.Field>
            <Form.Field>
              <label>Author</label>
              <input
                placeholder="Author"
                value={values.author}
                onChange={handleChange("author")}
              />
            </Form.Field>
            <Form.Field>
              <label>Price</label>
              <input
                placeholder="Price"
                value={values.price}
                onChange={handleChange("price")}
                type="number"
                min={0}
                step={0.01}
              />
            </Form.Field>
            <Form.Field>
              <label>Reorder Threshold</label>
              <input
                placeholder="Reorder Threshold"
                value={values.reorderThreshold}
                onChange={handleChange("reorderThreshold")}
                type="number"
                min={0}
                step={1}
              />
            </Form.Field>
            <Form.Field>
              <label>Stock</label>
              <input
                placeholder="Stock"
                value={values.stock}
                onChange={handleChange("stock")}
                type="number"
                min={0}
                step={1}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                label="Stop Order"
                checked={stopOrderCheck}
                onClick={() => setStopOrderCheck(!stopOrderCheck)}
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
                Add 
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddItem;
