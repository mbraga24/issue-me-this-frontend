import React from 'react';
import { useSelector } from 'react-redux';
import UserList from './UserList'

const UserContainer = props => {

  const users = useSelector(state => state.user.users)

  const renderUsers = () => {
    return <div className="row"> {
      users.map(user => (
        <div key={user.id} className="column">
          <UserList
            id={user.id}
            user={user}
          />
        </div>
      ))
    }
    </div>
  }
  return (
    users && 
    <React.Fragment>
      <h1 className="ui center aligned header">Users</h1>
      <div className="ui divided four column grid container">
        {renderUsers()}
      </div>
    </React.Fragment>
  );
}

export default UserContainer;