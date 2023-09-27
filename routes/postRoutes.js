const express = require("express");
const { requireSign } = require("../controller/routesController");
const {
  createPostController,
  getPostController,
  userPostController,
  deletePostController,
} = require("../controller/postController");
const router = express.Router();

router.post("/create-post", requireSign, createPostController);
router.get("/get-post", getPostController);
router.get("/get-user-post", requireSign, userPostController);
router.delete("/delete-post", requireSign, deletePostController);
module.exports = router;
