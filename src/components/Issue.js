import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Icon, Button, Card, Image, Divider, Modal } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom';
import { DELETE_ISSUE, UPDATE_ISSUE, UPDATE_TITLE, UPDATE_BODY, REMOVE_KEY_HOLDER_LIKE, ADD_KEY_HOLDER_LIKE, ADD_KEY_HOLDER_FAVORITE, REMOVE_KEY_HOLDER_FAVORITE } from '../store/type';
import IssueForm from './IssueForm';
import CreateHighlight from './CreateHighlight';
import '../resources/Issue.css';

const Issue = props => {
  
  const dispatch = useDispatch() 
  const [ open, setOpen ] = useState(false)
  const [ displayLikeStatus, setDislayLikeStatus ] = useState(false)
  const [ thumbsUpOrDown, setThumbsUpOrDown ] = useState(false)
  const [ issueLike, setIssueLike ] = useState({})
  const [ issueFavorite, setIssueFavorite ] = useState({})
  const [ favoriteStatus, setFavoriteStatus ] = useState(false)

  const [ alertHeader, setAlertHeader ] = useState("")
  const [ alertStatus, setAlertStatus ] = useState(false)
  const [ message, setMessage ] = useState([])

  const currentUser = useSelector(state => state.user.keyHolder)
  const updateTitle = useSelector(state => state.updateForm.updateTitle)
  const updateBody = useSelector(state => state.updateForm.updateBody)
  // const updateSyntax = useSelector(state => state.updateForm.updateSyntax)

  const { id, title, comments, issue_body, syntax, user } = props.issue
  const totalComments = comments.length
  const imgUrl = `https://semantic-ui.com/images/avatar/small/${user.avatar}.jpg`


  useEffect(() => {
    const issueFound = currentUser && currentUser.like_issues.find(issue => issue.issue_id === id)
    const favoriteFound = currentUser && currentUser.favorites.find(issue => issue.issue_id === id)

    setDislayLikeStatus(!!issueFound)
    setIssueLike(issueFound)
    setFavoriteStatus(!!favoriteFound)
    setIssueFavorite(favoriteFound)
    setThumbsUpOrDown(issueLike && issueLike.is_like ? true : false)
    
  }, [currentUser, issueLike, id, setIssueFavorite])

  const deleteIssue = () => {
    fetch(`http://localhost:3000/issues/${id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(issue => {
      dispatch({ type: DELETE_ISSUE, payload: issue })
      props.match.path === "/issues/:id" && props.history.push('/issues')
    })
  }

  const updateIssue = () => {
    const data = {
      title: updateTitle,
      issue_body: updateBody
      // syntax: updateSyntax
    }
    
    fetch(`http://localhost:3000/issues/${id}`, {
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
        dispatch({ type: UPDATE_ISSUE , payload: data.issue })
        setOpen(false)
      }
    })  
    dispatch({ type: UPDATE_TITLE , payload: "" })
    dispatch({ type: UPDATE_BODY , payload: "" })
  }

  const unlike = () => {
    fetch(`http://localhost:3000/like_issues/${issueLike.id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(data => {
      dispatch({ type: REMOVE_KEY_HOLDER_LIKE, payload: data.like })
      dispatch({ type: UPDATE_ISSUE, payload: data.issue })
    })
  }

  const likeBtn = () => {
    fetch(`http://localhost:3000/like_issues`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({ user_id: currentUser.id, issue_id: id, like_status: true })
    })
    .then(r => r.json())
    .then(data => {
      dispatch({ type: ADD_KEY_HOLDER_LIKE, payload: data.like })
      dispatch({ type: UPDATE_ISSUE, payload: data.issue })
    })
  }

  const dislikeBtn = () => {
    fetch(`http://localhost:3000/like_issues`, {
      method: "POST",
      headers: {
        'Content-Type': "Application/json"
      },
      body: JSON.stringify({ user_id: currentUser.id, issue_id: id, like_status: false })
    })
    .then(r => r.json())
    .then(data => {
      dispatch({ type: ADD_KEY_HOLDER_LIKE, payload: data.like })
      dispatch({ type: UPDATE_ISSUE, payload: data.issue })
    })
  }

  const favoriteBtn = () => {
    
    if (!issueFavorite) {
      fetch(`http://localhost:3000/favorites`, {
        method: "POST",
        headers: {
          'Content-Type': "Application/json"
        },
        body: JSON.stringify({ user_id: currentUser.id, issue_id: id })
      })
      .then(r => r.json())
      .then(data => {
        dispatch({ type: ADD_KEY_HOLDER_FAVORITE, payload: data.favorite })
        dispatch({ type: UPDATE_ISSUE, payload: data.issue })
      })
    } else {
      fetch(`http://localhost:3000/favorites/${issueFavorite.id}`, {
        method: "DELETE"
      })
      .then(r => r.json())
      .then(data => {
        dispatch({ type: REMOVE_KEY_HOLDER_FAVORITE, payload: data.favorite })
        dispatch({ type: UPDATE_ISSUE, payload: data.issue })
      })
    }
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
      <Grid.Row>
        <Grid.Column className="Issue-Inner-Wrap" width={12}>
            <Card fluid raised>
              <Card.Content className="Issue-Content">
                <Card.Meta className="Issue-Item-Wrapper">
                  <Card.Meta className="Issue-Icon-Title">
                    <Link to={`/issues/${id}`}>
                      {title}
                    </Link>
                  </Card.Meta>
                  <Card.Meta className="Issue-Icon-Avatar" textAlign='right'>
                    <Image
                      as={Link}
                      to={`/account/${user.id}`}
                      className="Image"
                      size='big'
                      avatar
                      alt={`${user.first_name} ${user.last_name}`}
                      src={imgUrl}
                    />
                  </Card.Meta>
                </Card.Meta>
                { props.displayBody &&
                  <Card.Description className="ShowIssue-Issue-Body">
                    {
                      <CreateHighlight dataString={issue_body} syntax={syntax} />
                    }
                  </Card.Description>
                }
                <Divider clearing />
                <Card.Meta className="Issue-Item-Wrapper">
                  <Card.Meta className="Issue-Item-Extra">
                    <Icon name='comment alternate' size="large" />
                    <span className="Issue-Comment">{totalComments} Comments</span>
                  </Card.Meta>
                  <Card.Content extra className="Issue-Item-Extra">
                    { 
                      currentUser && displayLikeStatus ? 
                      <Button circular color={thumbsUpOrDown ? "blue" : "grey"} icon={ thumbsUpOrDown ? "thumbs up" : "thumbs down"} size="large" onClick={unlike} />
                      :
                      (currentUser && currentUser.id !== user.id) && 
                      <React.Fragment>
                          <Button circular color="teal" icon='thumbs up outline' size="large" onClick={likeBtn} />
                          <Button circular color="teal" icon='thumbs down outline' size="large" onClick={dislikeBtn} />
                        </React.Fragment>
                    }
                    {
                      (currentUser && currentUser.id !== user.id) && 
                        <Button circular color={favoriteStatus ? "olive" : "teal"} icon={favoriteStatus ? "star" : "star outline"} size="large" onClick={favoriteBtn} />
                    }
                  </Card.Content>
                </Card.Meta>
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
                      <Modal.Header>Update Issue</Modal.Header>
                      <Modal.Content>
                        <IssueForm 
                          displayContent={false} 
                          isUpdateForm={true} 
                          dataTitle={title} 
                          dataBody={issue_body} 
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
                        <Button onClick={updateIssue} positive>Update</Button>
                      </Modal.Actions>
                    </Modal>
                    <Button inverted color='red' onClick={deleteIssue}>
                      Delete
                    </Button>
                  </div>
                </Card.Content>
              }
            </Card>
        </Grid.Column>
      </Grid.Row>
  );
} 

export default withRouter(Issue);