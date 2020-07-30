import React from 'react';
import UserList from './UserList'

const UserContainer = (props) => {

  const renderUsers = () => {
    // const filteredIssues = props.users.filter(issue => issue.title.toLowerCase().includes(props.searchTerm.toLowerCase()))

    return <div className="row"> {
      props.users.map(user => (
        <div key={user.id} className="column">
          <UserList
            id={user.id}
            username={user.username}
            age={user.age}
            profession={user.profession}
            avatar={user.avatar}
          />
        </div>
      ))
    }
    </div>
  }
  return (
    <React.Fragment>
      <h1 className="ui center aligned header">Users</h1>
      <div className="ui divided four column grid container">
        {renderUsers()}
      </div>
    </React.Fragment>
  );
}

export default UserContainer;