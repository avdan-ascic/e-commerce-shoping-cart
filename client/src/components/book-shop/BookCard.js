import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { Button, Checkbox, Image } from "semantic-ui-react";
import { binaryToBase64 } from "../../helpers/image-format-converter";
import { UserContext } from "../../App";

const BookCard = ({
  book,
  selectedBooks,
  setSelectedBooks,
  cartItems,
  setCartItems,

}) => {
  const [checked, setChecked] = useState(false);
  const [disabledActions, setDisabledActions] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext)
  
  const handleSelection = () => {
    if (disabledActions) return;
    setChecked(!checked);
    if (!checked) {
      if (book.stock > 0) {
        setSelectedBooks([...selectedBooks, book._id]);
      } else {
        toast.error("Book is currently not in stock.");
        setChecked(false);
      }
    } else {
      setSelectedBooks(selectedBooks.filter((id) => id !== book._id));
    }
  };

  const handleAddToCart = () => {
    if (book.stock > 0) {
      setCartItems([...cartItems, book._id]);
    } else {
      toast.error("Book is currently not in stock.");
    }
  };

  useEffect(() => {
    if (selectedBooks.includes(book._id)) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [selectedBooks, book]);

  useEffect(() => {
    if (cartItems.includes(book._id)) {
      setDisabledActions(true);
      setChecked(false);
      setSelectedBooks(selectedBooks.filter((id) => id !== book._id));
    } else {
      setDisabledActions(false);
    }
    // eslint-disable-next-line
  }, [cartItems, book]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginTop: "1rem",
        marginBottom: "1rem",
        padding: ".5rem",
        border: "1px solid #000",
        borderRadius: "3px",
        width: "fit-content",
      }}
    >
      {!user.manager && (
        <Checkbox
          onClick={handleSelection}
          disabled={disabledActions}
          checked={checked}
        />
      )}
      <Image
        size="small"
        src={`data:${book.image.contentType};base64,${binaryToBase64(
          book.image.data.data
        )}`}
      />
      <div style={{ width: 250 }}>
        <p>
          <strong>Title: </strong>
          {book.title}
        </p>
        <p>
          <strong>Author: </strong>
          {book.author}
        </p>
        <p>
          <strong>Price: </strong>
          {book.price}
        </p>
      </div>
      {!user.manager ? (
        <Button
          secondary
          disabled={disabledActions}
          style={{ backgroundColor: "#204e59" }}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      ) : (
        <Button
          secondary
          style={{ backgroundColor: "#204e59" }}
          onClick={() => navigate(`/edit-item/${book._id}`)}
        >
          Edit Item
        </Button>
      )}
    </div>
  );
};

export default BookCard;
