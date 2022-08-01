import express, {Application, Request, Response} from "express";
import axios from "axios";



let cors = require('cors')

const app:Application = express();




app.use(cors())

app.get("/", async (req : Request, res: Response) =>{
 await axios.get("https://jsonplaceholder.typicode.com/posts")
.then(response => res.send((response.data)))
})


app.get("/post/:id", async (req : Request, res: Response) =>{
const id = req.params.id
const reqBody = req.body





 await axios.get("https://jsonplaceholder.typicode.com/posts/" + id)
.then(response => res.send((response.data)))



//  await axios.put("https://jsonplaceholder.typicode.com/posts/" + id)
// .then(response => res.send(console.log(reqBody)))






})
 



app.listen("4678", () : void=>{
    console.log("SERVER ON 4678");
    
})