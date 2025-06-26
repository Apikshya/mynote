"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const db_1 = require("./db");
mongoose_1.default.connect("mongodb+srv://apikshyashrestha:6AVfH3ooeC3zOGTA@cluster0.p2px6.mongodb.net/mynote")
    .then(() => {
    console.log("MongoDB Connected successfully");
})
    .catch((err) => {
    console.error("MongoDB connection error:", err);
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        yield db_1.UserModel.create({
            username: username,
            password: password,
        });
        res.json({
            message: "User signed up",
        });
    }
    catch (e) {
        res.status(409).json({
            message: "User already exist",
        });
    }
}));
app.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = yield db_1.UserModel.findOne({
        username,
        password,
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id,
        }, config_1.JWT_PASSWORD);
        res.json({
            token,
        });
    }
    else {
        res.status(401).json({
            message: "Incorrect Credentials",
        });
    }
}));
app.post("/notes", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const content = req.body.content;
    yield db_1.NoteModel.create({
        title: req.body.title,
        content: req.body.content,
        userId: req.userId,
    });
    res.json({
        message: "Note added",
    });
}));
app.get("/notes", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const note = yield db_1.NoteModel.find({
        userId: userId,
    }).populate("userId", "username");
    res.json({
        note,
    });
}));
app.delete("/notes", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const noteId = req.body.noteId;
    const deleteResult = yield db_1.NoteModel.deleteMany({
        _id: noteId,
        userId: req.userId,
    });
    console.log("Delete Result:", deleteResult); // Check deletedCount
    res.json({
        message: "content deleted",
    });
}));
app.listen(3000);
