import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];
let lastId = 0;

app.get("/", (req, res) => {
  res.render("index.ejs", {data: posts});
});

app.post("/submit", (req, res) => {
  posts.push({
      tskId: lastId,
      tskTitle: req.body["taskTitle"],
      tskDesc: req.body["taskDesc"],
  });
  lastId += 1;
  res.redirect("/");
});

app.post("/checkoff", (req,res) => {
  Object.keys(req.body).forEach((key) => {
    const deleteId = parseInt(key.slice(5));
    const deleteIndex = posts.findIndex((post) => post.tskId === deleteId);
    posts.splice(deleteIndex, 1);
  });
  res.redirect("/");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log("Go to http://localhost:3000/");
  });