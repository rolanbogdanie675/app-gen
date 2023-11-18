/*
   Filename: ComplexProgram.js
   Description: A complex program showcasing advanced JavaScript functionalities
   Created By: Assistant
   Last Updated: September 2021
*/

// Importing required libraries
const fs = require('fs');
const express = require('express');
const { promisify } = require('util');

// Promisifying fs.readFile to read file asynchronously
const readFileAsync = promisify(fs.readFile);

// Creating an Express application
const app = express();

// Setting up middleware for parsing JSON bodies
app.use(express.json());

// Custom error handling middleware
app.use((error, req, res, next) => {
   console.error(error); // Log the error for debugging purposes
   res.status(500).json({ error: 'Internal server error' });
});

// Defining a route for handling GET requests
app.get('/data/:filename', async (req, res, next) => {
   const { filename } = req.params;

   try {
      // Read the file asynchronously
      const data = await readFileAsync(filename, 'utf8');
      res.json({ data });
   } catch (error) {
      // Handle file not found or other errors
      if (error.code === 'ENOENT') {
         res.status(404).json({ error: 'File not found' });
      } else {
         next(error);
      }
   }
});

// Defining a route for handling POST requests
app.post('/data/:filename', async (req, res, next) => {
   const { filename } = req.params;
   const { data } = req.body;

   try {
      // Write the data to the file asynchronously
      await writeFileAsync(filename, data, 'utf8');
      res.json({ message: 'Data written successfully' });
   } catch (error) {
      next(error);
   }
});

// Starting the server
app.listen(3000, () => {
   console.log('Server started on port 3000');
});

// Other helper functions, classes, and business logic can be added below...
... (continuation of the code) ...