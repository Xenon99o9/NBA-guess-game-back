const fs = require('fs');
const database = JSON.parse(fs.readFileSync('./db.json', 'utf8'));

const express = require('express');

const app = express();
app.use(express.json());

const question = [ 'team', 'conference', 'position', 'country' , 'number', 'height_cm', 'weight_kg', 'age'];

app.get("/api", (req, res) => {
  if (!database) {
    return res.status(404).json({ status: "Database not found" });
  }
  return res.status(200).json({status : "OK", database });
});

app.get('/api/player/random', (req, res) => {
    if (!database) {
        return res.status(404).json({ status: "Database not found" });
    }
    const RandomID = getRandomInt(50)+1;
    const player = database.find(player => player.id == RandomID);
    const QuestionRandom = question[getRandomInt(question.length)];
    const playerName = player.name;
    const playerImage = player.image;
    let possibles = [player[QuestionRandom]]; 
    let cmpt = 0;
    while (possibles.length < 3 && cmpt < 5){
        cmpt++
        let newRandom = getRandomInt(50)+1;
        let newPlayer = database.find(player => player.id == newRandom);
        if (!possibles.includes(newPlayer[QuestionRandom])){
            possibles.push(newPlayer[QuestionRandom]);
        }
    }
    shuffle(possibles)
    res.status(200).json({ status : "OK", id: RandomID, name: playerName, image: playerImage, question: QuestionRandom, possibles: possibles });
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


app.post('/api/player/check', (req, res) => {
    if (!database) {
        return res.status(404).json({ status: "Database not found" });
    }

    const { playerId, question: questionKey, answer } = req.body;

    if (!playerId || !questionKey || typeof answer === 'undefined') {
        return res.status(400).json({ status: "Missing parameters", required: ["playerId", "question", "answer"] });
    }

    const player = database.find(player => player.id == playerId);
    if (!player) {
        return res.status(404).json({ status: "Player not found" });
    }

    const expected = player[questionKey];
    if (typeof expected === 'undefined') {
        return res.status(400).json({ status: "Invalid question field" });
    }

    let correct = false;
    if (expected == answer) {
        correct = true;
    }

    res.status(200).json({
        status: "OK",
        correct,
        expected
    });
});


app.listen(3000, () => {
    console.log("serveur démarré sur localhost:3000");
});