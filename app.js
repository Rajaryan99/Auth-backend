import express from "express";
import 'dotenv/config'
import mongoose from "mongoose";

const app = express()

const port  = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello World!!!")
})



const connectDB = async () => {
    try {

        const res = await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connected successfully!!")

        app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
    
})
        
    } catch (error) {
        console.error("Error in connection DB", error)
    }
}



connectDB();