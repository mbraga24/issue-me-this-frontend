import React, { useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Image, Divider, Modal } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux';
import IssueForm from './IssueForm';
import CreateHighlight from './CreateHighlight';
import moment from 'moment';
import { UPDATE_COMMENT, DELETE_COMMENT, UPDATE_TITLE, UPDATE_BODY, DELETE_COMMENT_LIKE, ADD_COMMENT_LIKE, REMOVE_KEY_HOLDER_COMMENT_LIKE, ADD_KEY_HOLDER_COMMENT_LIKE } from '../store/type';
import '../resources/Comment.css';

const Comment = props => {

  const [ open, setOpen ] = useState(false)

  const currentUser = useSelector(state => state.user.keyHolder)
  const updateBody = useSelector(state => state.updateForm.updateBody)
  const allCommentLikes = useSelector(state => state.likeComment.commentLikes)

  const [ displayLikeStatus, setDislayLikeStatus ] = useState(false)
  const [ thumbsUpOrDown, setThumbsUpOrDown ] = useState(false)
  const [ commentLike, setCommentLike ] = useState({})

  const [ alertHeader, setAlertHeader ] = useState("")
  const [ alertStatus, setAlertStatus ] = useState(false)
  const [ message, setMessage ] = useState([])
  const [ commentLikes, setCommentLikes ] = useState([])
  const [ commentDislikes, setCommentDislikes ] = useState([])

  const dispatch = useDispatch()
  const { id, comment_body, syntax, user } = props.comment
  const { first_name, last_name, profession, avatar } = user
  const imgUrl = `https://semantic-ui.com/images/avatar/small/${avatar}.jpg`

  const totalCommentDislikes = useCallback(dataLikes => {
    return dataLikes.filter(like => like.is_like === false && like.comment_id === id)
  }, [id])

  const totalCommentLikes = useCallback(dataLikes => {
    return dataLikes.filter(like => like.is_like === true && like.comment_id === id)
  }, [id])
  
  useEffect(() => {
    const commentFound = currentUser && currentUser.like_comments.find(c => c.comment_id === id)
    setDislayLikeStatus(!!commentFound)
    setCommentLike(commentFound)
    setThumbsUpOrDown(commentLike && commentLike.is_like ? true : false)

  }, [commentLike, currentUser, id])

  useEffect(() => {
    setCommentLikes(totalCommentLikes(allCommentLikes))
    setCommentDislikes(totalCommentDislikes(allCommentLikes))
  }, [allCommentLikes, totalCommentLikes, totalCommentDislikes]) 

  const deleteComment = () => {
    fetch(`http://localhost:3000/comments/${props.comment.id}`, {
      method: 'DELETE'
    })
    .then(r => r.json())
    .then(data => {
      dispatch({ type: DELETE_COMMENT, payload: data.comment })
      dispatch({ type: UPDATE_COMMENT, payload: data.comment })
    })
  }

  const updateComment = () => {
    const data = {
      comment_body: updateBody
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

  const unlike = () => {
    fetch(`http://localhost:3000/like_comments/${commentLike.id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(data => {
      dispatch({ type: REMOVE_KEY_HOLDER_COMMENT_LIKE, payload: data.like })
      dispatch({ type: UPDATE_COMMENT, payload: data.comment })
      dispatch({ type: DELETE_COMMENT_LIKE, payload: data.like })
    })
  }

  const likeBtn = () => {
    fetch(`http://localhost:3000/like_comments`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({ user_id: currentUser.id, comment_id: id, like_status: true })
    })
    .then(r => r.json())
    .then(data => {
      console.log("LIKE ->", data)
      dispatch({ type: ADD_KEY_HOLDER_COMMENT_LIKE, payload: data.like })
      dispatch({ type: UPDATE_COMMENT, payload: data.comment })
      dispatch({ type: ADD_COMMENT_LIKE, payload: data.like })
    })
  }

  const dislikeBtn = () => {
    fetch(`http://localhost:3000/like_comments`, {
      method: "POST",
      headers: {
        'Content-Type': "Application/json"
      },
      body: JSON.stringify({ user_id: currentUser.id, comment_id: id, like_status: false })
    })
    .then(r => r.json())
    .then(data => {
      dispatch({ type: ADD_KEY_HOLDER_COMMENT_LIKE, payload: data.like })
      dispatch({ type: UPDATE_COMMENT, payload: data.comment })
      dispatch({ type: ADD_COMMENT_LIKE, payload: data.like })
    })
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

  // console.log(props.comment)

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
        <Card.Content extra className="Issue-Item-Extra">
            { 
              currentUser && displayLikeStatus ? 
              <Button circular color={thumbsUpOrDown ? "blue" : "grey"} icon={thumbsUpOrDown ? "thumbs up" : "thumbs down"} onClick={unlike} size="large" />
              :
              (currentUser && currentUser.id !== user.id) && 
              <React.Fragment>
                <Button circular color="teal" icon='thumbs up outline' size="large" onClick={likeBtn} />
                <Button circular color="teal" icon='thumbs down outline' size="large" onClick={dislikeBtn} />
              </React.Fragment>
            }
          </Card.Content>
        {
          currentUser && currentUser.id === user.id &&
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