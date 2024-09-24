import mongoose from "mongoose"

export const DbConnection = async (url) => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then((result) => {
            console.log("Connected to MongoDB successfully!");

        }).catch(err => {
            console.log("Error connecting to MongoDB" + err.message);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};