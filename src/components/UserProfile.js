import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment } from 'semantic-ui-react'

class UserProfile extends Component {

  state = {
    user: null,
    skills: []
  }

  renderTopSkills = () => {
    // console.log(this.state.skills)
    return this.state.skills.map(skill => (
      <Segment key={`${skill.key}`} color={`${skill.color}`}>{skill.text}</Segment> 
    ))
  }
  componentDidMount() {
    const userId = this.props.match.params.id
    // console.log("INSIDE FETCH ========> ", userId)
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

  // --------------------------------------------------------------
  // It's as if the sidebar doesn't know I'm already in the page.
  // It sends the id of the current user to the component but it 
  // does not re-render the component
  // ---------------------------------------------------------------
  
  render() {

    if (!this.state.user) {
      return <h1>Loading...</h1>
    }

    const { username, age, profession, avatar, issues } = this.state.user
    const imgUrl = `https://semantic-ui.com/images/avatar/large/${avatar}.jpg`

    // if (!this.props.currentUser && this.props.match.params.id !== this.props.currentUser.id && id !== this.props.currentUser.id) {
    //   this.forceUpdateHandler()
    // }

    return (
      <>
      <h1 className="ui center aligned header" style={{margin: "10px auto"}}>{this.props.currentUser && this.props.currentUser.username === username ? `Hello, ${username}! ` : `${username} Profile` }</h1>
        <div className="ui container">
          <div className="ui divided padded equal width grid">
            <div className="center aligned row">
              <div className="column">
                <div className="ui card center aligned container raised segment">
                  <div className="image">
                    <img src={imgUrl} alt={username} />
                  </div>
                  <div className="content">
                    <div className="header">{username}</div>
                    <div className="meta"><span className="date">Age: {age}</span></div>
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
              <div className="column">
                <>
                  <Segment inverted size="large" style={{fontWeight: "bold"}}>Top Skills</Segment>
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