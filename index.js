import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    res.render("index.ejs", { posts: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

app.post("/submit", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, req.body);
    console.log("CREATED POST:");
    console.log(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
  res.redirect("/");
});

app.post("/checkoff", async (req,res) => {
  for (const key of Object.keys(req.body)) {
    const deleteId = parseInt(key.slice(5));
    try {
      const response = await axios.delete(`${API_URL}/posts/${deleteId}`);
      console.log(response.data);
    } catch (error) {
      res.status(500).json({ message: "Error deleting post" });
    }
  }
  res.redirect("/");
})

async function deletePost(id) {
  await axios.delete(`${API_URL}/posts/${id}`);
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log("Go to http://localhost:3000/");
});
