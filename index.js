const fs = require('fs');
const rawData = fs.readFileSync('./db.json', 'utf8');

const express = require('express');

const app = express();

/* const users = [
{id:0, name:"Alice", pass:"azerty"},
{id:1, name:"Bob", pass:"querty"},
{id:2, name:"Charlie", pass:"quertz"}
];

app.get('/hello', (req,res) => {
    res.send("hello world");
});

app.get('/users', (req, res) => {
    res.json(users)
}) */

const question = [ 'team', 'conference', 'position', 'country' , 'number', 'height_cm', 'weight_kg', 'age'];


app.get ('/api/player/random'), (req, res) => {
    const RandomID = getRandomInt(50)+1;
    const player = database.find(player => player.id == RandomID);
    const QuestionRandom = question[getRandomInt(question.length)];
    const playerName = player.name;
    const playerImage = player.image;
    let possibles = [player.QuestionRandom]; 

    while (possibles.length < 3){
        let newRandom = getRandomInt(50)+1;
        let newPlayer = database.find(player => player.id == newRandom);
        if (!possibles.includes(newPlayer.QuestionRandom)){
            possibles.push(newPlayer.QuestionRandom);
        }
    }
    res.json({ id: RandomID, name: playerName, image: playerImage, question: QuestionRandom, possibles: possibles });
}


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

console.log(getRandomInt(3));
// Expected output: 0, 1 or 2

console.log(getRandomInt(1));
// Expected output: 0

console.log(Math.random());
// Expected output: a number from 0 to <1

app.listen(3000, () => {
    console.log("serveur démarré sur localhost:3000");
});