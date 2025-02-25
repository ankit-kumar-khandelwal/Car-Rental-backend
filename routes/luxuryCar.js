const express = require('express');
const router = express.Router();
const { 
  getLuxuryCars, 
  getLuxuryCarById, 
  getLuxuryCarByUrl,
  createLuxuryCar, 
  updateLuxuryCar, 
  deleteLuxuryCar 
} = require('../controller/luxuryCar_Controller');

router.route('/')
  .get(getLuxuryCars)
  .post(createLuxuryCar);

router.route('/:urlPath(*)')
  .get(getLuxuryCarByUrl);

router.route('/:id')
  .get(getLuxuryCarById)
  .put(updateLuxuryCar)
  .delete(deleteLuxuryCar);

module.exports = router;