import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Header, Grid } from 'semantic-ui-react';
import UserList from './UserList';
import '../resources/UserContainer.css';

const UserContainer = props => {

  const users = useSelector(state => state.user.users)

  const renderUsers = () => {
    return users.map(user => (
        <Grid.Column key={user.id}>
          <UserList
            id={user.id}
            user={user}
          />
        </Grid.Column>
      ))
  }
  return (
    users && 
      <Container id="Users-Container">
        <Header as='h1' textAlign="center" className="Users-Header">Users</Header>
        <Grid divided="vertically">
          <Grid.Row columns={4}>
            {renderUsers()}
          </Grid.Row>
        </Grid>
      </Container>
  );
}

export default UserContainer;