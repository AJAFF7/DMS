import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import cron from "node-cron";
const app = express();
// import verifyToken from './VerifyToken.js'
import http from "http";
import { Server as SocketIOServer } from "socket.io";
const server = http.createServer(app);
const io = new SocketIOServer(server);
import fs from "fs";
import mongoose from "mongoose";

// import cron from 'node-cron';

const router = express.Router();

import { Manager_Model } from "../models/Manager-power/Manager.js";

import { DataModelPersonal1 } from "../models/Personal-1/Personal1-m.js";
import { Pauth_Model1 } from "../models/Personal-1/Personal1-auth-m.js";

import { DataModelPersonal2 } from "../models/Personal-2/Personal2-m.js";
import { Pauth_Model2 } from "../models/Personal-2/Personal2-auth-m.js";

import { DataModelPersonal3 } from "../models/Personal-3/Personal3-m.js";
import { Pauth_Model3 } from "../models/Personal-3/Personal3-auth-m.js";

// import { UserModel } from "../models/Auth.js";

//Person 1 All

//Personal 1 post Api
router.post("/personal1", async (req, res) => {
  const { pername, quantity, price, dameg } = req.body;

  try {
    const newUser = new DataModelPersonal1({
      pername,
      quantity,
      price,
      dameg,
    });

    // Save the new user to the database
    const savedUser = await newUser.save(); // Make sure to await the save operation

    // Respond with a success message or the newly created user data
    res
      .status(200)
      .json({ message: "User created successfully", user: savedUser });
  } catch (err) {
    // Log the specific error to identify the issue
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Personal1 Get Api
router.get("/personal1", async (req, res) => {
  try {
    const users = await DataModelPersonal1.find().lean(); // Fetch data from your database
    if (users.length > 0) {
      res.status(200).send({ data: users, message: "Data fetched" });
    } else {
      res.status(400).send({ message: "No data found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Delete a book

router.delete("/personal1/:id", async (req, res) => {
  try {
    const result = await DataModelPersonal1.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/p1-auths/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid ObjectId format" });
    }

    const result = await Pauth_Model1.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a personal data item
router.patch("/personal1/:id", async (req, res) => {
  try {
    const updatedItem = await DataModelPersonal1.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item updated successfully", data: updatedItem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Personal1 Auth or login Api
router.post("/personal1-login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Pauth_Model1.findOne({ username });

  if (!user) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }
  const token = jwt.sign({ id: user._id }, "dms_secret");
  res.json({ token, userID: user._id });
});

router.get("/get-username/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const user = await Pauth_Model1.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Assuming the username is stored in a field called 'username' in the user document
    const username = user.username;
    res.json({ username });
  } catch (error) {
    console.error("Error fetching username:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Personal1 Register
router.post("/personal1-regis", async (req, res) => {
  const { username, password } = req.body;
  const user = await Pauth_Model1.findOne({ username });
  if (user) {
    return res.status(400).json({ message: "Username already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new Pauth_Model1({ username, password: hashedPassword });
  await newUser.save();
  res.json({ message: "User registered successfully" });
});

router.get("/totalQuantity1", async (req, res) => {
  try {
    const allDocuments = await DataModelPersonal1.find({});

    // Calculate total quantity by iterating through the documents
    let totalQuantity = 0;
    allDocuments.forEach((doc) => {
      totalQuantity += Number(doc.quantity);
    });
    console.log("Person 1");
    console.log("Total Quantity:", totalQuantity);

    res.status(200).json({ totalQuantity });
  } catch (err) {
    console.error("Error fetching total quantity:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/totalPrice1", async (req, res) => {
  try {
    const allDocuments = await DataModelPersonal1.find({});

    // Calculate total price by iterating through the documents
    let totalPrice = 0;
    allDocuments.forEach((doc) => {
      totalPrice += Number(doc.price);
    });

    console.log("Total Price:", totalPrice);

    res.status(200).json({ totalPrice });
  } catch (err) {
    console.error("Error fetching total price:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Assuming you have a route to fetch the client name from the database
router.get("/totalPername1", async (req, res) => {
  try {
    // Fetch the client name (modify this query based on your schema)
    const pername = await DataModelPersonal1.findOne({});

    if (pername) {
      res.status(200).json({ totalPername: pername.pername });
    } else {
      res.status(404).json({ message: "Pername not found" });
    }
  } catch (err) {
    console.error("Error fetching pername:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/totalDameg1", async (req, res) => {
  try {
    const allDocuments = await DataModelPersonal1.find({});

    // Calculate total price by iterating through the documents
    let totalDameg = 0;
    allDocuments.forEach((doc) => {
      totalDameg += Number(doc.dameg);
    });

    console.log("Total Dameg:", totalDameg);

    res.status(200).json({ totalDameg });
  } catch (err) {
    console.error("Error fetching total dameg:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//personal 1 weekly

router.get("/weeklyReport1", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(3, 0, 0, 0);
    const startOfWeek = new Date(today);

    startOfWeek.setDate(
      today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 0),
    ); // Start from Sunday

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // End on Saturday

    // const today = new Date();
    // const startOfWeek = new Date(today);
    // startOfWeek.setDate(today.getDate() - today.getDay()); // Start from Sunday

    // const endOfWeek = new Date(startOfWeek);
    // endOfWeek.setDate(startOfWeek.getDate() + 6); // End on Saturday

    const allDocuments = await DataModelPersonal1.find({
      timestamp: { $gte: startOfWeek, $lte: endOfWeek },
    });
    console.log("Personal 1");
    console.log("Start of Week:", startOfWeek);
    console.log("End of Week:", endOfWeek);

    let totalQuantity = 0;
    let totalPrice = 0;
    let totalDameg = 0;

    allDocuments.forEach((doc) => {
      totalQuantity += Number(doc.quantity);
      totalPrice += Number(doc.price);
      totalDameg += Number(doc.dameg);
    });

    console.log("Weekly Quantity:", totalQuantity);
    console.log("Weekly Price:", totalPrice);
    console.log("Weekly Dameg:", totalDameg);

    res.status(200).json({
      startOfWeek,
      endOfWeek,
      totalQuantity,
      totalPrice,
      totalDameg,
    });
  } catch (err) {
    console.error("Error fetching weekly report:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/// Weekly personal 1 proc

//////////

router.get("/weeklyReport1proc", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(3, 0, 0, 0);
    const startOfWeek = new Date(today);
    startOfWeek.setDate(
      today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 0),
    ); // Start from Sunday

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // End on Saturday

    const allDocuments = await DataModelPersonal1.find({
      timestamp: { $gte: startOfWeek, $lte: endOfWeek },
    });

    let totalQuantity = 0;
    let totalPrice = 0;
    let totalDameg = 0;

    allDocuments.forEach((doc) => {
      totalQuantity += Number(doc.quantity);
      totalPrice += Number(doc.price);
      totalDameg += Number(doc.dameg);
    });

    console.log("Weekly Quantity:", totalQuantity);
    console.log("Weekly Price:", totalPrice);
    console.log("Weekly Damage:", totalDameg);

    // Email sending logic
    if (totalDameg >= 50) {
      console.log("Weekly damage personal (1) exceeds 50!");

      //// Sending email to the manager for damage > 50
      // const transporter = nodemailer.createTransport({
      //   service: 'gmail',
      //   auth: {
      //     user: 'zeta.alert23@gmail.com',
      //     pass: 'lnxr ypqm blhz lapd'
      //   }
      // });

      // const mailOptions = {
      //   from: 'zeta.alert23@gmail.com',
      //   to: 'aramj@outlook.com',
      //   subject: 'Weekly Damage Report (Exceeds 50)',
      //   text: `Weekly damage exceeds 50! for (personal 1)\nStart of Week: ${startOfWeek}\nEnd of Week: ${endOfWeek}\nTotal Damage: ${totalDameg}`
      // };

      // transporter.sendMail(mailOptions, (error, info) => {
      //   if (error) {
      //     console.error('Error sending email:', error);
      //   } else {
      //     console.log('Email sent:', info.response);
      //   }
      // });
      io.emit("damageAlert", {
        startOfWeek,
        endOfWeek,
        totalQuantity,
        totalPrice,
        totalDameg,
        // No message needed for this condition
      });
      // Res status and response if damage exceeds 50
      res.status(200).json({
        startOfWeek,
        endOfWeek,
        totalQuantity,
        totalPrice,
        totalDameg,
        message:
          "Weekly damage exceeds 50! you have reach the  weekly damage limit Email sent to the manager.",
      });
    } else if (totalDameg >= 36) {
      console.log("Weekly damage personal (1) exceeds 36!");

      //// Sending email to the manager for damage > 36
      // const transporter = nodemailer.createTransport({
      //   service: 'gmail',
      //   auth: {
      //     user: 'zeta.alert23@gmail.com',
      //     pass: 'lnxr ypqm blhz lapd'
      //   }
      // });

      // const mailOptions = {
      //   from: 'zeta.alert23@gmail.com',
      //   to: 'aramj@outlook.com',
      //   subject: 'Weekly Damage Report (Exceeds 36)',
      //   text: `Weekly damage exceeds 36 for (personal 1)\nStart of Week: ${startOfWeek}\nEnd of Week: ${endOfWeek}\nTotal Damage: ${totalDameg}`
      // };

      // transporter.sendMail(mailOptions, (error, info) => {
      //   if (error) {
      //     console.error('Error sending email:', error);
      //   } else {
      //     console.log('Email sent:', info.response);
      //   }
      // });

      io.emit("damageAlert", {
        startOfWeek,
        endOfWeek,
        totalQuantity,
        totalPrice,
        totalDameg,
        // No message needed for this condition
      });

      res.status(200).json({
        startOfWeek,
        endOfWeek,
        totalQuantity,
        totalPrice,
        totalDameg,
        message:
          "Weekly damage has exceeded 35. There's one more to reach the weekly damages limit another email will be sent to the manager .",
      });
    } else
      res.status(200).json({
        startOfWeek,
        endOfWeek,
        totalQuantity,
        totalPrice,
        totalDameg,
      });
  } catch (err) {
    console.error("Error fetching weekly report:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

async function sendWeeklyReport1() {
  try {
    const today = new Date();
    today.setHours(3, 0, 0, 0);
    const startOfWeek = new Date(today);
    startOfWeek.setDate(
      today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 0),
    ); // Start from Sunday

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // End on Saturday

    const allDocuments = await DataModelPersonal1.find({
      timestamp: { $gte: startOfWeek, $lte: endOfWeek },
    });

    let totalQuantity = 0;
    let totalPrice = 0;
    let totalDameg = 0;

    allDocuments.forEach((doc) => {
      totalQuantity += Number(doc.quantity);
      totalPrice += Number(doc.price);
      totalDameg += Number(doc.dameg);
    });
    // ... your existing code for fetching weekly data

    // ... your logic to calculate weekly data

    // Email sending logic
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "zeta.alert23@gmail.com",
        pass: "lnxr ypqm blhz lapd",
      },
    });

    const mailOptions = {
      from: "zeta.alert23@gmail.com",
      to: "aramj@outlook.com",
      subject: "Weekly Report",
      text: `Weekly report details:  Start of Week: ${startOfWeek}\nEnd of Week: ${endOfWeek}\n Quantity : ${totalQuantity}, Price : ${totalPrice}, Damage :s ${totalDameg}`,
      // You can customize the text to include more details or format it as needed
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    // ... your existing logic for emitting events and sending responses
  } catch (err) {
    console.error("Error sending weekly report by email:", err);
    // Handle errors here
  }
}

// Schedule the function to run every Saturday at 00:00 (midnight)
const job1 = cron.schedule("0 0 * * 6", async () => {
  console.log("Generating and sending weekly report...");
  await sendWeeklyReport1();
});

// Start the cron job
job1.start();

//

//Schedule the function to run every Saturday at 00:00 (midnight)
// cron.schedule('0 0 * * 6', async () => {
//   console.log('Generating and sending weekly report...');
//   await sendWeeklyReport();
// });

//Qwartal persoanl 1

router.get("/quarterlyReport1", async (req, res) => {
  try {
    const today = new Date();
    const quarterStartMonth = Math.floor(today.getMonth() / 3) * 3;
    const startOfQuarter = new Date(today.getFullYear(), quarterStartMonth, 1);
    const endOfQuarter = new Date(
      startOfQuarter.getFullYear(),
      startOfQuarter.getMonth() + 3,
      0,
      23,
      59,
      59,
    );

    const allDocuments = await DataModelPersonal1.find({
      timestamp: { $gte: startOfQuarter, $lte: endOfQuarter },
    });
    console.log("Personal 1");
    console.log("Start of Quarter:", startOfQuarter);
    console.log("End of Quarter:", endOfQuarter);

    let totalQuantity = 0;
    let totalPrice = 0;
    let totalDameg = 0;

    allDocuments.forEach((doc) => {
      totalQuantity += Number(doc.quantity);
      totalPrice += Number(doc.price);
      totalDameg += Number(doc.dameg);
    });

    console.log("Quarterly Quantity:", totalQuantity);
    console.log("Quarterly Price:", totalPrice);
    console.log("Quarterly Dameg:", totalDameg);

    res.status(200).json({
      startOfQuarter,
      endOfQuarter,
      totalQuantity,
      totalPrice,
      totalDameg,
    });
  } catch (err) {
    console.error("Error fetching quarterly report:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/////////////////////////////////

//Person 2 All

router.post("/personal2", async (req, res) => {
  const { pername, email, quantity, price, dameg, total } = req.body;

  try {
    const newUser = new DataModelPersonal2({
      pername,
      email,
      quantity,
      price,
      dameg,
      total,
    });

    // Save the new user to the database
    const savedUser = await newUser.save(); // Make sure to await the save operation

    // Respond with a success message or the newly created user data
    res
      .status(200)
      .json({ message: "User created successfully", user: savedUser });
  } catch (err) {
    // Log the specific error to identify the issue
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Personal2 Get Api

router.get("/personal2", async (req, res) => {
  try {
    const users = await DataModelPersonal2.find().lean(); // Fetch data from your database
    if (users.length > 0) {
      res.status(200).send({ data: users, message: "Data fetched" });
    } else {
      res.status(400).send({ message: "No data found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
});

//Personal2 Auth or login Api
router.post("/personal2-login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Pauth_Model2.findOne({ username });

  if (!user) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }
  const token = jwt.sign({ id: user._id }, "dms_secret");
  res.json({ token, userID: user._id });
});

//Personal2 Register
router.post("/personal2-regis", async (req, res) => {
  const { username, password } = req.body;
  const user = await Pauth_Model2.findOne({ username });
  if (user) {
    return res.status(400).json({ message: "Username already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new Pauth_Model2({ username, password: hashedPassword });
  await newUser.save();
  res.json({ message: "User registered successfully" });
});

//Total ithem Person 2
router.get("/totalQuantity2", async (req, res) => {
  try {
    const allDocuments = await DataModelPersonal2.find({});

    // Calculate total quantity by iterating through the documents
    let totalQuantity = 0;
    allDocuments.forEach((doc) => {
      totalQuantity += Number(doc.quantity);
    });
    console.log("Person 2");
    console.log("Total Quantity:", totalQuantity);

    res.status(200).json({ totalQuantity });
  } catch (err) {
    console.error("Error fetching total quantity:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/totalPrice2", async (req, res) => {
  try {
    const allDocuments = await DataModelPersonal2.find({});

    // Calculate total price by iterating through the documents
    let totalPrice = 0;
    allDocuments.forEach((doc) => {
      totalPrice += Number(doc.price);
    });

    console.log("Total Price:", totalPrice);

    res.status(200).json({ totalPrice });
  } catch (err) {
    console.error("Error fetching total price:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Assuming you have a route to fetch the client name from the database
router.get("/totalPername2", async (req, res) => {
  try {
    // Fetch the client name (modify this query based on your schema)
    const pername = await DataModelPersonal2.findOne({});

    if (pername) {
      res.status(200).json({ totalPername: pername.pername });
    } else {
      res.status(404).json({ message: "Pername not found" });
    }
  } catch (err) {
    console.error("Error fetching pername:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/totalDameg2", async (req, res) => {
  try {
    const allDocuments = await DataModelPersonal2.find({});

    // Calculate total price by iterating through the documents
    let totalDameg = 0;
    allDocuments.forEach((doc) => {
      totalDameg += Number(doc.dameg);
    });

    console.log("Total Dameg:", totalDameg);

    res.status(200).json({ totalDameg });
  } catch (err) {
    console.error("Error fetching total dameg:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//personal 2 weekly

router.get("/weeklyReport2", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(3, 0, 0, 0);
    const startOfWeek = new Date(today);
    startOfWeek.setDate(
      today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 0),
    ); // Start from Sunday

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // End on Saturday

    // const today = new Date();
    // const startOfWeek = new Date(today);
    // startOfWeek.setDate(today.getDate() - today.getDay()); // Start from Sunday

    // const endOfWeek = new Date(startOfWeek);
    // endOfWeek.setDate(startOfWeek.getDate() + 6); // End on Saturday

    const allDocuments = await DataModelPersonal2.find({
      timestamp: { $gte: startOfWeek, $lte: endOfWeek },
    });
    console.log("Personal 2");
    console.log("Start of Week:", startOfWeek);
    console.log("End of Week:", endOfWeek);

    let totalQuantity = 0;
    let totalPrice = 0;
    let totalDameg = 0;

    allDocuments.forEach((doc) => {
      totalQuantity += Number(doc.quantity);
      totalPrice += Number(doc.price);
      totalDameg += Number(doc.dameg);
    });

    console.log("Weekly Quantity:", totalQuantity);
    console.log("Weekly Price:", totalPrice);
    console.log("Weekly Dameg:", totalDameg);

    res.status(200).json({
      startOfWeek,
      endOfWeek,
      totalQuantity,
      totalPrice,
      totalDameg,
    });
  } catch (err) {
    console.error("Error fetching weekly report:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/// Weekly personal 2 proc
router.get("/weeklyReport2proc", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(3, 0, 0, 0);
    const startOfWeek = new Date(today);
    startOfWeek.setDate(
      today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 0),
    ); // Start from Sunday

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // End on Saturday

    const allDocuments = await DataModelPersonal2.find({
      timestamp: { $gte: startOfWeek, $lte: endOfWeek },
    });

    let totalQuantity = 0;
    let totalPrice = 0;
    let totalDameg = 0;

    allDocuments.forEach((doc) => {
      totalQuantity += Number(doc.quantity);
      totalPrice += Number(doc.price);
      totalDameg += Number(doc.dameg);
    });

    console.log("Weekly Quantity:", totalQuantity);
    console.log("Weekly Price:", totalPrice);
    console.log("Weekly Damage:", totalDameg);

    // Email sending logic
    if (totalDameg >= 50) {
      console.log("Weekly damage personal (2) exceeds 50!");

      //// Sending email to the manager for damage > 50
      // const transporter = nodemailer.createTransport({
      //   service: 'gmail',
      //   auth: {
      //     user: 'zeta.alert23@gmail.com',
      //     pass: 'lnxr ypqm blhz lapd'
      //   }
      // });

      // const mailOptions = {
      //   from: 'zeta.alert23@gmail.com',
      //   to: 'aramj@outlook.com',
      //   subject: 'Weekly Damage Report (Exceeds 50)',
      //   text: `Weekly damage exceeds 50! for (personal 2)\nStart of Week: ${startOfWeek}\nEnd of Week: ${endOfWeek}\nTotal Damage: ${totalDameg}`
      // };

      // transporter.sendMail(mailOptions, (error, info) => {
      //   if (error) {
      //     console.error('Error sending email:', error);
      //   } else {
      //     console.log('Email sent:', info.response);
      //   }
      // });
      io.emit("damageAlert", {
        startOfWeek,
        endOfWeek,
        totalQuantity,
        totalPrice,
        totalDameg,
        // No message needed for this condition
      });
      // Res status and response if damage exceeds 50
      res.status(200).json({
        startOfWeek,
        endOfWeek,
        totalQuantity,
        totalPrice,
        totalDameg,
        message:
          "Weekly damage exceeds 50! you have reach the  weekly damage limit Email sent to the manager.",
      });
    } else if (totalDameg >= 36) {
      console.log("Weekly damage personal (2) exceeds 36!");

      //// Sending email to the manager for damage > 36
      // const transporter = nodemailer.createTransport({
      //   service: 'gmail',
      //   auth: {
      //     user: 'zeta.alert23@gmail.com',
      //     pass: 'lnxr ypqm blhz lapd'
      //   }
      // });

      // const mailOptions = {
      //   from: 'zeta.alert23@gmail.com',
      //   to: 'aramj@outlook.com', //aramj@outlook.com
      //   subject: 'Weekly Damage Report (Exceeds 36)',
      //   text: `Weekly damage exceeds 36 for (personal 2)\nStart of Week: ${startOfWeek}\nEnd of Week: ${endOfWeek}\nTotal Damage: ${totalDameg}`
      // };

      // transporter.sendMail(mailOptions, (error, info) => {
      //   if (error) {
      //     console.error('Error sending email:', error);
      //   } else {
      //     console.log('Email sent:', info.response);
      //   }
      // });

      io.emit("damageAlert", {
        startOfWeek,
        endOfWeek,
        totalQuantity,
        totalPrice,
        totalDameg,
        // No message needed for this condition
      });

      res.status(200).json({
        startOfWeek,
        endOfWeek,
        totalQuantity,
        totalPrice,
        totalDameg,
        message:
          "Weekly damage has exceeded 35. There's one more to reach the weekly damages limit another email will be sent to the manager .",
      });
    } else
      res.status(200).json({
        startOfWeek,
        endOfWeek,
        totalQuantity,
        totalPrice,
        totalDameg,
      });
  } catch (err) {
    console.error("Error fetching weekly report:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

async function sendWeeklyReport2() {
  try {
    const today = new Date();
    today.setHours(3, 0, 0, 0);
    const startOfWeek = new Date(today);
    startOfWeek.setDate(
      today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 0),
    ); // Start from Sunday

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // End on Saturday

    const allDocuments = await DataModelPersonal2.find({
      timestamp: { $gte: startOfWeek, $lte: endOfWeek },
    });

    let totalQuantity = 0;
    let totalPrice = 0;
    let totalDameg = 0;

    allDocuments.forEach((doc) => {
      totalQuantity += Number(doc.quantity);
      totalPrice += Number(doc.price);
      totalDameg += Number(doc.dameg);
    });
    // ... your existing code for fetching weekly data

    // ... your logic to calculate weekly data

    // Email sending logic
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "zeta.alert23@gmail.com",
        pass: "lnxr ypqm blhz lapd",
      },
    });

    const mailOptions = {
      from: "zeta.alert23@gmail.com",
      to: "aramj@outlook.com",
      subject: "Weekly Report",
      text: `Weekly report details:  Start of Week: ${startOfWeek}\nEnd of Week: ${endOfWeek}\n Quantity : ${totalQuantity}, Price : ${totalPrice}, Damage :s ${totalDameg}`,
      // You can customize the text to include more details or format it as needed
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    // ... your existing logic for emitting events and sending responses
  } catch (err) {
    console.error("Error sending weekly report by email:", err);
    // Handle errors here
  }
}

// Schedule the function to run every Saturday at 00:00 (midnight)
const job2 = cron.schedule("0 0 * * 6", async () => {
  console.log("Generating and sending weekly report...");
  await sendWeeklyReport2();
});

// Start the cron job
job2.start();

//Qwartal persoanl 2

router.get("/quarterlyReport2", async (req, res) => {
  try {
    const today = new Date();
    const quarterStartMonth = Math.floor(today.getMonth() / 3) * 3;
    const startOfQuarter = new Date(today.getFullYear(), quarterStartMonth, 1);
    const endOfQuarter = new Date(
      startOfQuarter.getFullYear(),
      startOfQuarter.getMonth() + 3,
      0,
      23,
      59,
      59,
    );

    const allDocuments = await DataModelPersonal2.find({
      timestamp: { $gte: startOfQuarter, $lte: endOfQuarter },
    });
    console.log("Personal 2");
    console.log("Start of Quarter:", startOfQuarter);
    console.log("End of Quarter:", endOfQuarter);

    let totalQuantity = 0;
    let totalPrice = 0;
    let totalDameg = 0;

    allDocuments.forEach((doc) => {
      totalQuantity += Number(doc.quantity);
      totalPrice += Number(doc.price);
      totalDameg += Number(doc.dameg);
    });

    console.log("Quarterly Quantity:", totalQuantity);
    console.log("Quarterly Price:", totalPrice);
    console.log("Quarterly Dameg:", totalDameg);

    res.status(200).json({
      startOfQuarter,
      endOfQuarter,
      totalQuantity,
      totalPrice,
      totalDameg,
    });
  } catch (err) {
    console.error("Error fetching quarterly report:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

///////////////////////////

///Personal 3 All

router.post("/personal3", async (req, res) => {
  const { pername, email, quantity, price, dameg, total } = req.body;

  try {
    const newUser = new DataModelPersonal3({
      pername,
      email,
      quantity,
      price,
      dameg,
      total,
    });

    // Save the new user to the database
    const savedUser = await newUser.save(); // Make sure to await the save operation

    // Respond with a success message or the newly created user data
    res
      .status(200)
      .json({ message: "User created successfully", user: savedUser });
  } catch (err) {
    // Log the specific error to identify the issue
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Personal 3 Get Api

router.get("/personal3", async (req, res) => {
  try {
    const users = await DataModelPersonal3.find().lean(); // Fetch data from your database
    if (users.length > 0) {
      res.status(200).send({ data: users, message: "Data fetched" });
    } else {
      res.status(400).send({ message: "No data found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
});

//Personal 3 Auth or login Api
router.post("/personal3-login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Pauth_Model3.findOne({ username });

  if (!user) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }
  const token = jwt.sign({ id: user._id }, "dms_secret");
  res.json({ token, userID: user._id });
});

//Personal2 Register
router.post("/personal3-regis", async (req, res) => {
  const { username, password } = req.body;
  const user = await Pauth_Model3.findOne({ username });
  if (user) {
    return res.status(400).json({ message: "Username already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new Pauth_Model3({ username, password: hashedPassword });
  await newUser.save();
  res.json({ message: "User registered successfully" });
});

//Total ithem Person 3
router.get("/totalQuantity3", async (req, res) => {
  try {
    const allDocuments = await DataModelPersonal3.find({});

    // Calculate total quantity by iterating through the documents
    let totalQuantity = 0;
    allDocuments.forEach((doc) => {
      totalQuantity += Number(doc.quantity);
    });
    console.log("Person 3");
    console.log("Total Quantity:", totalQuantity);

    res.status(200).json({ totalQuantity });
  } catch (err) {
    console.error("Error fetching total quantity:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/totalPrice3", async (req, res) => {
  try {
    const allDocuments = await DataModelPersonal3.find({});

    // Calculate total price by iterating through the documents
    let totalPrice = 0;
    allDocuments.forEach((doc) => {
      totalPrice += Number(doc.price);
    });

    console.log("Total Price:", totalPrice);

    res.status(200).json({ totalPrice });
  } catch (err) {
    console.error("Error fetching total price:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Assuming you have a route to fetch the client name from the database
router.get("/totalPername3", async (req, res) => {
  try {
    // Fetch the client name (modify this query based on your schema)
    const pername = await DataModelPersonal3.findOne({});

    if (pername) {
      res.status(200).json({ totalPername: pername.pername });
    } else {
      res.status(404).json({ message: "Pername not found" });
    }
  } catch (err) {
    console.error("Error fetching pername:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/totalDameg3", async (req, res) => {
  try {
    const allDocuments = await DataModelPersonal3.find({});

    // Calculate total price by iterating through the documents
    let totalDameg = 0;
    allDocuments.forEach((doc) => {
      totalDameg += Number(doc.dameg);
    });

    console.log("Total Dameg:", totalDameg);

    res.status(200).json({ totalDameg });
  } catch (err) {
    console.error("Error fetching total dameg:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/// Weekly personal 3
router.get("/weeklyReport3", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startOfWeek = new Date(today);
    startOfWeek.setDate(
      today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 0),
    ); // Start from Sunday

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // End on Saturday

    // const today = new Date();
    // const startOfWeek = new Date(today);
    // startOfWeek.setDate(today.getDate() - today.getDay()); // Start from Sunday

    // const endOfWeek = new Date(startOfWeek);
    // endOfWeek.setDate(startOfWeek.getDate() + 6); // End on Saturday

    const allDocuments = await DataModelPersonal3.find({
      timestamp: { $gte: startOfWeek, $lte: endOfWeek },
    });
    console.log("Personal 3");
    console.log("Start of Week:", startOfWeek);
    console.log("End of Week:", endOfWeek);

    let totalQuantity = 0;
    let totalPrice = 0;
    let totalDameg = 0;

    allDocuments.forEach((doc) => {
      totalQuantity += Number(doc.quantity);
      totalPrice += Number(doc.price);
      totalDameg += Number(doc.dameg);
    });

    console.log("Weekly Quantity:", totalQuantity);
    console.log("Weekly Price:", totalPrice);
    console.log("Weekly Dameg:", totalDameg);

    res.status(200).json({
      startOfWeek,
      endOfWeek,
      totalQuantity,
      totalPrice,
      totalDameg,
    });
  } catch (err) {
    console.error("Error fetching weekly report:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/// Weekly personal 3 proc
router.get("/weeklyReport3proc", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(3, 0, 0, 0);
    const startOfWeek = new Date(today);
    startOfWeek.setDate(
      today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 0),
    ); // Start from Sunday

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // End on Saturday

    const allDocuments = await DataModelPersonal3.find({
      timestamp: { $gte: startOfWeek, $lte: endOfWeek },
    });

    let totalQuantity = 0;
    let totalPrice = 0;
    let totalDameg = 0;

    allDocuments.forEach((doc) => {
      totalQuantity += Number(doc.quantity);
      totalPrice += Number(doc.price);
      totalDameg += Number(doc.dameg);
    });

    console.log("Weekly Quantity:", totalQuantity);
    console.log("Weekly Price:", totalPrice);
    console.log("Weekly Damage:", totalDameg);

    // Email sending logic
    if (totalDameg >= 50) {
      console.log("Weekly damage personal (3) exceeds 50!");

      //// Sending email to the manager for damage > 50
      // const transporter = nodemailer.createTransport({
      //   service: 'gmail',
      //   auth: {
      //     user: 'zeta.alert23@gmail.com',
      //     pass: 'lnxr ypqm blhz lapd'
      //   }
      // });

      // const mailOptions = {
      //   from: 'zeta.alert23@gmail.com',
      //   to: 'aramj@outlook.com',
      //   subject: 'Weekly Damage Report (Exceeds 50)',
      //   text: `Weekly damage exceeds 50! for (personal 3)\nStart of Week: ${startOfWeek}\nEnd of Week: ${endOfWeek}\nTotal Damage: ${totalDameg}`
      // };

      // transporter.sendMail(mailOptions, (error, info) => {
      //   if (error) {
      //     console.error('Error sending email:', error);
      //   } else {
      //     console.log('Email sent:', info.response);
      //   }
      // });
      io.emit("damageAlert", {
        startOfWeek,
        endOfWeek,
        totalQuantity,
        totalPrice,
        totalDameg,
        // No message needed for this condition
      });
      // Res status and response if damage exceeds 50
      res.status(200).json({
        startOfWeek,
        endOfWeek,
        totalQuantity,
        totalPrice,
        totalDameg,
        message:
          "Weekly damage exceeds 50! you have reach the  weekly damage limit Email sent to the manager.",
      });
    } else if (totalDameg >= 36) {
      console.log("Weekly damage personal (3) exceeds 36!");

      //// Sending email to the manager for damage > 36
      // const transporter = nodemailer.createTransport({
      //   service: 'gmail',
      //   auth: {
      //     user: 'zeta.alert23@gmail.com',
      //     pass: 'lnxr ypqm blhz lapd'
      //   }
      // });

      // const mailOptions = {
      //   from: 'zeta.alert23@gmail.com',
      //   to: 'aramj@outlook.com',
      //   subject: 'Weekly Damage Report (Exceeds 36)',
      //   text: `Weekly damage exceeds 36 for (personal 3)\nStart of Week: ${startOfWeek}\nEnd of Week: ${endOfWeek}\nTotal Damage: ${totalDameg}`
      // };

      // transporter.sendMail(mailOptions, (error, info) => {
      //   if (error) {
      //     console.error('Error sending email:', error);
      //   } else {
      //     console.log('Email sent:', info.response);
      //   }
      // });

      io.emit("damageAlert", {
        startOfWeek,
        endOfWeek,
        totalQuantity,
        totalPrice,
        totalDameg,
        // No message needed for this condition
      });

      res.status(200).json({
        startOfWeek,
        endOfWeek,
        totalQuantity,
        totalPrice,
        totalDameg,
        message:
          "Weekly damage has exceeded 35. There's one more to reach the weekly damages limit another email will be sent to the manager .",
      });
    } else
      res.status(200).json({
        startOfWeek,
        endOfWeek,
        totalQuantity,
        totalPrice,
        totalDameg,
      });
  } catch (err) {
    console.error("Error fetching weekly report:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

async function sendWeeklyReport3() {
  try {
    const today = new Date();
    today.setHours(3, 0, 0, 0);
    const startOfWeek = new Date(today);
    startOfWeek.setDate(
      today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 0),
    ); // Start from Sunday

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // End on Saturday

    const allDocuments = await DataModelPersonal3.find({
      timestamp: { $gte: startOfWeek, $lte: endOfWeek },
    });

    let totalQuantity = 0;
    let totalPrice = 0;
    let totalDameg = 0;

    allDocuments.forEach((doc) => {
      totalQuantity += Number(doc.quantity);
      totalPrice += Number(doc.price);
      totalDameg += Number(doc.dameg);
    });
    // ... your existing code for fetching weekly data

    // ... your logic to calculate weekly data

    // Email sending logic
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "zeta.alert23@gmail.com",
        pass: "lnxr ypqm blhz lapd",
      },
    });

    const mailOptions = {
      from: "zeta.alert23@gmail.com",
      to: "aramj@outlook.com",
      subject: "Weekly Report",
      text: `Weekly report details:  Start of Week: ${startOfWeek}\nEnd of Week: ${endOfWeek}\n Quantity : ${totalQuantity}, Price : ${totalPrice}, Damage :s ${totalDameg}`,
      // You can customize the text to include more details or format it as needed
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    // ... your existing logic for emitting events and sending responses
  } catch (err) {
    console.error("Error sending weekly report by email:", err);
    // Handle errors here
  }
}

// Schedule the function to run every Saturday at 00:00 (midnight)
const job3 = cron.schedule("0 0 * * 6", async () => {
  console.log("Generating and sending weekly report...");
  await sendWeeklyReport3();
});

// Start the cron job
job3.start();

//Qwartal persoanl 3

router.get("/quarterlyReport3", async (req, res) => {
  try {
    const today = new Date();
    const quarterStartMonth = Math.floor(today.getMonth() / 3) * 3;
    const startOfQuarter = new Date(today.getFullYear(), quarterStartMonth, 1);
    const endOfQuarter = new Date(
      startOfQuarter.getFullYear(),
      startOfQuarter.getMonth() + 3,
      0,
      23,
      59,
      59,
    );

    const allDocuments = await DataModelPersonal3.find({
      timestamp: { $gte: startOfQuarter, $lte: endOfQuarter },
    });
    console.log("Personal 3");
    console.log("Start of Quarter:", startOfQuarter);
    console.log("End of Quarter:", endOfQuarter);

    let totalQuantity = 0;
    let totalPrice = 0;
    let totalDameg = 0;

    allDocuments.forEach((doc) => {
      totalQuantity += Number(doc.quantity);
      totalPrice += Number(doc.price);
      totalDameg += Number(doc.dameg);
    });

    console.log("Quarterly Quantity:", totalQuantity);
    console.log("Quarterly Price:", totalPrice);
    console.log("Quarterly Dameg:", totalDameg);

    res.status(200).json({
      startOfQuarter,
      endOfQuarter,
      totalQuantity,
      totalPrice,
      totalDameg,
    });
  } catch (err) {
    console.error("Error fetching quarterly report:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Manager Auth or login Api
router.post("/manager-login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Manager_Model.findOne({ username });

  if (!user) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }
  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
});

//Manager Register
router.post("/manager-regis", async (req, res) => {
  const { username, password } = req.body;
  const user = await Manager_Model.findOne({ username });
  if (user) {
    return res.status(400).json({ message: "Username already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new Manager_Model({ username, password: hashedPassword });
  await newUser.save();
  res.json({ message: "User registered successfully" });
});

export { router as userRouter };
