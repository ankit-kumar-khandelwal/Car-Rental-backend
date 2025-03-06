const express = require('express');
const router = express.Router();
const { 
  getTaxiServices, 
  getTaxiServiceById, 
  getTaxiServiceByUrl,
  createTaxiService, 
  updateTaxiService, 
  deleteTaxiService 
} = require('../controller/taxiServices_Controller');

router.route('/')
  .get(getTaxiServices)
  .post(createTaxiService);

router.route('/:urlPath(*)')
  .get(getTaxiServiceByUrl);

router.route('/:id')
  .get(getTaxiServiceById)
  .put(updateTaxiService)
  .delete(deleteTaxiService);

module.exports = router;
