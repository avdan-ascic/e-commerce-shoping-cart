import mongoose from "mongoose";

import app from "./App";
import config from "./config";
import User from "./models/user.model";
import { seedData } from "./utils/Seed";
import Book from "./models/book.model";

app.listen(config.port, (err) => {
  if (err) return console.log(err);
  console.log(`Server started on port ${config.port}`);
});

mongoose
  .connect(config.mongo)
  .then(() => console.log("MongoDB connected successfully"))
  .then(async () => {
    const manager = await User.findOne({
      email: "book.store.manager.bbb@gmail.com",
    });
    let user;
    if (!manager) {
      user = new User({
        username: "manager",
        password: "manager123!",
        email: "book.store.manager.bbb@gmail.com",
        manager: true,
      });
      await user.save({ validateBeforeSave: false });
    }
  })
  .then(async () => {
    const books = await Book.find({});
    if (books.length === 0) seedData();
  })
  .catch((err) => console.log(err));
