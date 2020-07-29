import React, { Component } from 'react';
import '../Login.css';

class Login extends Component {

  render() {
    return (
      <div className="ui container Login-container">
          <div class="ui grid">
            <form className="ui form six wide column centered raised segment Login-form">
              <h1 className="ui center aligned header">Login</h1>
              <div className="field">
                <label>Name</label>
                <input placeholder="Name" />
              </div>
            <div className="field">
              <label>Password</label>
              <input type="password" name="password" autoComplete="current-password" placeholder="Password" />
            </div>
              <button type="submit" className="ui button">Submit</button>
            </form>
          </div>
      </div>
    );
  }
}

export default Login;
