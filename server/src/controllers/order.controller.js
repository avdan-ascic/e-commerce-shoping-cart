import { format } from "date-fns";

import Order from "../models/order.model";
import Book from "../models/book.model";
import Promotion from "../models/promotion.model";
import { transporter } from "../utils/mail";

const create = (req, res, next) => {
  const order = new Order(req.body);

  order
    .save()
    .then(async (order) => {
      let books = [];
      let total = parseFloat(0);
      for (const id of order.books) {
        let tempBook = await Book.findById(id).select("-image");

        tempBook.stock -= 1;
        if (tempBook.stock <= tempBook.reorderThreshold) {
          if (!tempBook.stopOrder) {
            tempBook.stock = 50;
            await transporter.sendMail({
              from: "Book Store Info <book.store.info.bbb@gmail.com>",
              to: "book.store.manager.bbb@gmail.com",
              subject: `Reorder Info`,
              html: `
                <body>
                  <h2>${tempBook.title} Reorder</h2>
                  <div>
                    <strong>${tempBook.title}</strong> book has been restocked.
                  </div>
                </body>
              `,
            });
            await tempBook.save();
          } else {
            await tempBook.save();
          }
        } else {
          await tempBook.save();
        }
        total += parseFloat(tempBook.price);
        books.push(tempBook.title);
      }

      const promotion = await Promotion.findOne({ code: order.discountCode });
      if (promotion) total = total - total / (100 / promotion.discount);

      await transporter.sendMail({
        from: "Book Store Info <book.store.info.bbb@gmail.com>",
        to: req.user.email,
        subject: `Order - ${order._id.toString()}`,
        html: `
          <body>
            <h2>Order Confirmation:</h2>
            <div>
              Your order : <strong>${books.join(
                ", "
              )}</strong> was successfully completed on ${format(
          new Date(Date.now()),
          "PPpp"
        )}.
              <br/>
              Total cost was <strong>BAM ${parseFloat(total).toFixed(
                2
              )}</strong>.   <br/>
              Have a nice day !
            </div>
          </body>
        `,
      });

      return res.status(200).json({ message: "Order completed successfully." });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ error: err.message });
    });
};

const readAll = (req, res, next) => {
  Order.find({})
    .populate({ path: "books", select: "-image" })
    .then((orders) => res.status(200).json({ orders: orders }))
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ error: err.message });
    });
};

export default { create, readAll };
