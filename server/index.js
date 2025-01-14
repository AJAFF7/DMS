import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/personals-All.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = 8282;
const app = express();

app.use(express.json());

// Enable CORS for all origins
app.use(cors({
    origin: '*', // Allow all origins
}));

// Static files (build folder)
app.use(express.static("build"));
app.use("/auth", userRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html')); // Serve index.html for other routes
});

// Connect to MongoDB
mongoose.connect('mongodb://jaff:mdb5550140@mongo-service:27017/Client?authSource=admin')
  .then(() => console.log('DB Connected...'))
  .catch((err) => { console.log('MongoDB connection error:', err); });

// Start the server
app.listen(port, () => console.log("Server running on port:", port));



















// import express from "express";
// import cors from "cors";
// // const cors = require('cors');
// import mongoose from "mongoose";
// import { userRouter } from "./routes/personals-All.js";




// const port = 8282
// const app = express();

// app.use(express.json());
// app.use(cors());
// //app.use(express.static("build"));
// app.use("/auth", userRouter);

//mongodb+srv://ajsengineer:mdb5550140@clients.dzqygjh.mongodb.net/?retryWrites=true&w=majority&appName=Clients
//mongodb://jaff:mdb5550140@mongo-service:27017/Client?authSource=admin
// mongoose.connect('mongodb+srv://ajsengineer:mdb5550140@clients.dzqygjh.mongodb.net/Clients?retryWrites=true&w=majority').then(() => console.log('DB Connected...')).catch((err) => {console.log(err);})



// app.listen(port,  () => console.log("Server running on port:", port));











