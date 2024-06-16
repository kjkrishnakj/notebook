const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://krishna:<Foolgold@2>@cluster0.9hyy8aa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

module.exports = connectToMongo;
