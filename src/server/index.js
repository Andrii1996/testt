import uuidv4 from "../helper/uuid";

import express from 'express';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const comments = [];

app.get('/comments', (req, res) => {

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(comments));
});

app.post('/comment', (req, res) => {
  const comment = req.body;
  const id = uuidv4();
  if(comment) {
    comments.push({...comment, id});
  }
  res.setHeader('Content-Type', 'application/json');
  res.sendStatus(200)
});


app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
