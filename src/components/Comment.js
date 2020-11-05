import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Image, Divider, Modal } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux';
import IssueForm from './IssueForm';
import CreateHighlight from './CreateHighlight';
import moment from 'moment';
import { UPDATE_COMMENT, DELETE_COMMENT, UPDATE_ISSUE, UPDATE_TITLE, UPDATE_BODY } from '../store/type';
import '../resources/Comment.css';

const Comment = props => {

  const [ open, setOpen ] = useState(false)

  const currentUser = useSelector(state => state.user.keyHolder)
  const updateBody = useSelector(state => state.updateForm.updateBody)
  // const updateSyntax = useSelector(state => state.updateForm.updateSyntax)

  const [ alertHeader, setAlertHeader ] = useState("")
  const [ alertStatus, setAlertStatus ] = useState(false)
  const [ message, setMessage ] = useState([])

  const dispatch = useDispatch()
  const { comment_body, syntax } = props.comment
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


  const updateComment = () => {
    const data = {
      comment_body: updateBody
      // syntax: updateSyntax
    }
    
    fetch(`http://localhost:3000/comments/${props.comment.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(r => r.json())
    .then(data => {
      if (data.errorStatus) {
        handleMessages(data)
      } else {
        dispatch({ type: UPDATE_COMMENT , payload: data.comment })
        setOpen(false)
      }
    })  
    dispatch({ type: UPDATE_TITLE , payload: "" })
    dispatch({ type: UPDATE_BODY , payload: "" })
  }

  const handleMessages = data => {
    setAlertHeader(data.header)
    setAlertStatus(true)
    handleDismissCountDown()
    setMessage(data.error)
  }

  const renderAlertMessage = () => {
    return message.map(message => <li className="content">{message}</li> )
  }

  const handleDismissOnClick = () => {
    setAlertStatus(false)
  }

  const handleDismissCountDown = () => {
    setTimeout(() => {
      setAlertStatus(false)
    }, 4000)
  }

  return (
    <Card.Group id="Comment">
      <Card fluid>
        <Card.Content>
          <Link to={`/account/${id}`}>
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
          <Card.Description id="some-id">
            <CreateHighlight dataString={comment_body} syntax={syntax} />
          </Card.Description>
        </Card.Content>
        {
          currentUser && currentUser.id === id &&
          <Card.Content extra>
            <div className='ui two buttons'>
              <Modal
                  onClose={() => setOpen(false)}
                  onOpen={() => setOpen(true)}
                  open={open}
                  trigger={<Button inverted color='green'> Edit </Button>}
                >
                  <Modal.Header>Update Comment</Modal.Header>
                  <Modal.Content>
                    <IssueForm 
                      displayContent={false} 
                      isUpdateForm={true} 
                      dataBody={comment_body} 
                      dataSyntax={syntax} 
                    />
                    {
                      (alertStatus && !!message) && 
                        <div className="ui negative message">
                          <i className="close icon" onClick={handleDismissOnClick}></i>
                          <div className="header">
                            {alertHeader}
                          </div>
                          <ul className="list">
                            {message.length !== 0 ? renderAlertMessage() : null}
                          </ul>
                        </div>
                    }
                  </Modal.Content>
                  <Modal.Actions>
                    <Button onClick={() => setOpen(false)} color='teal'>Cancel</Button>
                    <Button onClick={updateComment} positive>Update</Button>
                  </Modal.Actions>
                </Modal>
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