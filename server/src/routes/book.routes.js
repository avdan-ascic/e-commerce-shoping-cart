import express from "express";
import passport from "passport";
import multer from "multer";

import bookCtrl from "../controllers/book.controller";

const managerMiddleware = (req, res, next) => {
  passport.authenticate("jwt", (err, user) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!user) return res.status(200).json({ message: "Unauthorized!" });
    if (!user.manager)
      return res.status(200).json({ message: "Unauthorized!" });
    req.user = user;
    return next();
  })(req, res, next);
};

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router
  .route("/api/books/create")
  .post(managerMiddleware, upload.single("image"), bookCtrl.create);
router.route("/api/books/read-all").get(bookCtrl.readAll);
router
  .route("/api/books/:id")
  .get(bookCtrl.readById)
  .put(managerMiddleware, upload.single("image"), bookCtrl.update)
  .delete(managerMiddleware, bookCtrl.remove);
router.route("/api/books/read-by-title/:title").get(bookCtrl.readByTitle);

export default router;
