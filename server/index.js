import express from "express";
import cors from "cors";
// const cors = require('cors');
import mongoose from "mongoose";
import { userRouter } from "./routes/personals-All.js";




const port = 8282
const app = express();

app.use(express.json());
app.use(cors());
//app.use(express.static("build"));
app.use("/auth", userRouter);



mongoose.connect('mongodb+srv://ajsengineer:mdb5550140@clients.dzqygjh.mongodb.net/Clients?retryWrites=true&w=majority').then(() => console.log('DB Connected...')).catch((err) => {console.log(err);})



app.listen(port,  () => console.log("Server running on port:", port));











// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// // import dotenv from 'dotenv';
// import { userRouter } from "./routes/user.js";
// // dotenv.config();



// const port = 8000;


// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.use(cors);

// app.use("/auth", userRouter);


// mongoose.connect('mongodb+srv://ajsengineer:mdb5550140@clients.dzqygjh.mongodb.net/Clients?retryWrites=true&w=majority',{
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log('DB Connected...')).catch((err) => {console.log(err);})

// // const secretKey = process.env.SECRET_KEY;



// app.listen(port,  () => console.log("Server running on port:", port));


