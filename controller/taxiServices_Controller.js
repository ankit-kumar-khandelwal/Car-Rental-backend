const TaxiService = require('../model/taxiServices_Model');

// @desc    Get all taxi services
// @route   GET /api/taxi-services
// @access  Public
exports.getTaxiServices = async (req, res) => {
  try {
    const taxiServices = await TaxiService.find();
    res.json(taxiServices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single taxi service by ID
// @route   GET /api/taxi-services/:id
// @access  Public
exports.getTaxiServiceById = async (req, res) => {
  try {
    const taxiService = await TaxiService.findOne({ id: req.params.id });
    
    if (!taxiService) {
      return res.status(404).json({ message: 'Taxi service not found' });
    }
    
    res.json(taxiService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get taxi service by URL path
// @route   GET /api/taxi-services/url/:urlPath
// @access  Public
exports.getTaxiServiceByUrl = async (req, res) => {
  try {
    // Get the URL path from the request
    const urlPath = '/' + req.params.urlPath.replace(/^\//, '');
    
    // Find the taxi service with the matching URL
    const taxiService = await TaxiService.findOne({ url: urlPath });
    
    if (!taxiService) {
      return res.status(404).json({ message: 'No taxi service found with this URL' });
    }
    
    res.json(taxiService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new taxi service
// @route   POST /api/taxi-services
// @access  Public (could be protected in a real app)
exports.createTaxiService = async (req, res) => {
  try {
    const taxiService = new TaxiService(req.body);
    const savedTaxiService = await taxiService.save();
    res.status(201).json(savedTaxiService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a taxi service
// @route   PUT /api/taxi-services/:id
// @access  Public (could be protected in a real app)
exports.updateTaxiService = async (req, res) => {
  try {
    const taxiService = await TaxiService.findOne({ id: req.params.id });
    
    if (!taxiService) {
      return res.status(404).json({ message: 'Taxi service not found' });
    }
    
    Object.assign(taxiService, req.body);
    const updatedTaxiService = await taxiService.save();
    
    res.json(updatedTaxiService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a taxi service
// @route   DELETE /api/taxi-services/:id
// @access  Public (could be protected in a real app)
exports.deleteTaxiService = async (req, res) => {
    try {
      const taxiService = await TaxiService.findOne({ id: req.params.id });
      
      if (!taxiService) {
        return res.status(404).json({ message: 'Taxi service not found' });
      }
      
      await TaxiService.deleteOne({ id: req.params.id });
      
      res.json({ message: 'Taxi service removed' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };