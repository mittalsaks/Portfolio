const ResearchPaper = require("../models/ResearchPaper");
const createCRUDController = require("../controllers/crudControllerFactory");
const createCRUDRoutes = require("./crudRouteFactory");

const controller = createCRUDController(ResearchPaper, { order: 1, year: -1 });
const router = createCRUDRoutes(controller);

module.exports = router;
