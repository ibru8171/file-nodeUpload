
const express = require('express');
const connectDB = require('./DB/database');
const fileRoutes = require('./routes/fileRoutes');
const multer = require('multer')
const app = express();
const PORT = process.env.PORT || 2001;

// Connect to MongoDB
connectDB(
    () => { console.log("Database connected successfully") },
    (err) => { console.error(err); }
);

// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes

app.use('/api/files', fileRoutes);

// Server start
app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${PORT}`);
});
