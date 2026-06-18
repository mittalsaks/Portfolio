const Skill = require("../models/Skill");
const createCRUDController = require("../controllers/crudControllerFactory");
const createCRUDRoutes = require("./crudRouteFactory");

const controller = createCRUDController(Skill, { category: 1, order: 1 });
const router = createCRUDRoutes(controller);

module.exports = router;
