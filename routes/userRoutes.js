const express = require("express");
const { registerController, loginController, updateUserController, requireSign } = require("../controller/routesController");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController)
router.put('/update-user', requireSign, updateUserController)

module.exports = router;
