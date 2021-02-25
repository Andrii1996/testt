import React, { useEffect, useState } from "react";
import { getComments, setComment as saveComment } from "./api/getComment";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Card, ListGroup } from 'react-bootstrap';

export function App() {

const [name, setName] = useState('');
const [comment, setComment] = useState('');
const [comments, setComments] = useState([]);

  async function getAllComments() {
    const data = await getComments();

    if (!data) return;
    setComments(data);
  }

  useEffect(() => {
    getAllComments();
  }, []);


  const handleChangeName = (event) => {
    setName(event.target.value);
  }

  const handleChangeComment = (event) => {
    setComment(event.target.value);
  }

  const handleSubmitComment = event => {
    event.preventDefault();

    try {
      saveComment({comment, name});
    } catch(e) {
      console.error(e)
    }

    if (name.length < 1) {
      return;
    }

    getAllComments()

    setComment('');
  }

  return (
    <div
      className="App"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      <Form style={{width: '450px'}} onSubmit={handleSubmitComment}>
        <Form.Control
          style={{margin: '20px 0'}}
          id="name"
          type="text"
          value={name}
          placeholder='Enter your name:'
          onChange={handleChangeName}
          required
        />
        <Form.Control
          id="comment"
          type="text"
          value={comment}
          placeholder='Enter your message:'
          onChange={handleChangeComment}
          required
        />
        <Button
          size="lg"
          type="submit"
          style={{
            width: '300px',
            margin: '10px'
          }}
        >
          Send
        </Button>
      </Form>
      <Card style={{width: '30rem'}}>
        <ListGroup style={{
          display: 'flex',
          flexDirection: 'column-reverse'
        }}>
          {comments.map(el => (
            <ListGroup.Item key={el.id}>{`${el.name} : ${el.comment}`}</ListGroup.Item>
          ))}
        </ListGroup >
      </Card>
    </div>
  );
}