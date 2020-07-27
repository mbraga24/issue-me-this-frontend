import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom'
import SideBar from './components/SideBar';
import Header from './components/Header';
import Main from './components/Main';
import NewIssueForm from './components/NewIssueForm';
import ShowIssue from './components/ShowIssue';
import './App.css';

const App = () => {
  // hooks 
  const [toggle, setToggle] = useState(false);

  const toggleMenu = () => {
    setToggle(!toggle)
  }

  return (
    <div className="App-container">
      <Header onToggleMenu={toggleMenu}/>
        <div className="ui attached pushable App-sidebar">
          <SideBar toggleMenu={toggle}/>
          <Switch>  
            <React.Fragment>
              <div className={`pusher bottom ui aligned container App-main ${toggle ? 'dimmed' : ''}`}>
                <Route exact path="/issues" render={() => <Main />} />
                <Route path="/issues/new" render={() => <NewIssueForm />} />
                <Route path="/issues/:id" render={routeProps => <ShowIssue {...routeProps} />} customProps={toggleMenu}/>
              </div>
            </React.Fragment>
          </Switch>
      </div>
    </div>
  );
}

export default App;