import React, { Component } from 'react';

class UserProfile extends Component {

  state = {
    user: null
  }

  componentDidMount() {
    const userId = this.props.match.params.id

    fetch(`http://localhost:3000/users/${userId}`)
      .then(r => r.json())
      .then(user => {
        this.setState({ user })
      })
  }

  render() {

    if (!this.state.user) {
      return <h1>Loading...</h1>
    }

    const { username, age, profession, avatar } = this.state.user
    const imgUrl = `https://semantic-ui.com/images/avatar/large/${avatar}.jpg`

    return (
      <>
        <h1 className="ui center aligned header">{username} Profile</h1>
        <div class="ui container">
          <div class="ui divided padded equal width grid">
            <div class="center aligned row">
              <div class="column">

              </div>
              <div class="column">
                <div class="ui card center aligned container raised segment">
                  <div class="image">
                    <img src={imgUrl} alt={username} />
                  </div>
                  <div class="content">
                    <div class="header">{username}</div>
                    <div class="meta"><span class="date">Age: {age}</span></div>
                    <div class="description">Profession: {profession}</div>
                  </div>
                  <div class="extra content">
                    <a>
                      <i aria-hidden="true" class="list alternate outline icon"></i>
                        22 Issues
                        </a>
                  </div>
                </div>
              </div>
              <div class="column">

              </div>
            </div>
          </div>
        </div>
      </>

    );
  }
}

export default UserProfile;