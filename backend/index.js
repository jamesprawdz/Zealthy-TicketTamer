if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
  
  const express = require('express');
  const bodyParser = require('body-parser');
  const cors = require('cors');
  const path = require('path');
  const favicon = require('serve-favicon');
  const sequelize = require('./config/databaseConfig');
  const ticketRoutes = require('./routes/ticketRoutes');
  const authRoutes = require('./routes/authRoutes');
  const adminRoutes = require('./routes/adminRoutes');
  const logDetails = require('./utils/logUtil');
  
  const app = express();
  const PORT = process.env.PORT || 3000;
  
  // Set favicon
  app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
  
  // Configure CORS
  app.use(
    cors({
      origin: [process.env.FRONTEND_URL, 'http://localhost:3000'],
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      credentials: true,
      optionsSuccessStatus: 200,
    })
  );
  
  // Handle pre-flight requests for all routes
  app.options('*', cors());
  
  // Middleware for parsing JSON bodies
  app.use(bodyParser.json());
  
  // Log incoming requests
  app.use((req, res, next) => {
    logDetails('Received request', { method: req.method, path: req.path });
    next();
  });
  
  // Routes
  app.use('/api/tickets', ticketRoutes); // Public ticket route
  app.use('/api/auth', authRoutes); // Authentication routes
  app.use('/api/admin', adminRoutes); // Protected admin routes
  
  // Root route
  app.get('/', (req, res) => {
    res.send('Welcome to the Zealthy TickerTamer API. Navigate using the available routes.');
  });
  
  // Connect to the database and start the server
  sequelize
    .authenticate()
    .then(() => {
      logDetails('Successfully connected to the database.');
      return sequelize.sync();
    })
    .then(() => {
      app.listen(PORT, () => {
        logDetails('Server is up and running', { port: PORT });
      });
    })
    .catch((error) => {
      logDetails('Database connection failed', { error });
    });
  
  // Middleware for error handling
  app.use((err, req, res, next) => {
    logDetails('Error occurred', { error: err });
    res.status(500).send('Something went wrong. Please try again later.');
  });
  
  // Middleware for handling 404 errors
  app.use((req, res) => {
    res.status(404).send('404: Page not found');
  });
  
  module.exports = app;
  