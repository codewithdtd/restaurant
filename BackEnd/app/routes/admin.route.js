const express = require("express");

const user = require("../controllers/user.controller");
const AuthToken = require("../middleware/AuthToken")

const router = express.Router();


router.route("/")
    .get(AuthToken.verifyTokenAdmin, user.findAll)
    // .get(AuthToken.verifyToken, user.findAll)
    .delete(AuthToken.verifyTokenAdmin, user.deleteAll);
// SIGN UP/ LOGIN
router.route("/register").post(user.create)
router.route("/login").post(user.login)    

// REFRESH TOKEN
router.route("/refresh").post(user.refreshToken)    

// LOGOUT
router.route("/logout").post(AuthToken.verifyTokenAdmin, user.logout)

// Cart
router.route("/cart")
    .post(AuthToken.verifyTokenAdmin, user.addCart)
    .put(AuthToken.verifyTokenAdmin, user.updateCart)
    .get(AuthToken.verifyTokenAdmin, user.findAllCartUser)

router.route("/cart/:id")
    .delete(AuthToken.verifyTokenAdmin, user.deleteCart)



// Order
router.route("/order")
    .post(AuthToken.verifyTokenAdmin, user.addOrder)
    .put(AuthToken.verifyTokenAdmin, user.updateOrder)
    .get(AuthToken.verifyTokenAdmin, user.findAll)

router.route("/:id")
    .get(AuthToken.verifyTokenAdmin, user.findOne)
    .put(AuthToken.verifyTokenAdmin, user.update)
    .delete(AuthToken.verifyTokenAdmin, user.delete)
    // .delete(AuthToken.verifyTokenAdmin, user.delete);
module.exports = router;