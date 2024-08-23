const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const testRoutes = require('./routes/testRoutes'); // Import the test routes
const userRoutes = require('./routes/userRoutes'); 
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/test', testRoutes); // Test routes
app.use('/api/user', userRoutes); // User and payment routes
// Basic Route
app.get('/', (req, res) => {
    res.send('Welcome to the Student Aptitude Test API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
