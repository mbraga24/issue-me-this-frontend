import React, { Component } from 'react';
import '../SignUp.css';

class SignUp extends Component {

  render() {
    return (
      <div className="ui container SignUp-container">
          <div class="ui grid">
            <form className="ui form six wide column centered raised segment SignUp-form">
              <h1 className="ui center aligned header">Signup</h1>
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

export default SignUp;
