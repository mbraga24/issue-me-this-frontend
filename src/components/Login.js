import React, { Component } from 'react';
import '../Login.css';

class Login extends Component {

  state = {
    username: "",
    password: ""
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value }) 
  }

  handleSubmit = event => {
    event.preventDefault()
    // make a fetch request to request to login the user - the fetch will be to the custom route "/login"
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(r => r.json())
    .then(loggedInUser => {
      this.props.handleLogin(loggedInUser)
      this.props.history.push('/home')
    })
  }

  render() {
    // console.log("LOGIN ======>", this.state)

    return (
      <div className="ui container Login-container" onSubmit={this.handleSubmit}>
          <div className="ui grid">
            <form className="ui form six wide column centered raised segment Login-form">
              <h1 className="ui center aligned header">Login</h1>
              <div className="field">
                <label>Username</label>
                <input name="username" placeholder="Username" onChange={this.handleChange} />
              </div>
              <div className="field">
                <label>Password</label>
                <input type="password" name="password" autoComplete="current-password" placeholder="Password" onChange={this.handleChange} />
              </div>
              <button type="submit" className="ui button">Login</button>
            </form>
          </div>
      </div>
    );
  }
}

export default Login;
