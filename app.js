require("dotenv").config();
require('express-async-errors');

const connectDB = require("./db/connect");
const express = require("express");
const cors = require('cors')
const app = express();
const mainRouter = require("./routes/user");
<<<<<<< HEAD
const eventRoutes = require("./routes/eventRoute")
=======
const galleryRoutes = require("./routes/galleryRoute");
>>>>>>> 65d6d8ae5216d594c197e95026d8bfa6721a4d40

app.use(express.json());

app.use(cors())
app.use("/api/v1", mainRouter);
<<<<<<< HEAD
app.use("/api", eventRoutes);
=======
app.use('/api/v1/gallery', galleryRoutes);
>>>>>>> 65d6d8ae5216d594c197e95026d8bfa6721a4d40

const port = process.env.PORT || 3000;

const start = async () => {

    try {        
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        })

    } catch (error) {
       console.log(error); 
    }
}

start();

