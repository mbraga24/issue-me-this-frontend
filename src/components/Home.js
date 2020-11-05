import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import '../resources/Home.css';

const Home = props => {
  return (
      <div id="Home-Container">
        <Header icon className="Home-Header">
          <Icon name='question circle outline' className="Home-Icon"/>
          <Header className="Home-Title">Issue Me This</Header>
        </Header>
      </div>
  )
}

export default Home;