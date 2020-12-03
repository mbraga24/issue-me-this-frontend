import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Icon, Button, Card, Image, Divider, Modal, Header, Popup } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom';
import { UPDATE_ISSUE_INDEX, DELETE_ISSUE_INDEX, DELETE_ISSUE, UPDATE_ISSUE, UPDATE_TITLE, UPDATE_BODY, REMOVE_KEY_HOLDER_ISSUE_LIKE, ADD_KEY_HOLDER_ISSUE_LIKE, ADD_KEY_HOLDER_FAVORITE, REMOVE_KEY_HOLDER_FAVORITE, ADD_ISSUE_LIKE, DELETE_ISSUE_LIKE } from '../store/type';
import IssueForm from './IssueForm';
import CreateHighlight from './CreateHighlight';
import '../resources/Issue.css';

const Issue = props => {
  
  const dispatch = useDispatch() 
  const [ openEdit, setOpenEdit ] = useState(false)
  const [ openDelete, setOpenDelete] = React.useState(false)
  const [ displayLikeStatus, setDislayLikeStatus ] = useState(false)
  const [ thumbsUpOrDown, setThumbsUpOrDown ] = useState(false)
  const [ issueLike, setIssueLike ] = useState({})
  const [ issueFavorite, setIssueFavorite ] = useState({})
  const [ issueDislikes, setIssueDislikes ] = useState([])
  const [ issueLikes, setIssueLikes ] = useState([])

  const [ favoriteStatus, setFavoriteStatus ] = useState(false)
  const [ hasComment, setHasComment ] = useState(false)
  const popupWrapper = {
    borderRadius: 0,
    opacity: 0.8,
    padding: '1.2em',
  }

  const [ alertHeader, setAlertHeader ] = useState("")
  const [ alertStatus, setAlertStatus ] = useState(false)
  const [ message, setMessage ] = useState([])

  const currentUser = useSelector(state => state.user.keyHolder)
  const allIssueLikes = useSelector(state => state.likeIssue.issueLikes)

  const updateTitle = useSelector(state => state.updateForm.updateTitle)
  const updateBody = useSelector(state => state.updateForm.updateBody)

  const { id, title, comments, issue_body, syntax, user } = props.issue
  const totalComments = comments.length
  
  const totalIssueDislikes = useCallback(dataLikes => {
    return dataLikes.filter(like => like.is_like === false && like.issue_id === id)
  }, [id])

  const totalIssueLikes = useCallback(dataLikes => {
    return dataLikes.filter(like => like.is_like === true && like.issue_id === id)
  }, [id])

  useEffect(() => {
    const issueFound = currentUser && currentUser.like_issues.find(issue => issue.issue_id === id)
    const favoriteFound = currentUser && currentUser.favorites.find(issue => issue.issue_id === id)
    const foundComment = currentUser && comments.find(comment => comment.user_id === currentUser.id)
    setHasComment(foundComment)
    setDislayLikeStatus(!!issueFound)
    setIssueLike(issueFound)
    setFavoriteStatus(!!favoriteFound)
    setIssueFavorite(favoriteFound)
    setThumbsUpOrDown(issueLike && issueLike.is_like ? true : false)
    
  }, [currentUser, issueLike, id, setIssueFavorite, comments, dispatch])

  useEffect(() => {
    setIssueLikes(totalIssueLikes(allIssueLikes))
    setIssueDislikes(totalIssueDislikes(allIssueLikes))
  }, [allIssueLikes, totalIssueLikes, totalIssueDislikes]) 

  const deleteIssue = () => {
    fetch(`http://localhost:3000/issues/${id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(issue => {
      dispatch({ type: DELETE_ISSUE, payload: issue })
      dispatch({ type: DELETE_ISSUE_INDEX, payload: issue })
      props.match.path === "/issues/:id" && props.history.push('/issues')
      setOpenDelete(false)
    })
  }

  const updateIssue = () => {
    const data = {
      title: updateTitle,
      issue_body: updateBody
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
        dispatch({ type: UPDATE_ISSUE_INDEX, payload: data.issue })
        dispatch({ type: UPDATE_ISSUE , payload: data.issue })
        setOpenEdit(false)
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
      dispatch({ type: REMOVE_KEY_HOLDER_ISSUE_LIKE, payload: data.like })
      dispatch({ type: UPDATE_ISSUE, payload: data.issue })
      dispatch({ type: DELETE_ISSUE_LIKE, payload: data.like })
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
      console.log("LIKE ->", data)
      dispatch({ type: ADD_KEY_HOLDER_ISSUE_LIKE, payload: data.like })
      dispatch({ type: UPDATE_ISSUE, payload: data.issue })
      dispatch({ type: ADD_ISSUE_LIKE, payload: data.like })
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
      dispatch({ type: ADD_KEY_HOLDER_ISSUE_LIKE, payload: data.like })
      dispatch({ type: UPDATE_ISSUE, payload: data.issue })
      dispatch({ type: ADD_ISSUE_LIKE, payload: data.like })
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

  const handleCopyIssue = () => {
    const copyText = document.querySelector(`.Copy-Clipboard-Text-${user.first_name}-${user.last_name}-${user.id}`)
    const textArea = document.createElement("textarea");
    textArea.textContent = copyText.innerText;
    document.body.append(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
  }

  const handleCopyCode = () => {
    const copyText = document.querySelectorAll(`.Copy-Clipboard-${user.first_name}-${user.last_name}-${user.id}`)
    const textArea = document.createElement("textarea");
    for (let code of copyText) {
      textArea.textContent += code.innerText
    }
    document.body.append(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
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
                  <Card.Meta className="Issue-Icon-Avatar" textAlign='center'>
                    <Image
                      as={Link}
                      to={`${currentUser ? `/account/${user.id}` : "/login"}`}
                      className="Issue-Image"
                      size='big'
                      avatar
                      alt={`user ${user.first_name} ${user.last_name}`}
                      src={user.profile_picture.image_url}
                    />
                  <span>{`${user.first_name} ${user.last_name[0]}.`}</span>
                  </Card.Meta>
                </Card.Meta>
                { 
                  props.displayBody && 
                  <>
                    <Card.Description className={`Copy-Clipboard-Text-${user.first_name}-${user.last_name}-${user.id} ShowIssue-Issue-Body`}>
                      {
                        <CreateHighlight dataString={issue_body} syntax={syntax} user={user} />
                      }
                    </Card.Description>
                    <Popup
                      content='Copy the text or just code snippets to your clipboard'
                      position='top left'
                      inverted
                      style={popupWrapper}
                      trigger={
                      <div className="Trigger-Container"> 
                        <Popup
                          content='Issue copied to clipboard'
                          on='click'
                          position='right center'
                          inverted
                          pinned
                          trigger={<Button circular basic color='blue' icon='copy' className="Clipboard-Button" onClick={handleCopyIssue} />}
                        />
                        <Popup
                          content='Code copied to clipboard'
                          on='click'
                          position='right center'
                          inverted
                          pinned
                          trigger={<Button circular basic color='blue' icon='code' className="Clipboard-Button" onClick={handleCopyCode} />}
                        />
                      </div>
                      }
                    />
                  </>
                }
                <Divider clearing />
                <Card.Meta className="Issue-Item-Wrapper">
                  <Card.Meta className="Issue-Item-Wrapper">
                    <Card.Meta className="Issue-Item-Extra">
                      <Icon name={hasComment ? "comment alternate" : "comment outline"} size="large" />
                      <span className="Issue-Comment">{totalComments}</span>
                    </Card.Meta>
                    <Card.Meta className="Issue-Item-Extra Inner-Item">
                      <Icon name="thumbs up" />
                      <span className="Issue-Comment">{issueLikes.length}</span>
                    </Card.Meta>
                    <Card.Meta className="Issue-Item-Extra Inner-Item">
                      <Icon name="thumbs down" />
                      <span className="Issue-Comment">{issueDislikes.length}</span>
                    </Card.Meta>
                  </Card.Meta>
                  <Card.Meta className="Issue-Item-Extra">
                    { 
                      currentUser && displayLikeStatus ? 
                      <Button circular color={thumbsUpOrDown ? "blue" : "grey"} icon={ thumbsUpOrDown ? "thumbs up" : "thumbs down"} onClick={unlike} size="large" />
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
                  </Card.Meta>
                </Card.Meta>
              </Card.Content>
              {
                currentUser && currentUser.id === user.id &&
                <Card.Content>
                  <div className='ui two buttons'>
                    <Modal
                      onClose={() => setOpenEdit(false)}
                      onOpen={() => setOpenEdit(true)}
                      open={openEdit}
                      trigger={<Button inverted color='green' size="small"><Icon name='edit'/></Button>}
                    >
                      <Modal.Header>Update Issue</Modal.Header>
                      <Modal.Content>
                        <IssueForm 
                          isUpdateForm={true} 
                          displayContent={false} 
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
                        <Button onClick={() => setOpenEdit(false)} color='teal'>Cancel</Button>
                        <Button onClick={updateIssue} color='green'>Update</Button>
                      </Modal.Actions>
                    </Modal>
                    <Modal
                      closeIcon
                      size="tiny"
                      dimmer="blurring"
                      open={openDelete}
                      trigger={<Button inverted color='red'><Icon name='trash'/></Button>}
                      onClose={() => setOpenDelete(false)}
                      onOpen={() => setOpenDelete(true)}
                    >
                      <Header icon='trash' content='Please confirm' />
                      <Modal.Content>
                        <p>
                          Are you sure you want to delete this issue?
                        </p>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button color='red' onClick={() => setOpenDelete(false)}>
                          <Icon name='remove' /> No
                        </Button>
                        <Button color='green' onClick={deleteIssue}>
                          <Icon name='checkmark' /> Yes
                        </Button>
                      </Modal.Actions>
                    </Modal>
                  </div>
                </Card.Content>
              }
            </Card>
        </Grid.Column>
      </Grid.Row>
  );
} 

export default withRouter(Issue);