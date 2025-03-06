// middleware/urlAccessMiddleware.js - Middleware to validate URL access

const TaxiService = require('../model/taxiServices_Model');

/**
 * Middleware to ensure only URLs that exist in the database are accessible
 */
const urlAccessMiddleware = async (req, res, next) => {
  // Skip middleware for API routes
  if (req.path.startsWith('/api/')) {
    return next();
  }
  
  // Skip for home page
  if (req.path === '/') {
    return next();
  }
  
  try {
    // Check if the requested URL exists in the database
    const urlExists = await TaxiService.exists({ url: req.path });
    
    if (!urlExists) {
      return res.status(404).json({ 
        success: false, 
        message: 'The requested URL does not exist or you do not have access to it'
      });
    }
    
    // URL exists in the database, continue
    next();
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error while validating URL access'
    });
  }
};

module.exports = urlAccessMiddleware;