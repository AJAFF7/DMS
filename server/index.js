import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/personals-All.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'; // Add this import

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = 8282;
const app = express();

app.use(express.json());
<<<<<<< HEAD

//app.use(cors());

app.use(cors({
    origin: '*', // Allow all origins
}));


=======
app.use(cors());
>>>>>>> 212008c0 (Added Some-10)
app.use(express.static("build"));
app.use("/auth", userRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html')); // Use path here
});

mongoose.connect('mongodb+srv://ajsengineer:mdb5550140@clients.dzqygjh.mongodb.net/Clients?retryWrites=true&w=majority')
  .then(() => console.log('DB Connected...'))
  .catch((err) => { console.log(err); });

app.listen(port, () => console.log("Server running on port:", port));
<<<<<<< HEAD
=======



>>>>>>> 212008c0 (Added Some-10)








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



// mongoose.connect('mongodb+srv://ajsengineer:mdb5550140@clients.dzqygjh.mongodb.net/Clients?retryWrites=true&w=majority').then(() => console.log('DB Connected...')).catch((err) => {console.log(err);})



// app.listen(port,  () => console.log("Server running on port:", port));











