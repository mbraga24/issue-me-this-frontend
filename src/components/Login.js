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

    const loginUser = {
      username: this.state.username[0].toUpperCase() + this.state.username.slice(1),
      password: this.state.password
    }
    // make a fetch request to request to login the user - the fetch will be to the custom route "/login"
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginUser)
    })
    .then(r => r.json())
    .then(data => {
      console.log("LOGIN =========> ", data)
      // deconstruct assignment - user and token
      const { user, token } = data
      // set user in state in the App component
      this.props.handleLogin(user)
      // set localStorage to token
      localStorage.token = token
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
              <button type="submit" className="ui button green">Login</button>
            </form>
          </div>
      </div>
    );
  }
}

export default Login;
