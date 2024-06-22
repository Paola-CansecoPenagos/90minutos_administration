import mongoose from 'mongoose';

const connectDatabase = async () => {
    try {
        const dbUri = "mongodb://localhost:27017/reporting"; 
        await mongoose.connect(dbUri);
        console.log("Connected to MongoDB successfully.");
    } catch (error) {
        console.error("Could not connect to MongoDB:", error);
    }
};

export default connectDatabase;