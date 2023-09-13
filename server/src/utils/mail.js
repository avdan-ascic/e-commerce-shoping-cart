import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  secureConnection: false,
  auth: {
    user: "book.store.info.bbb@gmail.com",
    pass: "afxrtclhuadbrekm",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export { transporter };

