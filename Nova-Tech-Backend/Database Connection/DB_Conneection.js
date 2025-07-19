const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
require('dotenv').config();

let gridFSBucket; // Declare it here but initialize inside function

const ConnnectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MongoDB_URL);

        console.log('MongoDB connected successfully');

        // Initialize GridFSBucket after successful connection
        // const db = mongoose.connection.db;
        // gridFSBucket = new GridFSBucket(db, { bucketName: 'uploads' });

        // console.log('GridFS initialized');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit process on failure
    }
};

// **Make sure GridFSBucket is accessible after initialization**
const getGridFSBucket = () => {
    if (!gridFSBucket) throw new Error("GridFSBucket is not initialized yet!");
    return gridFSBucket;
};

module.exports = { ConnnectDB, getGridFSBucket };