import React, { Component } from 'react';
import { Dropdown, Grid } from 'semantic-ui-react'
import '../SignUp.css';

class SignUp extends Component {

  state = {
    username: "",
    age: null,
    profession: "",
    topSkills: [],
    password: "",
    skillOptions: []
  }

  professions = () => {
    return [
      {text: "Jr. Software Engineer", value: "Jr. Software Engineer"},
      {text: "DevOps", value: "DevOps"},
      {text: "Senior Software Engineer", value: "Senior Software Engineer"},
      {text: "Technical Support", value: "Technical Support"},
      {text: "IT", value: "IT"},
      {text: "Electronic Engineer", value: "Electronic Engineer"},
      {text: "Mechanical Engineer", value: "Mechanical Engineer"}
    ]
  }

  // set age range for dropdown 
  ageRange = () => {
    const ageOptions = []
    for (let start = 18; start < 85; start++) {
      ageOptions.push({ key: start, text: start, value: start })
    }
    return ageOptions
  }

  // set username & password
  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  // set age
  handleInputAge = (event) => this.setState({ age: event.target.textContent })

  // set profession
  handleInputProfession = (event) => this.setState({ profession: event.target.textContent })

  // set top five skills
  handleInputSkills = (event) => {
    const newSkill = event.target.textContent
    if (this.state.topSkills.length < 5 && newSkill !== "") {  
      this.setState({ topSkills: [...this.state.topSkills, newSkill] })
    } else {
      const removeSkill = this.state.topSkills.pop()
      const keepSkills = this.state.topSkills.filter(skill => skill !== removeSkill)
      this.setState({ topSkills: [...keepSkills] })
    }
  }

  // fetch skills for dropdown
  componentDidMount() {
    fetch("http://localhost:3000/skills")
    .then(r => r.json())
    .then(skillOptions => {
      // set skillOptions state for dropdown
      this.setState({ skillOptions })
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const newUser = {
      username: this.state.username,
      password: this.state.password,
      profession: this.state.profession,
      topSkills: this.state.topSkills,
      age: this.state.age,
      avatar: "laura"
    }

    fetch("http://localhost:3000/users", {
      method: "POST",  
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(r => r.json())
    .then(newUser => {
      // set user in state in the App component 
      this.props.handleNewUser(newUser)
      // clear all values in state
      this.setState({
        username: "",
        age: null,
        profession: "",
        topSkills: [],
        password: "",
        skillOptions: []
      })
      
      // ************************************************************
      // ************************************************************
      // IT PUSHES TO /issues PAGE BUT IT DOES NOT PUSH IT FROM
      // APP COMPONENT
      // ************************************************************
      // ************************************************************
      this.props.history.push('/issues')
    })
  }

  render() {
    return (
      <div className="ui container SignUp-container">
          <div className="ui grid">
            {/* loading */}
            <form className="ui form six wide column centered raised segment SignUp-form" onSubmit={this.handleSubmit}>
              <h1 className="ui center aligned header">Signup</h1>
              <div className="field">
                <label>Username</label>
                <input 
                  placeholder="Username" 
                  name="username" 
                  onChange={(event) => this.handleInputChange(event)}
                  value={this.state.username}
                />
              </div>
              <div className="field">
                <label>Age</label>
                <Dropdown
                  placeholder='Compact'
                  compact
                  selection
                  options={this.ageRange()}
                  onChange={this.handleInputAge}
                />
              </div>
              <div className="field">
                <label>Profession</label>
                <Grid.Column>
                  <Dropdown
                    // event.target.firstChild.tagName
                    onChange={(event) => this.handleInputProfession(event)}
                    options={this.professions()}
                    placeholder='What is your current job title?'
                    selection
                    value={this.state.profession}
                  />
                </Grid.Column>
              </div>
              <div className="field">
                <label>Choose your top 5 skills</label>
                <Dropdown 
                  className={`ui ${this.state.topSkills.length === 5 ? "disabled" : ""}`}
                  placeholder='Skills' 
                  fluid multiple selection options={this.state.skillOptions} 
                  closeOnChange
                  onChange={this.handleInputSkills} 
                />
                  { this.state.topSkills.length === 5 &&
                  <div className="ui success form">
                    <div className="ui pointing above prompt label" role="alert" aria-atomic="true">
                      All set! Don't worry if you changed you mind. You can change it later. 
                    </div>
                  </div>
                  }
              </div>
              <div className="field">
                <label>Password</label>
                <input 
                  type="password" 
                  name="password" 
                  autoComplete="current-password" 
                  placeholder="Password" 
                  onChange={(event) => this.handleInputChange(event)}
                  value={this.state.password}
                />
              </div>
              <button type="submit" className="ui button">Signup</button>
            </form>
          </div>
      </div>
    );
  }
}

export default SignUp;

