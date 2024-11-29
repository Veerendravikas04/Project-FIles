const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const port = 8083;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'company2',
    password: 'vikas_thanu',
});

let createRandomUser = () => {
    return {
        userId: faker.string.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
    };
};

console.log(createRandomUser());

app.get("/", (req, res) => {
    let q = 'SELECT * FROM employee';
    connection.query(q, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
        } else {
            console.log('Data fetched:', results);
            res.render("showtable", { employees: results });
        }
    });
});

let count = 0;

app.post("/update/:ssn", (req, res) => {
    let { ssn } = req.params;
    let q = 'SELECT * FROM employee WHERE ssn = ?';
    connection.query(q, [ssn], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Server Error');
        } else {
            if (results.length > 0) {
                let employee = results[0];
                res.render("updates", { employee: employee, k: false, count: count }); 
            } else {
                res.status(404).send('Employee not found');
            }
        }
    });
});

app.post("/update-salary/:ssn", (req, res) => {
    count++;
    let { ssn } = req.params;
    let { password } = req.body;
    let k = false;
    let q = 'SELECT * FROM employee WHERE ssn = ?';

    connection.query(q, [ssn], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Server Error');
        } else {
            if (results.length > 0) {
                let employee = results[0]; 
                if (password === employee.password) {
                    k = true;
                }
                res.render("updates", { employee: employee, k: k, count: count });
            } else {
                res.status(404).send('Employee not found');
            }
        }
    });
});

app.post('/salary-submited/:ssn', (req, res) => {
    let { ssn } = req.params;
    let { salary } = req.body;
    let q = 'UPDATE employee SET salary = ? WHERE ssn = ?';
    connection.query(q, [salary, ssn], (err, results) => {
        if (err) {
            console.error('Error updating data:', err);
            res.status(500).send('Server Error');
        } else {
            res.redirect("/");
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
