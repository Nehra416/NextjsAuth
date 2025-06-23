import mongoose from "mongoose";

export async function dbConnection() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log("MongoDb is Connected");

    } catch (error) {
        console.log("Something went wrong in connecting with DB" + error);
        process.exit();
    }
}