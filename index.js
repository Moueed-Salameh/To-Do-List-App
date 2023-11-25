import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", (req, res) => {
  res.render("index.ejs", {data: posts});
});

app.post("/submit", (req, res) => {
    posts.push({
        tskTitle: req.body["taskTitle"],
        tskDesc: req.body["taskDesc"],
    });
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log("Go to http://localhost:3000/");
  });