import { transporter } from "../utils/mail";
import { format } from "date-fns";

import Promotion from "../models/promotion.model";
import User from "../models/user.model";

const create = (req, res, next) => {
  let promotion = new Promotion(req.body);

  promotion
    .save()
    .then(async (promotion) => {
      const members = await User.find({ member: true }).select("email");
      let emails = [];
      for (const member of members) {
        emails.push(member.email);
      }

      await transporter.sendMail({
        from: "Book Store Info <book.store.info.bbb@gmail.com>",
        to: emails,
        subject: "Promotion Code",
        html: `
          <body>
            <h2>Promotion Code</h2>
            <div>
              Dear Customers, </br>
              We would like to inform you that you can use code <strong>${
                promotion.code
              }</strong> for extra <strong>${
          promotion.discount
        }%</strong> discount until <strong>${format(
          new Date(promotion.expirationDate),
          "PPpp"
        )}</strong>.
            </div>
          </body>
        `,
      });

      return res
        .status(200)
        .json({ message: "Promotion created successfully." });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ error: err.message });
    });
};

const getPromotion = async (req, res, next) => {
  try {
    const code = req.params.code;

    const promotion = await Promotion.findOne({ code: code });
    if (!promotion)
      return res.status(400).json({ error: "Invalid promotion code!" });

    if (promotion.expirationDate < Date.now())
      return res.status(400).json({ message: "Promotion date expired!" });

    return res.status(200).json({ discount: promotion.discount });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

export default { create, getPromotion };
