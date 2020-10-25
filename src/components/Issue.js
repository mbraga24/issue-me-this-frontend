import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Icon, Button, Card, Image, Divider, Modal } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom';
import { DELETE_ISSUE, UPDATE_ISSUE, UPDATE_TITLE, UPDATE_BODY } from '../store/type';
import IssueForm from './IssueForm';
import CreateHighlight from '../helpers/CreateHighlight';
import '../resources/Issue.css';

const Issue = props => {
  
  const dispatch = useDispatch() 
  const [ open, setOpen ] = useState(false)

  const currentUser = useSelector(state => state.user.keyHolder)
  const issueTitle = useSelector(state => state.issue.issueTitle)
  const issueBody = useSelector(state => state.issue.issueBody)

  const { id, title, comments, issue_body, syntax, user } = props.issue
  const totalComments = comments.length
  const imgUrl = `https://semantic-ui.com/images/avatar/small/${user.avatar}.jpg`

  console.log(props.history)

  const deleteIssue = () => {
    fetch(`http://localhost:3000/issues/${id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(issue => {
      dispatch({ type: DELETE_ISSUE, payload: issue })

      props.history.push('/issues')
    })
  }

  const updateIssue = () => {
    const data = {
      title: issueTitle,
      issue_body: issueBody
      // syntax: "javascript"
    }

    // console.log("UPDATE ISSUE --->", data)
    
    fetch(`http://localhost:3000/issues/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(r => r.json())
    .then(data => {
      console.log("UPDATED ISSUE -->", data.issue)
      if (data.errorStatus) {
        console.log("ERROR --->", data.error)
      } else {
        dispatch({ type: UPDATE_ISSUE , payload: data.issue })
        dispatch({ type: UPDATE_TITLE , payload: "" })
        dispatch({ type: UPDATE_BODY , payload: "" })
      }
    })  
    setOpen(false)
  }
  
  return (
      <Grid.Row>
        <Grid.Column className="Issue-Inner-Wrap" width={12}>
            <Card fluid raised>
              <Card.Content className="Issue-Content">
                <Card.Header>

                </Card.Header>
                <Card.Meta className="Issue-Item-Wrapper">
                  <Card.Meta className="Issue-Icon-Title">
                    <Link to={`/issues/${id}`}>
                      {title}
                    </Link>
                  </Card.Meta>
                  <Card.Meta className="Issue-Icon-Avatar" textAlign='right'>
                    <Image
                      as={Link}
                      to={`/users/${user.id}`}
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
                    <Button circular color="teal" icon='thumbs up outline' size="large" />
                    <Button circular color="teal" icon='star outline' size="large" />
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
                        <IssueForm displayContent={false} isUpdateForm={true} issueData={props.issue} />
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