const express = require("express");
const path = require("path");
const app = express();
const port = 3006;

// Middleware that parses incoming requests with URL-encoded payloads (e.g., form data submitted via POST requests)
// and makes the data available under req.body. The 'extended: true' option allows for rich objects and arrays to be encoded.
app.use(express.urlencoded({ extended: true }));

// Sets EJS (Embedded JavaScript) as the templating engine for rendering views. 
// This allows you to create .ejs files in your views directory that will be rendered when a route is accessed.
app.set("view engine", "ejs");

// Sets the directory where your EJS view files are located.
// The 'path.join(__dirname, "Views")' constructs an absolute path to the "Views" folder,
// ensuring that the views can be found regardless of where the script is executed.
app.set("views", path.join(__dirname, "Views"));

// Serves static files, such as images, CSS files, and JavaScript files, from the "Public" directory.
// The 'express.static' middleware allows you to define a folder for serving these files, making them accessible from the root of your application.
app.use(express.static(path.join(__dirname, "Public")));

// Array to store posts with username and content
let k = 0;
let posts = [
    { id: k++, username: "Vikas", content: "I love coding!" },
    { id: k++, username: "Veerendra", content: "I love development!" },
    { id: k++, username: "Ramakrishna", content: "I love both coding & development!" },
];

// Route to render the 'index.ejs' template with the 'posts' data.
app.get("/posts", (req, res) => {
    res.render("index", { posts });
});

// Route to render the 'new.ejs' template.
app.get("/posts/new", (req, res) => {
    res.render("new");
});

// Route to render the 'postdetail.ejs' template for fetching a specific post.
app.get("/posts/get", (req, res) => {
    res.render("postdetail");
});

// Route to handle form submission for creating a new post.
// Extracts 'username' and 'content' from the request body and adds the new post to the 'posts' array.
app.post("/posts", (req, res) => {
    console.log(req.body);
    let { username, content } = req.body; // Corrected variable name from 'usename' to 'username'
    posts.push({ id: k++, username, content });
    res.redirect("/posts"); // Redirects back to the posts page after submission
});

// Route to handle fetching a specific post by ID.
// Extracts the post ID from the request body, finds the corresponding post, and renders the 'postdetail' view with the post data.
// If no post is found, it renders the 'postdetail' view with an error message.
app.post("/posts/get", (req, res) => {
    const postId = parseInt(req.body.number);
    const post = posts.find(p => p.id === postId);
    if (post) {
        res.render("postdetail", { post });
    } else {
        res.render("postdetail", { error: "Post not found" });
    }
});


// Route to handle form submission for deleting a post.
// Removes the most recent post from the 'posts' array.
app.post("/posts/delete", (req, res) => {
    if (posts.length > 0) {
        posts.pop(); 
        k--;
    }
    res.redirect("/posts"); // Redirect back to the posts page
});

// Starts the server and listens on the specified port.
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
