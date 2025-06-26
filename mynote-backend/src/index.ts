import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middleware";
import { NoteModel, UserModel } from "./db";

mongoose.connect(
    "mongodb+srv://apikshyashrestha:6AVfH3ooeC3zOGTA@cluster0.p2px6.mongodb.net/mynote"
  )
  .then(() => {
    console.log("MongoDB Connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    await UserModel.create({
      username: username,
      password: password,
    });

    res.json({
      message: "User signed up",
    });
  } catch (e) {
    res.status(409).json({
      message: "User already exist",
    });
  }
});

app.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const existingUser = await UserModel.findOne({
    username,
    password,
  });
  if (existingUser) {
    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      JWT_PASSWORD
    );

    res.json({
      token,
    });
  } else {
    res.status(401).json({
      message: "Incorrect Credentials",
    });
  }
});

app.post("/notes", userMiddleware, async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  await NoteModel.create({
    title: req.body.title,
    content: req.body.content,
    userId: req.userId,
  });

  res.json({
    message: "Note added",
  });
});

app.get("/notes", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const note = await NoteModel.find({
    userId: userId,
  }).populate("userId", "username");

  res.json({
    note,
  });
});

app.delete("/notes", userMiddleware, async (req, res) => {
  const noteId = req.body.noteId;
  const deleteResult = await NoteModel.deleteMany({
    _id: noteId,
    userId: req.userId,
  });
  console.log("Delete Result:", deleteResult); // Check deletedCount

  res.json({
    message: "content deleted",
  });
});

app.listen(3000);
