import uuidv4 from "./src/helper/uuid";

import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
const app = express();

const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let comments = [];

app.get('/comments', cors(), (req, res) => {

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(comments));
});

app.post('/comment', cors(), (req, res) => {
  const comment = req.body;
  const id = uuidv4();
  if(comment) {
    comments.push({...comment, id});
  }
  res.setHeader('Content-Type', 'application/json');
  res.sendStatus(200)
});

app.delete('/:id', cors(), (req, res) => {
  const id = req.params.id;
  if (id) {
    comments = comments.filter(comment => {
      return comment.id !== id;
    });
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(comments));
});


app.listen(PORT, () =>
  console.log('Express server is running on localhost:3001')
);
