const Hackathon = require("../models/Hackathon");
const createCRUDController = require("../controllers/crudControllerFactory");
const createCRUDRoutes = require("./crudRouteFactory");

const controller = createCRUDController(Hackathon, { order: 1, createdAt: -1 });
const router = createCRUDRoutes(controller);

module.exports = router;
