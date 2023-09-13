import express from "express";
import passport from "passport";

import userCtrl from "../controllers/user.controller";

const authMiddleware = (req, res, next) => {
  passport.authenticate("jwt", (err, user) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!user) return res.status(200).json({ message: "Unauthorized!" });
    req.user = user;
    return next();
  })(req, res, next);
};

const router = express.Router();

router.route("/api/users/create").post(userCtrl.create);
router.route("/api/users/login").post(userCtrl.login);
router
  .route("/api/users/is-authenticated")
  .get(authMiddleware, userCtrl.isAuthenticated);
router.route("/api/users/logout").get(authMiddleware, userCtrl.logout);

export default router;
