const express = require('express');
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const app = express();
const port = 8000;

app.use(express.json());


// Routes

app.get('/api/users', (req, res) => {
    return res.json(users);
});


app.route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        return res.json(user);
    })

    .patch((req, res) => {
        // Assignment: Implement PATCH
        const id  = Number(req.params.id);
        const body = req.body;
        const user  = users.find((user) => user.id === id);
        Object.assign(user,body);
        fs.writeFile("./MOCK_DATA.json",JSON.stringify(users), (err,data) => {
            return res.json({status: "Success"});
        })
    })

    .delete((req, res) => {
        // Assignment: Implement DELETE
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        if (!user) {
            return res.status(404).json({ status: "User not found" });
        }
        users.splice(users.indexOf(user), 1);
        fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data) =>{
            return res.json({ status: "Success" });
        })
        
    });


app.post("/api/users", (req, res) => {
    const body = req.body;

    users.push({ ...body, id: users.length + 1 });

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({ status: "success", id: users.length });
    });
});


app.get('/users', (req, res) => {
    const html = `
        <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>`;
        
    res.send(html);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});