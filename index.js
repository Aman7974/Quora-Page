const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({ extented: true }));
app.use(methodOverride("_method"));

app.get("/posts", (req,res) => {
   res.render("index.ejs", { posts }) ;
});

// Index Route
app.get ("/posts/new", (req,res) => {
    res.render("new.ejs");
})

// Create/new Route
app.post("/posts", (req,res) => {
    let { username, content } = (req.body);
    let id = uuidv4();
    posts.push({ id,username,content });
   res.redirect("/posts");
})

// Show/View Route
app.post("/posts/:id", (req,res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
});

// update/edit route
app.patch("/posts/:id", (req,res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req,res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});

// Delete/Destroy Route
app.delete("/posts/:id", (req,res) => {
    let { id } = req.params;
     posts = posts.filter((p) => id !== p.id);
     res.redirect("/posts");
})


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
 
app.use(express.static(path.join(__dirname, "public")));

// We dont have database , we use array as our data storage
let posts = [
    {
        id: uuidv4(),
        username: "apnacollege",
        content: "I love coding",
    },
    {
        id: uuidv4(),
        username: "amanpachouri",
        content: "Hard work is important to achieve success",
    },
    {
        id: uuidv4(),
        username: "arpitpachouri",
        content: "I got selected for my 1st internship!",
    },
];

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});