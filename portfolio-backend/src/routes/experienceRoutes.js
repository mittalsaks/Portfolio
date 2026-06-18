const Experience = require("../models/Experience");
const createCRUDController = require("../controllers/crudControllerFactory");
const createCRUDRoutes = require("./crudRouteFactory");

const controller = createCRUDController(Experience, { order: 1, createdAt: -1 });
const router = createCRUDRoutes(controller);

module.exports = router;
