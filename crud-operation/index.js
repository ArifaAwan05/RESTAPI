const express = require('express');
const app = express();
let port =3000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method')); // override with POST having ?_method=DELETE

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname,"public")));

//to store posts data , i have created an array
let posts = [
    {
        id: uuidv4(),
        username: "Arifa",
        content: "Is learning web development worth it?"
    },
    {
         id: uuidv4(),
        username: "Noshi",
        content: "What are the most effective study techniques?"
    },
    {
        id: uuidv4(),
        username: "Asifa",
        content: "As a teacher, what is the harshest truth a student has ever taught you?"
    }
];

app.get("/posts",(req,res)=>{
   //res.send("Server working fine")
   res.render("index.ejs", {posts})
});

//form will show on this riute
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
//after submitting post, form will send request on this path
app.post("/posts", (req, res)=>{
    let { username, content } = req.body;
    posts.push({username,content})
    // console.log(req.body);
    // res.send("request working")
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    console.log(id);
    let post= posts.find((p) => id === p.id);
    console.log(post);
    // res.send("posts is working")
    res.render("show.ejs", {post})
});


app.patch("/posts/:id", (req,res)=> {
    let {id} = req.params;
   let newContent = req.body.content;
   let post= posts.find((p) => id === p.id);
   post.content = newContent;
    console.log(post);
    // res.send("PATCH request working")
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res) => {
    let {id} = req.params;
    let post= posts.find((p) => id === p.id);
    res.render("edit.ejs", {post})

});

app.delete("/posts/:id",(req,res) => {
    let {id} = req.params;
   posts = posts.filter((p) => id !== p.id);
    // res.send("delete success");
    res.redirect("/posts");
})

app.listen(port, ()=>{
    console.log(`app is listenting to port ${port}`);
});