import { Container, Search, Header, Button, Grid } from "semantic-ui-react";
import { useState, useEffect } from "react";
import {toast} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import BookCard from "../book-shop/BookCard";
import PopupCart from "../book-shop/PopupCart";

const Home = ({ cartItems, setCartItems, allItems}) => {
  const [books, setBooks] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedBooks, setSelectedBooks] = useState([]);

  useEffect(() => {
    setBooks(allItems);
  }, [allItems]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);

    if (event.target.value === "") {
      setBooks(allItems);
    } else {
      setBooks(
        allItems.filter((book) => {
          return book.title
            .toLowerCase()
            .includes(event.target.value.toLowerCase());
        })
      );
    }
  };

  const handleAddSelected = () => {
    setCartItems([...cartItems, ...selectedBooks]);
    setSelectedBooks([]);
    toast.success("Books added to cart successfully.");
  };

  return (
    <Container style={{ maxWidth: "100%", paddingBottom: "4rem" }}>
      <Search
        placeholder="Book title..."
        onSearchChange={handleSearchChange}
        value={searchValue}
        showNoResults={false}
        style={{ marginTop: "2rem" }}
      />
      <Header
        size="large"
        style={{
          width: "100%",
          textAlign: "center",
          marginTop: "3rem",
          color: "#204e59",
          marginBottom:"4rem"
        }}
      >
        Book Store
      </Header>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {selectedBooks.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "2rem",
              alignItems: "center",
              marginTop: "2rem",
              marginBottom: "1rem",
            }}
          >
            <p style={{ margin: 0 }}>
              <strong>
                {selectedBooks.length}{" "}
                {selectedBooks.length === 1 ? "Book" : "Books"} selected
              </strong>
            </p>
            <Button
              secondary
              onClick={handleAddSelected}
              style={{ backgroundColor: "#204e59" }}
            >
              Add to Cart
            </Button>
          </div>
        )}
      </div>
      <Grid>
        <Grid.Column computer={12}>
          {books.map((book, index) => {
            return (
              <BookCard
                key={index}
                book={book}
                selectedBooks={selectedBooks}
                setSelectedBooks={setSelectedBooks}
                cartItems={cartItems}
                setCartItems={setCartItems}
              
              />
            );
          })}
        </Grid.Column>
        <Grid.Column computer={4}>
          {cartItems.length > 0 && (
            <PopupCart cartItems={cartItems} allItems={allItems} />
          )}
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Home;
