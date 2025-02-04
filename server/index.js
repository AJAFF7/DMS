// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import { userRouter } from "./routes/personals-All.js";
// import { fileURLToPath } from "url";
// import { dirname, join } from "path";

// // Setup directory paths
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const app = express();
// const port = 8282;

// // Middleware
// app.use(express.json()); // Parse JSON requests
// app.use(cors({ origin: "*" })); // Enable CORS for all origins

// // Serve static files (React frontend)
// const buildPath = join(__dirname, "build");
// app.use(express.static(buildPath));

// // API routes
// app.use("/auth", userRouter);

// // Catch-all route for SPA (React)
// app.get("*", (req, res) => {
//   res.sendFile(join(buildPath, "index.html"));
// });

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✓ Connected to MongoDB"))
//   .catch((err) => console.error("✗ MongoDB Connection Error:", err));

// // Start the server
// app.listen(port, () => console.log(`✓ Server running on port ${port}`));







// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import { userRouter } from "./routes/personals-All.js";
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import path from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const port = 8282;
// const app = express();

// app.use(express.json());

// // Enable CORS for all origins
// app.use(cors({ origin: '*' }));

// // Serve static files from the "build/static" directory under the "/static" route
// app.use('/static', express.static(path.join(__dirname, 'build', 'static')));

// // Serve the React/Vite app from the "build" directory
// app.use(express.static(path.join(__dirname, 'build')));

// // Routes
// app.use("/auth", userRouter);

// // Catch-all route for client-side routing (SPA)
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
// });

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('DB Connected.....'))
//   .catch((err) => { console.log('MongoDB connection error:', err); });

// // Start the server
// app.listen(port, () => console.log("Server running on port:", port));











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


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connected....'))
  .catch((err) => { console.log('MongoDB connection error:', err); });


 //Connect to MongoDB
// mongoose.connect('mongodb://jaff:mdb5550140@mongo-service:27017/Client?authSource=admin')
//   .then(() => console.log('DB Connected...'))
//   .catch((err) => { console.log('MongoDB connection error:', err); });

// Start the server
app.listen(port, () => console.log("Server running on port:", port));












// mongoose.connect('mongodb+srv://ajsengineer:mdb5550140@clients.dzqygjh.mongodb.net/Clients?retryWrites=true&w=majority').then(() => console.log('DB Connected...')).catch((err) => {console.log(err);})















