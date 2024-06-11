// Import the express module
const express = require('express');

// Create an instance of an Express application
const app = express();

// Define the port on which the server will listen
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define a route handler for the root URL ('/')
app.get('/', (req, res) => {
  res.send('Test automation dummy');
});

// Function to generate weighted random status
function getRandomStatus() {
  const random = Math.random();
  if (random < 0.7) {
    return 1; // 70% chance
  } else if (random < 0.9) {
    return 2; // 20% chance
  } else {
    return 3; // 10% chance
  }
}

// Define a route handler for the '/bullet-test' URL using POST method
app.post('/bullet-test', (req, res) => {
  // Extract data from the request body
  const { date, testType, pressureInfo } = req.body;

  // Check if all required fields are present
  if (!date || !testType || !pressureInfo) {
    return res.status(400).json({
      error: 'Missing required fields: date, testType, and pressureInfo'
    });
  }

  // Validate date format (ISO 8601)
  const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
  if (!iso8601Regex.test(date)) {
    return res.status(400).json({
      error: 'Date must be in ISO 8601 format'
    });
  }

  // Convert testType and pressureInfo to integers
  const testTypeInt = parseInt(testType, 10);
  const pressureInfoInt = parseInt(pressureInfo, 10);

  // Check if testType is valid (only 1 is accepted)
  if (testTypeInt !== 1) {
    return res.status(400).json({
      error: 'Test condition has not been recognized. Please enter valid test id'
    });
  }

  // Generate random values for status, duration, and current
  const status = getRandomStatus(); // Weighted random status
  const duration = Math.floor(Math.random() * 6) + 5; // Random duration between 5 and 10
  const current = Math.floor(Math.random() * 2) + 4; // Random current between 4 and 5

  // Delay response by the generated duration
  setTimeout(() => {
    // Return the response as a JSON object after the delay
    res.json({
      status,
      duration,
      current
    });
  }, duration * 1000); // Convert duration to milliseconds
});

// Define a route handler for the '/analizor-status' URL using POST method
app.post('/analizor-status', (req, res) => {
  // Extract data from the request body
  const { date, action, msg } = req.body;

  // Check if all required fields are present
  if (!date || !action || !msg) {
    return res.status(400).json({
      error: 'Missing required fields: date, action, and msg'
    });
  }

  // Validate date format (ISO 8601)
  const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
  if (!iso8601Regex.test(date)) {
    return res.status(400).json({
      error: 'Date must be in ISO 8601 format'
    });
  }

  // Convert action to integer
  const actionInt = parseInt(action, 10);

  // Check if action is valid (1, 2, or 3)
  if (![1, 2, 3].includes(actionInt)) {
    return res.status(400).json({
      error: 'Action must be 1, 2, or 3'
    });
  }

  // Define status based on action
  let status;
  if (actionInt === 1) {
    status = 'reset atildi';
  } else if (actionInt === 2) {
    status = 'kapatildi';
  } else {
    status = 'analizor is calisiyor';
  }

  // Delay response by 3 seconds
  setTimeout(() => {
    // Return the response as a JSON object after the delay
    res.json({
      date,
      status
    });
  }, 3000); // 3 seconds delay
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
