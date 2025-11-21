const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
            .then(() => console.log(`Connected to MongoDB ${mongoose.connection.host}`));
    } catch (error) {
        console.log(`Connection Error ${error}`);
    }
}

module.exports = connectDB;
