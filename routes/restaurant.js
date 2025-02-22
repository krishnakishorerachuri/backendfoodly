const router = require('express').Router();

const restaurantController = require('../controllers/restaurantController');

router.post("/", restaurantController.addRestaurent);

router.get("/:code", restaurantController.getRandomeRestaurents);

router.get("/all/:code", restaurantController.getAllNearByRestaurents);


router.get("/byId/:id", restaurantController.getRestaurentById);


module.exports = router;



