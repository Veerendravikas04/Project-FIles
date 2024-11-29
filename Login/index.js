const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql2");

const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'login',
    password: 'vikas_thanu',
});

app.get("/signup", (req, res) => {
    res.render("signup-page");
});

app.get("/login", (req, res) => {
    res.render("loginpage", { loginError: false });
});



app.post("/home-page", (req, res) => {
    let { email, password } = req.body;
    let checkQuery = 'SELECT email FROM details WHERE email = ?';
    
    connection.query(checkQuery, [email], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
        } else if (result.length === 0) {
            let insertQuery = 'INSERT INTO details (email, password) VALUES (?, ?)';
            connection.query(insertQuery, [email, password], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Server Error');
                } else {
                    res.render("homepage", { email });
                }
            });
        } else {
            res.render("signup-page", { email }); 
        }
    });
});





app.post("/login-page", (req, res) => {
    let { email, password } = req.body;
    let q = 'SELECT password FROM details WHERE email = ?';
    connection.query(q, [email], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
        } else {
            if (result.length > 0) {
                if (password === result[0].password) {
                    res.render("homepage", { email });
                } else {
                    res.render('loginpage', { loginError: 'Password is Incorrect' });
                }
            } else {
                res.render('loginpage', { loginError: 'Email not found' });
            }
        }
    });
});

app.get("/", (req, res) => {
    res.render("starting");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
