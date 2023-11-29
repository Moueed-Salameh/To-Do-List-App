import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

let posts = [];
let lastId = 0;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/posts", (req, res) => {
    res.json(posts);
});

app.post("/posts", (req, res) => {
    posts.push({
        tskId: lastId,
        tskTitle: req.body["taskTitle"],
        tskDesc: req.body["taskDesc"],
    });
    lastId += 1;
    res.status(201).json(posts.slice(-1));
});

app.delete("/posts/:id", (req, res) => {
    const index = posts.findIndex((p) => p.tskId === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Post not found" });
  
    posts.splice(index, 1);
    res.json({ message: "Post deleted" });
});

app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
});
