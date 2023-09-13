import { Button, Header, Icon } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PopupCart = ({ cartItems, allItems }) => {
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let tempTotal = 0;
    for (const item of cartItems) {
      tempTotal +=
        allItems[allItems.findIndex((book) => book._id === item)].price;
    }
    setTotal(tempTotal);
    // eslint-disable-next-line
  }, [cartItems]);

  return (
    <div
      style={{
        width: 250,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "2rem",
        border: "1px solid #000",
        borderRadius: "3px",
        padding: "1rem",
        marginTop: "1rem",
        marginBottom: "1rem",
      }}
    >
      <Header size="medium">
        <Icon name="shopping cart" />
        <Header.Content>Cart</Header.Content>
      </Header>
      <div style={{ fontSize: "1.15rem" }}>
        <div>
          <strong>Items: </strong>
          {cartItems.length}
        </div>
        <div>
          <strong>Total: </strong>BAM {parseFloat(total).toFixed(2)}
        </div>
      </div>
      <Button
        secondary
        onClick={() => navigate("/cart")}
        style={{ backgroundColor: "#204e59" }}
      >
        View Cart
      </Button>
    </div>
  );
};

export default PopupCart;
