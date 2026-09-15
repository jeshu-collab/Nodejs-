const http = require("http");
const express = require("express");

const app = express();
app.get('/', (req, res) => {
    return res.send("Hello World");
});

app.get('/about', (req, res) => {
    return res.send(`Hello, ${req.query.k} you are ${req.query.age} years old`);
});

app.listen(8000, () => console.log("Server is running on port 8000"));


/*const myServer = http.createServer(app);

myServer.listen(8000, () => {
    console.log("Server is running on port 8000");
})*/