import express from "express"; 
import { PORT, MONGO_URL } from "./config.js";
import mongoose from "mongoose";
import router from "./routes/booksRoute.js";
import cors from "cors";

const app = express(); 

app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
    res.send("Hello World");
});  

app.use("/books", router);

mongoose.connect(MONGO_URL).then(()=>{
    console.log("MongoDB connected");
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    }); 
}).catch((err)=>{
    console.log(err);
}); 


