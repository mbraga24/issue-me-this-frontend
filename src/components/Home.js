import React from 'react';
import { Header, Popup, Image } from 'semantic-ui-react';
import '../resources/Home.css';

const Home = props => {
  const popupStyle = {
    borderRadius: 4,
    opacity: 0.7,
    padding: '0.5em',
  }

  return (
    <div id="Home-Container">
      <Header icon className="Home-Header">
        <Popup style={popupStyle} inverted position='top center' on="click" pinned trigger={<Image src={require('../Icon/question-mark-colored.png')} className="Image-Size" circular/>}>
          Tab and Home Icon made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
        </Popup>
        <Popup 
          inverted 
          position='bottom center' 
          content={"Click the icon for the creator attribute"} 
          style={popupStyle} 
          trigger={<Header color="blue" className="Home-Title">Issue Me This</Header>} />
      </Header>
    </div>
  )
}

export default Home;