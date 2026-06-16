const express = require('express');

const app = express();

const users = [
{id:0, name:"Alice", pass:"azerty"},
{id:1, name:"Bob", pass:"querty"},
{id:2, name:"Charlie", pass:"quertz"}
];

app.get('/hello', (req,res) => {
    res.send("hello world");
});

app.get('/users', (req, res) => {
    res.json(users)
})

app.listen(3000, () => {
    console.log("serveur démarré sur localhost:3000");
});