import React from 'react';
import { Header, Icon, Segment } from 'semantic-ui-react';
import '../resources/Home.css';

const Home = (props) => {
  return (
      <Segment placeholder id="Home-Container">
        <Header icon>
          <Icon name='question circle outline' className="Home-Icon"/>
          <Header className="Home-Title">Issue Me This</Header>
        </Header>
      </Segment>
  )
}

export default Home;