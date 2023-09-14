import {
  Table,
  Button,
  Header,
  Container,
  Input,
  Modal,
  Icon,
  Card,
  CardContent,
} from "semantic-ui-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../App";
import { create } from "../../api/order-api";
import { getPromotion } from "../../api/promotion-api";

const Cart = ({ cartItems, allItems, setCartItems }) => {
  const { loggedIn, user } = useContext(UserContext);
  const [total, setTotal] = useState(0);
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [couponValue, setCouponValue] = useState("");
  const [creditCard, setCreditCard] = useState({ value: "", error: "" });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const navigate = useNavigate();

  const handleCouponChange = (event) => {
    setCouponValue(event.target.value);
  };
  const handleAddCoupon = () => {
    if (!couponValue) {
      return toast.error("Please enter coupon !");
    }
    getPromotion(couponValue)
      .then((data) => {
        if (data?.response?.data?.error) {
          return toast.error("Coupon code do not exist!");
        }
        if (data?.response?.data?.message === "Promotion date expired!") {
          return toast.error("Unfortunately, coupon has expired!");
        }
        if (data.discount) {
          toast.success("Coupon applied successfully.");
          setDiscount(data.discount);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let tempTotal = 0;
    for (const item of cartItems) {
      tempTotal +=
        allItems[allItems.findIndex((book) => book._id === item)].price;
    }
    setTotal(tempTotal);
    if (discount > 0)
      setDiscountedTotal(tempTotal - tempTotal / (100 / discount));

    // eslint-disable-next-line
  }, [cartItems, discount]);

  const handleRemoveFromCart = (id) => {
    setCartItems(cartItems.filter((book) => book !== id));
  };

  useEffect(() => {
    let tempTotal = 0;
    for (const item of cartItems) {
      tempTotal +=
        allItems[allItems.findIndex((book) => book._id === item)].price;
    }
    setTotal(tempTotal);
    if (discount > 0)
      setDiscountedTotal(tempTotal - tempTotal / (100 / discount));

    setIsCartEmpty(cartItems.length === 0);
    // eslint-disable-next-line
  }, [cartItems, discount]);

  const handleSubmitOrder = () => {
    if (creditCard.value.length !== 16) {
      setCreditCard({
        ...creditCard,
        error: "Credit card must have 16 digits!",
      });
      return;
    }
    setCreditCard({ ...creditCard, error: "" });

    const order = {
      customerUsername: user.username,
      books: cartItems,
    };
    if (discount > 0) order.discountCode = couponValue;

    create(order)
      .then((data) => {
        toast.success("New order stored successfully.");
        setOpen(false);
        setCartItems([]);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container
        style={{
          marginTop: "3rem",
          maxWidth: 1200,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {!loggedIn ? (
          <div
            style={{
              textAlign: "center",
              marginTop: "3rem",
              fontSize: "1.2rem",
            }}
          >
            Please <Link to="/login">login</Link> in order to continue shopping.
          </div>
        ) : (
          <>
            <Header
              size="large"
              textAlign="center"
              style={{ marginTop: "2rem" }}
            >
              <Icon name="shopping cart" />
              Cart
            </Header>
            <Card style={{ padding: "3em", width: 500 }}>
              <CardContent>
                {cartItems.length > 0 && (
                  <div style={{ overflowX: "auto", marginTop: "4rem" }}>
                    <Table
                      celled
                      unstackable
                      selectable
                      style={{ marginBottom: "5rem" }}
                    >
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Remove</Table.HeaderCell>
                          <Table.HeaderCell>Book</Table.HeaderCell>
                          <Table.HeaderCell>Price</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {cartItems.map((id, index) => {
                          return (
                            <Table.Row key={index}>
                              <Table.Cell>
                                <Button
                                  color="red"
                                  onClick={() => handleRemoveFromCart(id)}
                                >
                                  Remove
                                </Button>
                              </Table.Cell>
                              <Table.Cell>
                                {
                                  allItems[
                                    allItems.findIndex(
                                      (book) => book._id === id
                                    )
                                  ].title
                                }
                              </Table.Cell>
                              <Table.Cell>
                                BAM
                                {parseFloat(
                                  allItems[
                                    allItems.findIndex(
                                      (book) => book._id === id
                                    )
                                  ].price
                                ).toFixed(2)}
                              </Table.Cell>
                            </Table.Row>
                          );
                        })}
                      </Table.Body>
                    </Table>
                  </div>
                )}
                {user.member && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "2rem",
                    }}
                  >
                    <Button
                      secondary
                      onClick={handleAddCoupon}
                      style={{ backgroundColor: "#204e59" }}
                      disabled={discount > 0}
                    >
                      Add Coupon
                    </Button>

                    <Input
                      placeholder="Coupon Code"
                      value={couponValue}
                      onChange={handleCouponChange}
                      disabled={discount > 0}
                    />
                  </div>
                )}
                <div
                  style={{
                    marginTop: "2rem",
                    textAlign: "center",
                    fontSize: "1.2rem",
                  }}
                >
                  <Button
                    style={{
                      marginTop: "1rem",
                      backgroundColor: "#204e59",
                      marginRight: "3em",
                    }}
                    secondary
                    onClick={() => {
                      if (isCartEmpty) {
                        setError("Your cart is empty !");
                        setTimeout(() => {
                          setError("");
                        }, 3000);
                      } else {
                        setOpen(true);
                      }
                    }}
                  >
                    Checkout
                  </Button>
                  <strong>Total: </strong>BAM
                  {discount > 0
                    ? parseFloat(discountedTotal).toFixed(2)
                    : parseFloat(total).toFixed(2)}
                  <br />
                  {discount > 0 && (
                    <span style={{ fontSize: "1.1rem", marginTop: "2em" }}>
                      (Discounted from BAM {parseFloat(total).toFixed(2)})
                    </span>
                  )}
                </div>
                {error && (
                  <p
                    style={{
                      color: "red",
                      marginTop: "3em",
                      marginLeft: "8em",
                    }}
                  >
                    {error}
                  </p>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </Container>

      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header>Billing Information</Modal.Header>
        <Modal.Content>
          <p>Credit card number:</p>
          <Input
            value={creditCard.value}
            onChange={(e) => setCreditCard({ value: e.target.value })}
            type="number"
          />
          {creditCard.error && (
            <p style={{ color: "red" }}>{creditCard.error}</p>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button
            secondary
            onClick={() => setOpen(false)}
            style={{ backgroundColor: "red" }}
          >
            Cancel
          </Button>
          <Button
            primary
            onClick={handleSubmitOrder}
            style={{ backgroundColor: "#204e59" }}
          >
            Submit Order
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default Cart;
