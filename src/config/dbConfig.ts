import mongoose from "mongoose";

export async function dbConnection() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB connected");
        })

        connection.on("error", (error) => {
            console.log("MongoDB connection error, please make sure DB is up and running: " + error);
            process.exit();
        })

    } catch (error) {
        console.log("Something went wrong in connecting with DB");
        console.log(error);
    }
}