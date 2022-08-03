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
    body: {type: String},
    id:{type: Number}
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

app.get('/posts/:id', (req: Request, res: Response) => {
    console.log(req.params);
    
    Post.findOne({ id: Number(req.params.id) }, (err: any, post: any) => {
        res.send(post)
    })
})

app.patch('/posts/:id', (req: Request, res: Response) => {
    Post.updateOne(
        { id: req.params.id },
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