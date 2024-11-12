// index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

dotenv.config();
app.use(cors());

// Mock database of tokens and corresponding users
const usersDB = {
    "demotoken": { firstName: "Aqarat", lastName: "User" }, // Example access token
    // You can add more tokens and corresponding names here
};

// Middleware to check for access token in query parameters
const authenticate = (req, res, next) => {
    const token = req.query.token; // Access token from query parameters
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const user = usersDB[token];
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user; // Attach the user to the request object
    next();
};

// Define the endpoint that returns user info if token is valid
app.get('/user', authenticate, (req, res) => {
    const { firstName, lastName } = req.user;
    res.json({ firstName, lastName });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
