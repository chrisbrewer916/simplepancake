const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());

const games = [
  {
    id: 1, name: 'Checkers', rating: 0, plays: 10,
  },
  {
    id: 2, name: 'Chess', rating: 1, plays: 5,
  },
];

app.get('/api/games', (req, res) => {
  const metadata = { total_count: games.length };
  res.json({ _metadata: metadata, records: games });
});

app.post('/api/games', (req, res) => {
  const newGame = req.body;
  newGame.id = games.length + 1;
  if (!newGame.rating) {
    newGame.rating = 0;
  }
  newGame.plays = 0;
  games.push(newGame);
  res.json(newGame);
});

app.listen(3000, function() {
  console.log('App started on port 3000');
});
