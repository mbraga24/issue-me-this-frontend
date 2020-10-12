import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown, Grid } from 'semantic-ui-react'
import { avatarOptions } from '../helpers/avatar';
import { professionOptions } from '../helpers/profession';
import useFormFields from '../hooks/useFormFields';
import '../resources/SignUp.css';

const SignUp = props => {

  const skills = useSelector(state => state.skill.skills)
  const [ profession, setProfession ] = useState(null)
  const [ avatar, setAvatar ] = useState(null)
  const [ age, setAge ] = useState(null)
  const [ topSkills, setTopSkills ] = useState([])
  const [ skillSelection, setSkillSelection ] = useState([])
  const [ avatarSelection, setAvatarSelection ] = useState([])
  const [ professionSelection, setProfessionSelection ] = useState([])
  const [ fields, handleFieldChange ] = useFormFields({
    email: "",
    firstName: "",
    lastName: "",
    age: null,
    profession: "",
    topSkills: [],
    password: "",
    avatar: ""
  })

  // fetch skills for dropdown
  useEffect(() => {
    setSkillSelection(skills)
    // set profession and avatar options
    setProfessionSelection(professionOptions())
    setAvatarSelection(avatarOptions())
  }, [skills])

  // set age range for dropdown 
  const ageRange = () => {
    const ageOptions = []
    for (let start = 18; start < 85; start++) {
      ageOptions.push({ key: start, text: start, value: start })
    }
    return ageOptions
  }

  // set age
  const handleInputAge = (event) => setAge(event.target.textContent)

  // set profession
  const handleInputProfession = (event) => setProfession(event.target.textContent)
  
  // set avatar
  const handleInputAvatar = (event) => setAvatar(event.target.textContent)

  const handleInputSkills = (event) => {
    const newSkill = event.target.textContent
    if (topSkills.length < 5 && newSkill !== "") {  
      setTopSkills([...topSkills, newSkill])
    } else {
      const removeSkill = topSkills.pop()
      const keepSkills = topSkills.filter(skill => skill !== removeSkill)
      setTopSkills([...keepSkills])
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newUser = {
      email: fields.email,
      first_name: fields.firstName,
      last_name: fields.lastName,
      password: fields.password,
      profession: profession,
      topSkills: topSkills,
      age: age,
      avatar: avatar
    }

    fetch("http://localhost:3000/users", {
      method: "POST",  
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(r => r.json())
    .then(data => {

      if (data.error) {
        console.log("SIGN UP ERROR --->", data)
        // this.props.handleMessages(data)
        // this.props.handleMessages(data)
      } else {
        // const { user, token } = data
        console.log("SIGN UP --->", data)
        // set user in state in the App component 
        // this.props.handleNewUser(user)
        // set localStorage to token id
        // localStorage.token = token
      }
    })
  }
  console.log("SIGN UP - SKILLS --->", skills)
  return (
    <div className="ui container SignUp-container">
        <div className="ui grid">
          <form className="ui form six wide column centered raised segment SignUp-form" onSubmit={handleSubmit}>
            <h1 className="ui center aligned header">Signup</h1>
            <div className="field">
              <label>Email</label>
              <input 
                placeholder="email" 
                name="email" 
                onChange={handleFieldChange}
                value={fields.email}
              />
            </div>
            <div className="field">
              <label>First Name</label>
              <input 
                placeholder="First Name" 
                name="firstName" 
                onChange={handleFieldChange}
                value={fields.firstName}
              />
            </div>
            <div className="field">
              <label>Last Name</label>
              <input 
                placeholder="Last Name" 
                name="lastName" 
                onChange={handleFieldChange}
                value={fields.lastName}
              />
            </div>
            <div className="field">
              <label>Age</label>
              <Dropdown
                placeholder='Age'
                name="age"
                compact
                selection
                options={ageRange()}
                onChange={handleFieldChange}
              />
            </div>
            <div className="field">
              <label>Profession</label>
              <Grid.Column>
                <Dropdown
                  name="profession"
                  placeholder='What is your current job title?'
                  onChange={handleFieldChange}
                  options={professionSelection}
                  selection
                  value={fields.profession}
                />
              </Grid.Column>
            </div>
            <div className="field">
              <label>Choose your top 5 skills</label>
              <Dropdown 
                name="topSkills"
                placeholder='Choose your top 5 skills' 
                className={`ui ${topSkills.length === 5 ? "disabled" : ""}`}
                fluid multiple selection options={skillSelection} 
                closeOnChange
                onChange={handleFieldChange} 
              />
                { topSkills.length === 5 &&
                  <div className="ui success form">
                    <div className="ui pointing above prompt label" role="alert" aria-atomic="true">
                      All set! Don't worry if your changed you mind. You can add or remove it later. 
                    </div>
                  </div>
                }
            </div>
            <div className="field">
              <label>Avatar</label>
                <Grid.Column>
                  <Dropdown
                    name="avatar"
                    placeholder='Choose avatar'
                    openOnFocus
                    selection
                    options={avatarSelection}
                    onChange={handleFieldChange}
                    value={fields.avatar}
                  />
                </Grid.Column>
            </div>
            <div className="field">
              <label>Password</label>
              <input 
                name="password" 
                placeholder="Password" 
                type="password" 
                autoComplete="current-password" 
                onChange={handleFieldChange}
                value={fields.password}
              />
            </div>
            <button type="submit" className="ui button blue">Signup</button>
          </form>
        </div>
    </div>
  );
}

export default SignUp;

