const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public')); // Serve static files from 'public' directory
app.set('view engine', 'ejs');

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://panchnan16:6rhNwNY9ZvIjRscz@komotaadmitdb.nmti9vj.mongodb.net/?retryWrites=true&w=majority&appName=komotaAdmitDb');
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

// Connect to MongoDB
connectDB();

app.use('/', require('./router/applicationRoute'));







// // Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});



const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
