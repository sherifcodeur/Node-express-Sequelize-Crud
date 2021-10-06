
    // importing dependencies
    const express = require('express');
    const dotenv = require('dotenv').config();

    // db with sequelize 
    const db = require('./models');
    
    
    //importing routes - example company routes -
    //const companyRoutes = require('./routes/companyRoutes');
    
    // PORT defined in the env file
    const PORT = process.env.PORT || 3000;
    
    
    // initializing express application
    const app = express();
    
    
    
    
    
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
    db.sequelize.sync().then(()=>{

        app.listen(PORT, () => {
          console.log("Server listening ")
        })

    })

    