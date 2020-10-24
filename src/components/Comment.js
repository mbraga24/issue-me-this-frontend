import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Button, Card, Image, Divider } from 'semantic-ui-react'
import { DELETE_COMMENT, UPDATE_ISSUE } from '../store/type';
import { Link } from 'react-router-dom';
import { Highlight } from 'react-fast-highlight';
import '../resources/Comment.css';

const Comment = props => {

  const currentUser = useSelector(state => state.user.keyHolder)
  const dispatch = useDispatch()
  const { comment_body, code_body, syntax } = props.comment
  const { id, first_name, last_name, profession, avatar } = props.comment.user
  const imgUrl = `https://semantic-ui.com/images/avatar/small/${avatar}.jpg`

  const deleteComment = () => {
    fetch(`http://localhost:3000/comments/${props.comment.id}`, {
      method: 'DELETE'
    })
    .then(r => r.json())
    .then(data => {
      dispatch({ type: DELETE_COMMENT, payload: data.comment })
      dispatch({ type: UPDATE_ISSUE, payload: data.issue })
    })
  }

  return (
    <Card.Group id="Comment">
      <Card fluid>
        <Card.Content>
          <Link to={`/users/${id}`}>
            <Image
              floated='left'
              avatar
              size='big'
              alt={`${first_name} ${profession}`}
              src={imgUrl}
            />
          </Link>
          <Link to={`/users/${id}`}> 
            <Card.Header>{first_name} {last_name} - {profession}</Card.Header>
          </Link>
          <Card.Meta>
            Answered {moment().startOf('day').fromNow()}
          </Card.Meta>
          <Divider clearing />
          <Card.Description>
            {comment_body}
            <Highlight languages={[`${syntax ? syntax : "plaintext"}`]}>
            {code_body}
            </Highlight>
          </Card.Description>
        </Card.Content>
        {
          currentUser && currentUser.id === id &&
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button as={Link} to={'/home'} basic color='green'>
                Edit
              </Button>
              <Button basic color='red' onClick={deleteComment}>
                Delete
              </Button>
            </div>
          </Card.Content>
        }
      </Card>
    </Card.Group>
  )
}

export default Comment;