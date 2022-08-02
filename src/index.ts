import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors';


const app: Application = express();

app.use(cors<Request>())


app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.json())

mongoose.connect("mongodb://localhost:27017/postsDB");

const postsSchema = new mongoose.Schema({
    title: {type: String},
    body: {type: String}
})


const Post = mongoose.model("Post", postsSchema);

app.get('/', (req: Request, res: Response) => {
    Post.find(function (err, posts) {
        if (!err) {
            res.send(posts)
        }
        else {
            res.send(err)
            console.log(err)
        }

    })
})

app.get('/posts/:title', (req: Request, res: Response) => {
    Post.findOne({ title: req.params.title }, (err: any, post: any) => {
        res.send(post)
    })
})

app.patch('/posts/:title', (req: Request, res: Response) => {
    console.log(req.body)
    Post.updateOne(
        { title: req.params.title },
        { $set: req.body },
        function (err: any) {
            if (!err) {
                res.send("Patch Success")
            }
            else {
                res.send("Wahala")
                console.log(err)
            }
        }
    )
})

app.listen(4990, (): void => {
    console.log("PORT 4990");
})