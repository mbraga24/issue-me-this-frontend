import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Card, Image, Segment, Grid, Header, Icon, List, Button, Divider } from 'semantic-ui-react'
import Loading from './Loading';
import MissingTemplate from './MissingTemplate';
import accountOptions from '../Library/accountOptions';
import '../resources/Account.css';

const Account = props => {

  const users = useSelector(state => state.user.users)
  const currentUser = useSelector(state => state.user.keyHolder)
  const userId = parseInt(props.match.params.id)
  const [ userProfile, setUserProfile ] = useState(null)
  const [ popularIssues, setPopularIssues ] = useState([])
  const [ issueCount, setIssueCount ] = useState([])
  
  function findPopularIssues(issues) {
    return issues.filter(issue => issue.like_issues.length >= 3)
  }

  useEffect(() => {
    const user = users && users.find(user => user.id === userId)
    setUserProfile(user)
    if (user) {
      setPopularIssues(findPopularIssues(user.issues))
      setIssueCount(user.issues)
    }
  }, [users, userId])

  const renderSkills = () => {
    return userProfile.skills.map(skill => (
      <Grid.Column key={skill.id} className="Account-Skill">
        <Segment textAlign="center" key={`${skill.key}`} color={`${skill.color}`}>{skill.text}</Segment> 
      </Grid.Column>
    ))
  }
  
  const renderIssues = () => {

    if (popularIssues.length !== 0) {
      return popularIssues.map(issue => (
        <Grid.Column key={issue.id}>
            <Card fluid>
              <Card.Content>
                <Card.Header as={Link} to={`/issues/${issue.id}`}>{issue.title}</Card.Header>
              </Card.Content>
              <Card.Content extra>
                <Grid columns={2} padded>
                  <Grid.Column>
                    <Grid.Row>
                      <Icon name='thumbs up'/>{issue.like_issues.length} Likes
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
        </Grid.Column>
      ))
    } else {
      return <MissingTemplate center={true} header={`${issueCount > 0 ? "Your issues are not that popular yet" : "No issues posted"}`} />
    }
  }

  return (
    userProfile ?
    <div id="Account-Container">
        <Header as='h1' textAlign="center" color="blue" className="Account-Header">{(currentUser && currentUser.id === userId) ? `Hello, ${userProfile.first_name}! ` : `${userProfile.first_name} ${userProfile.last_name} Profile` }</Header>
        <Divider />
        <Grid stackable columns='equal'>
          <Grid.Row>
            <Grid.Column>
              <Grid divided>
                <Grid.Row stretched>
                  <Grid.Column>
                    <Image className="Account-Image" src={userProfile.profile_picture ? userProfile.profile_picture.image_url : "/default-profile.jpg"} size='small' circular />
                    <Card className="Account-Card">
                      <Card.Content>
                        <Card.Header textAlign="center">{userProfile.first_name} {userProfile.last_name}</Card.Header>
                        <Card.Description>
                          <div className="description">Profession: {userProfile.job_title} </div>
                          <div className="description">Date of Birth: {userProfile.birthday} </div>
                          { currentUser && <div className="description"><span className="date">Email: {userProfile.email}</span></div> }
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra as={Link} to={`/user-issues/${userId}`}>
                          <Icon name='list alternate outline' size="large" />
                          {userProfile.issues.length} {userProfile.issues.length > 1 || userProfile.issues.length === 0 ? "Issues" : "Issue"}
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid stackable columns='equal' className={`Account-Options-Wrapper ${(currentUser && currentUser.id === userId) ? "" : "Account-Not-Loggedin-User"}`}>
                <Grid.Row stretched>
                  {
                    accountOptions.map(option => (
                      <Grid.Column>
                        <Button circular key={option.iconName} as={Link} to={option.iconName === "boxes" ? `/user-issues/${userId}` : option.link} color="blue" className="Account-Button-Options" >
                          <List.Item>
                            <List.Content>
                              <Icon name={option.iconName} size="big"/>
                              <List.Header className="Account-Item-Name">{option.listHeader}</List.Header>
                            </List.Content>
                          </List.Item>
                        </Button>     
                      </Grid.Column>
                    ))
                  }
                </Grid.Row>
              </Grid>
              <Divider />
              <Header as='h1' color="blue" textAlign="center">Top skills</Header>
              <Grid stackable columns='equal' className="Top-Skills-Wrapper">
                <Grid.Row stretched>
                  {renderSkills()}
                </Grid.Row>
              </Grid>
              <Divider />
              <Header as='h1' color="blue" textAlign="center">Your popular issues</Header>
              <Grid columns='equal' className={`${currentUser ? "" : "Account-Not-Loggedin-User"}`}>
                <Grid.Row stretched>
                  {renderIssues()}
                </Grid.Row>
              </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div> : <Loading loadingClass={true} /> 
    );
}

export default withRouter(Account);