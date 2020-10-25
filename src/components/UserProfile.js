import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Card, Image, Container, Segment, Grid, Header, Icon, List, Button } from 'semantic-ui-react'
import '../resources/UserProfile.css';

const UserProfile = props => {

  const users = useSelector(state => state.user.users)
  const currentUser = useSelector(state => state.user.keyHolder)
  const userId = parseInt(props.match.params.id)
  const [ userProfile, setUserProfile ] = useState(null)

  useEffect(() => {
    const user = users.find(user => user.id === userId)
    setUserProfile(user)
  }, [users, userId])

  const renderSkills = () => {
    return userProfile.skills.map(skill => (
      <Grid.Column>
        <Grid.Row>
          <Segment textAlign="center" key={`${skill.key}`} color={`${skill.color}`}>{skill.text}</Segment> 
        </Grid.Row>
      </Grid.Column>
    ))
  }

  const renderIssues = () => {
    return userProfile.issues.map(issue => (
      <Grid.Column key={issue.id}>
        <Grid.Row>
          <Card fluid>
            <Card.Content>
              <Card.Header as={Link} to={`/issues/${issue.id}`}>{issue.title}</Card.Header>
              <Card.Description>{issue.issue_body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Grid columns={2} padded>
                <Grid.Column>
                  <Grid.Row>
                    <Icon name='thumbs up'/>4 Likes
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column>
                  <Grid.Row>
                    <Icon name='comment'/>{issue.comments.length} {issue.comments.length < 1 ? "Comment" : "Comments" }
                  </Grid.Row>
                </Grid.Column>
              </Grid>
            </Card.Content>
          </Card>
        </Grid.Row>
      </Grid.Column>
    ))
  }

  return (
    userProfile ?
      <Container id="UserProfile-Container">
        <Header as='h1' textAlign="center" className="UserProfile-Header">{(currentUser && currentUser.id === userId) ? `Hello, ${currentUser.first_name}! ` : `${userProfile.first_name} ${userProfile.last_name} Profile` }</Header>
        <Grid columns={2} stackable divided className="UserProfile-Profile-Details">
          <Grid.Row stretched>
            <Grid.Column width={10}>
              <Card>
                <Image src={`https://semantic-ui.com/images/avatar/large/${userProfile.avatar}.jpg`} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{userProfile.first_name} {userProfile.last_name}</Card.Header>
                  <Card.Description>
                    <div className="description">Profession: {userProfile.profession}</div>
                    {currentUser && <div className="description"><span className="date">Email: {userProfile.email}</span></div>}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Link to="/pages">
                    <i aria-hidden="true" className="list alternate outline icon"></i>
                      {userProfile.issues.length} {userProfile.issues.length > 1 || userProfile.issues.length === 0 ? "Issues" : "Issue"}
                  </Link>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={6} textAlign="center">
              <List verticalAlign='middle' >
                <Button color="teal" className="UserProfile-Account-Options">
                  <List.Item>
                    <Icon name='settings' size="huge"/>
                    <List.Content className="UserProfile-Account-Items">
                      <List.Header>Settings</List.Header>
                    </List.Content>
                  </List.Item>
                </Button>
                <Button color="teal" className="UserProfile-Account-Options">
                  <List.Item>
                    <Icon name='star' size="huge"/>
                    <List.Content className="UserProfile-Account-Items">
                      <List.Header>Favorite Issues</List.Header>
                    </List.Content>
                  </List.Item>
                </Button>
                <Button color="teal" className="UserProfile-Account-Options">
                  <List.Item>
                    <Icon name='boxes' size="huge"/>
                    <List.Content className="UserProfile-Account-Items">
                      <List.Header>Manage Issues</List.Header>
                    </List.Content>
                  </List.Item>
                </Button>
                <Button color="teal" className="UserProfile-Account-Options">
                  <List.Item>
                    <Icon name='thumbs up' size="huge"/>
                    <List.Content className="UserProfile-Account-Items">
                      <List.Header>Issues Liked</List.Header>
                    </List.Content>
                  </List.Item>
                </Button>
                
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        
        <Grid columns={1} padded>
          <Grid.Row>
            <Segment inverted color="teal" size="large" textAlign="center" className="UserProfile-Skills-Header">Top Skills</Segment>
              <Grid columns={3} padded className="UserProfile-Skills">
                {renderSkills()}
              </Grid>
          </Grid.Row>
          <Grid.Row>
            <Segment inverted color="teal" size="large" textAlign="center" className="UserProfile-Skills-Header">Popular Issues</Segment>
              <Grid columns={2} stackable padded>
                {renderIssues()}
              </Grid>
          </Grid.Row>
        </Grid>
      </Container> : null
    );
}

export default withRouter(UserProfile);