import React from 'react';
import { Header, Icon, Segment } from 'semantic-ui-react';
import '../resources/Home.css';

const Home = (props) => {
  return (
      <Segment placeholder className="Home-container">
        <Header icon>
          <Icon name='question circle outline' className="Home-icon"/>
          <Header className="Home-title">Issue Me This</Header>
        </Header>
      </Segment>
  )
}

export default Home;