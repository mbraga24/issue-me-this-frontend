import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
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
      <Segment key={`${skill.key}`} color={`${skill.color}`}>{skill.text}</Segment> 
    ))
  }

  // const { id, email, first_name, last_name, age, profession, avatar, issues } = userProfile
  // const imgUrl = `https://semantic-ui.com/images/avatar/large/${userProfile.avatar}.jpg`

  return (
    userProfile ?
    <>
      <h1 className="ui center aligned header UserProfile-header">{(currentUser && currentUser.id === userId) ? `Hello, ${currentUser.first_name}! ` : `Profile ${userProfile.first_name} ${userProfile.last_name}` }</h1>
        <div className="ui container">
          <div className="ui divided padded equal width grid">
            <div className="row">
              <div className="column">
                <div className="ui card container raised segment">
                  <div className="image">
                    <img src={`https://semantic-ui.com/images/avatar/large/${userProfile.avatar}.jpg`} alt={userProfile.first_name} />
                  </div>
                  <div className="content">
                    <div className="header">{userProfile.first_name} {userProfile.last_name}</div>
                    {currentUser && <div className="description"><span className="date">Email: {userProfile.email}</span></div>}
                    <div className="description"><span className="date">Age: {userProfile.age}</span></div>
                    <div className="description">Profession: {userProfile.profession}</div>
                  </div>
                  <div className="extra content">
                    <Link to="/pages">
                      <i aria-hidden="true" className="list alternate outline icon"></i>
                        {userProfile.issues.length} {userProfile.issues.length > 1 || userProfile.issues.length === 0 ? "Issues" : "Issue"}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="column center aligned">
                <>
                  <Segment inverted size="large" className="UserProfile-topskills">Top Skills</Segment>
                  <Segment.Group>
                    {renderSkills()}
                  </Segment.Group>
                </>
              </div>
              <div className="column">
              </div>
            </div>
          </div>
        </div>
      </> : null
    );
}

export default withRouter(UserProfile);