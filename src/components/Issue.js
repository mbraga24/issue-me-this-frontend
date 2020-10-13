import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Icon, Button, Card, Image  } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { DELETE_ISSUE } from '../store/type';
import '../resources/Issue.css';

const Issue = props => {
  
  const dispatch = useDispatch() 
  const currentUser = useSelector(state => state.user.keyHolder)
  const { id, title, issue_body, comments, user } = props.issue
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

  const updateIssue = () => {
    console.log("EDIT ISSUE")
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
                <Card.Meta className="Issue-Comments">
                  <Icon name='comment alternate icon'/>
                  <span>{totalComments} Comments</span>
                </Card.Meta>
                <Card.Description>
                  <span className="Issue-Comment">{issue_body}</span>
                </Card.Description>
              </Card.Content>
              {
                currentUser && currentUser.id === user.id &&
                  <Card.Content extra>
                  <div className='ui two buttons'>
                    <Button basic color='green' onClick={updateIssue}>
                      Edit
                    </Button>
                    <Button basic color='red' onClick={deleteIssue}>
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