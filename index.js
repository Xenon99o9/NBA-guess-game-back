const fs = require('fs');
const database = JSON.parse(fs.readFileSync('./db.json', 'utf8'));

const express = require('express');

const app = express();


const question = [ 'team', 'conference', 'position', 'country' , 'number', 'height_cm', 'weight_kg', 'age'];

app.get("/api", (req, res) => {
  return res.status(200).json({ database });
});

app.get ('/api/player/random', (req, res) => {
    const RandomID = getRandomInt(50)+1;
    const player = database.find(player => player.id == RandomID);
    const QuestionRandom = question[getRandomInt(question.length)];
    const playerName = player.name;
    const playerImage = player.image;
    let possibles = [player[QuestionRandom]]; 

    while (possibles.length < 3){
        let newRandom = getRandomInt(50)+1;
        let newPlayer = database.find(player => player.id == newRandom);
        if (!possibles.includes(newPlayer.QuestionRandom)){
            possibles.push(newPlayer[QuestionRandom]);
        }
    }
    shuffle(possibles)
    res.json({ id: RandomID, name: playerName, image: playerImage, question: QuestionRandom, possibles: possibles });
});


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}   


app.listen(3000, () => {
    console.log("serveur démarré sur localhost:3000");
});