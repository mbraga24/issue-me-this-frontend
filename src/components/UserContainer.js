import React from 'react';
import { useSelector } from 'react-redux';
import { Header, Grid } from 'semantic-ui-react';
import UserCard from './UserCard';
import '../resources/UserContainer.css';

const UserContainer = props => {

  const users = useSelector(state => state.user.users)

  const renderUsers = () => {
    return users.map(user => (
        <Grid.Column key={user.id}>
          <UserCard id={user.id} user={user} />
        </Grid.Column>
      ))
  }
  return (
      <div id="Users-Container">
        <Header as='h1' textAlign="center" color="grey" className="Users-Header">Users</Header>
        <Grid divided="vertically">
          <Grid.Row columns={4}>
            {users && renderUsers()}
          </Grid.Row>
        </Grid>
      </div>
  );
}

export default UserContainer;