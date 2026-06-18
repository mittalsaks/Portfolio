const express = require("express");
const { protect } = require("../middleware/auth");

// Builds an Express router with standard public GET + protected POST/PUT/DELETE routes.
const createCRUDRoutes = (controller) => {
  const router = express.Router();

  router.get("/", controller.getAll);
  router.get("/:id", controller.getOne);
  router.post("/", protect, controller.create);
  router.put("/:id", protect, controller.update);
  router.delete("/:id", protect, controller.remove);

  return router;
};

module.exports = createCRUDRoutes;
