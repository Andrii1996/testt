export async function setComment(comment) {
  const response = await fetch(`/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(comment)
  });
  
  if (!response.ok) throw new Error('did not save comment');
}

export async function getComments() {
  let resp = await fetch(`/comments`)

  if (!resp.ok) {
    throw new Error('did not get all comments');
  }

  return resp.json();
}