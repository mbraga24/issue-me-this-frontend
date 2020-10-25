import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Icon, Button, Card, Image, Divider, Modal } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { DELETE_ISSUE } from '../store/type';
import IssueForm from './IssueForm';
import '../resources/Issue.css';

const Issue = props => {
  
  const dispatch = useDispatch() 
  const [ open, setOpen ] = useState(false)
  const currentUser = useSelector(state => state.user.keyHolder)
  const { id, title, comments, user } = props.issue
  const totalComments = comments.length
  const imgUrl = `https://semantic-ui.com/images/avatar/small/${user.avatar}.jpg`

  const deleteIssue = () => {
    fetch(`http://localhost:3000/issues/${id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(issue => {
      dispatch({ type: DELETE_ISSUE, payload: issue })
    })
  }

  const handleUpdate = () => {
    setOpen(false)
  }
  
  return (
    <Grid columns={1} divided id="Issue">
      <Grid.Row>
        <Grid.Column className="Issue-Inner-Wrap" width={12}>
            <Card fluid raised>
              <Card.Content className="Issue-Content">
                <Link to={`/users/${user.id}`}>
                  <Image
                    floated='right'
                    size='big'
                    avatar
                    alt={`${user.first_name} ${user.last_name}`}
                    src={imgUrl}
                  />
                </Link>
                <Card.Header>
                  <Link to={`/issues/${id}`}>
                    {title}
                  </Link>
                </Card.Header>
                <Divider clearing />
                <Card.Meta className="Issue-Comments">
                  <Icon name='comment alternate icon'/>
                  <span>{totalComments} Comments</span>
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
                        <IssueForm displayBtn={false} displayHeader={false} issueData={props.issue} />
                      </Modal.Content>
                      <Modal.Actions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button onClick={handleUpdate} positive>Update</Button>
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
    </Grid>
  );
} 

export default Issue;