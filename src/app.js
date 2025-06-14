const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Main API endpoint
app.get('/api/v1/hello', (req, res) => {
  res.json({ 
    message: 'Enterprise Demo API Response',
    version: '1.0.0',
    uptime: process.uptime()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`API Endpoints:
  - http://localhost:${PORT}/health
  - http://localhost:${PORT}/api/v1/hello`);
});

module.exports = app; // For testing
