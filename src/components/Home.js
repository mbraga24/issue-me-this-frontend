import React from 'react';
import { Header, Popup, Image } from 'semantic-ui-react';
import '../resources/Home.css';

const Home = props => {
  const style = {
    borderRadius: 0,
    opacity: 0.7,
    padding: '0.5em',
  }

  const styleHeader = {
    margin: "20px auto",
    width: "50%",
    height: "20%"
  }

  return (
      <div id="Home-Container">
          <Header icon className="Home-Header">
            <Popup style={style} inverted position='top center' on="click" pinned trigger={<Image src={require('../Icon/question-mark-colored.png')} style={{fontSize: "100px"}} circular/>}>
              Tab and Home Icon made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
            </Popup>
            <Popup style={style} inverted position='bottom center' content={"Click the icon for attribute"} trigger={<Header style={styleHeader} color="blue" className="Home-Title">Issue Me This</Header>} />
          </Header>
      </div>
  )
}

export default Home;