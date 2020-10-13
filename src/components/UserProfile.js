import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Card, Image, Container, Segment, Grid, Header, Icon } from 'semantic-ui-react'
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
        <Segment key={`${skill.key}`} color={`${skill.color}`}>{skill.text}</Segment> 
      </Grid.Column>
      
    ))
  }

  const renderIssues = () => {
    return userProfile.issues.map(issue => (
      <Grid.Column>
      <Card>
        <Card.Content header={issue.title} />
        <Card.Content description={issue.issue_body} />
        <Card.Content extra>
          <Grid columns={2} padded>
            <Icon name='thumbs up' />4 Likes
            <Icon name='comment' />{issue.comments.length} {issue.comments.length < 1 ? "Comment" : "Comments" }
          </Grid>
        </Card.Content>
      </Card>
    </Grid.Column>
    ))
  }

  return (
    userProfile ?
      <Container className="UserProfile-Container">
        <Header as='h1' textAlign="center" className="UserProfile-Header">{(currentUser && currentUser.id === userId) ? `Hello, ${currentUser.first_name}! ` : `${userProfile.first_name} ${userProfile.last_name} Profile` }</Header>
        <Grid columns={2} divided className="UserProfile-Profile-Details">
          <Grid.Row stretched>
            <Grid.Column>
              <Card>
                <Image src={`https://semantic-ui.com/images/avatar/large/${userProfile.avatar}.jpg`} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{userProfile.first_name} {userProfile.last_name}</Card.Header>
                  <Card.Description>
                    {currentUser && <div className="description"><span className="date">Email: {userProfile.email}</span></div>}
                    <div className="description"><span className="date">Age: {userProfile.age}</span></div>
                    <div className="description">Profession: {userProfile.profession}</div>
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
            <Grid.Column>
              <Segment>Personal Info</Segment>
              <Segment>Skills</Segment>
              <Segment>Manage Issues</Segment>
              <Segment>Favorites</Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <span>
          <Segment inverted size="large" textAlign="center" className="UserProfile-Skills-Header">Top Skills</Segment>
            <Grid columns='equal' className="UserProfile-Skills">
              <Grid.Row>
              {renderSkills()}
              </Grid.Row>
            </Grid>
        </span>
        <span>
          <Segment inverted size="large" textAlign="center" className="UserProfile-Skills-Header">Popular Issue</Segment>
            <Grid columns='equal' className="UserProfile-Skills">
            <Grid columns={4} padded textAlign="center">
              {renderIssues()}
            </Grid>
          </Grid>
        </span>
      </Container> : null
    );
}

export default withRouter(UserProfile);