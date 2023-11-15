const Router = require("express");
const {placeOrder, succesfulPurchase} = require('../controllers/mercadoController');

const mercadoRouter = Router();

mercadoRouter.post("/order", placeOrder);

mercadoRouter.get("/succes", succesfulPurchase);

module.exports = mercadoRouter;