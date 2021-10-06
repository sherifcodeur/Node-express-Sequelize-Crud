
    // importing dependencies
    const express = require('express');
    const dotenv = require('dotenv').config();
    const dbconnection = require('./database/connection');
    
    //importing routes - example company routes -
    //const companyRoutes = require('./routes/companyRoutes');
    
    // PORT defined in the env file
    const PORT = process.env.PORT || 3000;
    
    
    // initializing express application
    const app = express();
    
    // connect to the database
    dbconnection.dbconnect();
    
    
    
    // Request payload middleware
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    
    
    // Handle custom routes - add the custom routes
    // app.use('/api/v1/user', require('./routes/userRoutes'))
    //app.use('/api/companies',companyRoutes);
    
    
    // checks if server is working
    // app.get('/', (req, res, next) => {
    //   res.send('Hello from my Express server v2!')
    // })
    

    // app listens on the selected Port
    app.listen(PORT, () => {
      console.log("Server listening ")
    })
    