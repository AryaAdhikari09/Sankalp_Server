require('dotenv').config();
const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database Connected Successfully');
    } catch (err) {
        console.log("MongoDB Couldn't Connect: ", err);
    }
}

module.exports = connectDB;
