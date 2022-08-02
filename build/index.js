"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use(express_1.default.json());
mongoose_1.default.connect("mongodb://localhost:27017/postsDB");
const postsSchema = new mongoose_1.default.Schema({
    title: { type: String },
    body: { type: String }
});
const Post = mongoose_1.default.model("Post", postsSchema);
app.get('/', (req, res) => {
    Post.find(function (err, posts) {
        if (!err) {
            res.send(posts);
        }
        else {
            res.send(err);
            console.log(err);
        }
    });
});
app.get('/posts/:title', (req, res) => {
    Post.findOne({ title: req.params.title }, (err, post) => {
        res.send(post);
    });
});
app.patch('/posts/:title', (req, res) => {
    console.log(req.body);
    Post.updateOne({ title: req.params.title }, { $set: req.body }, function (err) {
        if (!err) {
            res.send("Patch Success");
        }
        else {
            res.send("Wahala");
            console.log(err);
        }
    });
});
app.listen(4990, () => {
    console.log("PORT 4990");
});
