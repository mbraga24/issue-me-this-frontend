import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import '../resources/UserProfile.css';

class UserProfile extends Component {

  state = {
    user: null,
    skills: []
  }

  renderTopSkills = () => {
    return this.state.skills.map(skill => (
      <Segment key={`${skill.key}`} color={`${skill.color}`}>{skill.text}</Segment> 
    ))
  }

  fetchData = (userId) => {
    fetch(`http://localhost:3000/users/${userId}`)
    .then(r => r.json())
    .then(data => {
      const { user, skills } = data
      this.setState({ 
        user: user,
        skills: skills
      })
    })
  }

  componentDidMount() {
    this.fetchData(this.props.match.params.id);  
  }

  renderAgain(thisUser) {
    const browserId = parseInt(this.props.match.params.id)
    if (this.props.currentUser && this.props.currentUser.id === browserId && thisUser !== this.props.currentUser.id) {
      this.setState({ user: this.props.currentUser })
    }
  }
  
  render() {

    if (!this.state.user) {
      return <h1>Loading...</h1>
    }

    const { id, email, first_name, last_name, age, profession, avatar, issues } = this.state.user
    const imgUrl = `https://semantic-ui.com/images/avatar/large/${avatar}.jpg`
    // re-render component
    this.renderAgain(id)

    return (
      <>
      <h1 className="ui center aligned header UserProfile-header">{this.props.currentUser && this.props.currentUser.email === email ? `Hello, ${first_name}! ` : `${first_name} ${last_name} Profile` }</h1>
        <div className="ui container">
          <div className="ui divided padded equal width grid">
            <div className="row">
              <div className="column">
                <div className="ui card container raised segment">
                  <div className="image">
                    <img src={imgUrl} alt={first_name} />
                  </div>
                  <div className="content">
                    <div className="header">{first_name} {last_name}</div>
                    {this.props.currentUser && <div className="description"><span className="date">Email: {email}</span></div>}
                    <div className="description"><span className="date">Age: {age}</span></div>
                    <div className="description">Profession: {profession}</div>
                  </div>
                  <div className="extra content">
                    <Link to="/pages">
                      <i aria-hidden="true" className="list alternate outline icon"></i>
                        {issues.length} {issues.length > 1 || issues.length === 0 ? "Issues" : "Issue"}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="column center aligned">
                <>
                  <Segment inverted size="large" className="UserProfile-topskills">Top Skills</Segment>
                  <Segment.Group>
                    {this.renderTopSkills()}
                  </Segment.Group>
                </>
              </div>
              <div className="column">
              </div>
            </div>
          </div>
        </div>
      </>

    );
  }
}

export default UserProfile;