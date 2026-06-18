const Project = require("../models/Project");
const createCRUDController = require("../controllers/crudControllerFactory");
const createCRUDRoutes = require("./crudRouteFactory");

const controller = createCRUDController(Project, { order: 1, featured: -1, createdAt: -1 });
const router = createCRUDRoutes(controller);

module.exports = router;
