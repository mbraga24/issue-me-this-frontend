import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Button, Segment, Dropdown, Label, Header } from 'semantic-ui-react'
import { avatarOptions } from '../Library/avatar';
import { DateInput } from 'semantic-ui-calendar-react';
import useFormFields from '../hooks/useFormFields';
import Loading from './Loading';
import '../resources/SignUp.css';
import { ADD_USER, SET_KEY_HOLDER, UPDATE_USER, UPDATE_FIRST_NAME, UPDATE_LAST_NAME, UPDATE_EMAIL, UPDATE_JOB_TITLE, UPDATE_AVATAR, UPDATE_TOP_SKILLS, UPDATE_BIRTHDAY } from '../store/type';

const AccountForm = props => {

  const currentUser = useSelector(state => state.user.keyHolder)
  const skills = useSelector(state => state.skill.skills)
  const dispatch = useDispatch()
  const [ avatar, setAvatar ] = useState(null)
  const [ dateInput, setDateInput ] = useState("")

  const [ topSkills, setTopSkills ] = useState([])
  const [ newSkills, setNewSkills ] = useState([])
  const [ removeSkills, setRemoveSkills ] = useState([])

  const [ skillSelection, setSkillSelection ] = useState([])
  const [ avatarSelection, setAvatarSelection ] = useState([])
  const [ alertHeader, setAlertHeader ] = useState("")
  const [ alertStatus, setAlertStatus ] = useState(false)
  const [ message, setMessage ] = useState([])
  const [ fields, handleFieldChange ] = useFormFields({
    email: "",
    firstName: "",
    lastName: "",
    jobTitle: "",
    password: ""
  })

  const updateFields = () => { 
    if (fields.firstName === "") {
      fields.firstName = currentUser.first_name
    } 
    if (fields.lastName === "") {
      fields.lastName = currentUser.last_name
    } 
    if (fields.email === "") {
      fields.email = currentUser.email
    } 
    if (fields.jobTitle === "") {
      fields.jobTitle = currentUser.job_title
    } 
    if (topSkills.length === 0) {
      setTopSkills(() => currentUser.skills.map(skill => skill.key))
    } 
    if (avatar === null) {
      setAvatar(currentUser.avatar)
    } 
    if (dateInput === "") {
      setDateInput(currentUser.birthday)
    } 

    dispatch({ type: UPDATE_FIRST_NAME, payload: fields.firstName })
    dispatch({ type: UPDATE_LAST_NAME, payload: fields.lastName })
    dispatch({ type: UPDATE_EMAIL, payload: fields.email })
    dispatch({ type: UPDATE_JOB_TITLE, payload: fields.jobTitle })
    dispatch({ type: UPDATE_TOP_SKILLS, payload: topSkills })
    dispatch({ type: UPDATE_AVATAR, payload: avatar })
    dispatch({ type: UPDATE_BIRTHDAY, payload: dateInput })
  }

  (!props.createAccount && currentUser) && updateFields()

  useEffect(() => {
    setSkillSelection(skills)
    setAvatarSelection(avatarOptions())
  }, [skills])

  const handleSkillInput = (event, value) => {
    if (topSkills.length === 0 || topSkills.length < 5) {
      setTopSkills(value)

      if (currentUser) {
        const skill = value[value.length - 1]   
        const unchangedUserSkills = currentUser.skills.map(skill => skill.key)
        const skillsBeforeUpdate = topSkills

        if (!topSkills.includes(skill) && !unchangedUserSkills.includes(skill)) { 
          setNewSkills([...newSkills, skill]) 
          const updateRemoveSkills = removeSkills.filter(s => s !== skill)
          setRemoveSkills(updateRemoveSkills)
        }
        if (removeSkills.includes(skill)) {
          const updateRemoveSkills = removeSkills.filter(s => s !== skill)
          setRemoveSkills(updateRemoveSkills)
        }
      
        if (value.length === skillsBeforeUpdate.length-1) {
          const removedSkill = skillsBeforeUpdate.filter(skill => { return value.indexOf(skill) === -1 })[0];

          if (unchangedUserSkills.includes(removedSkill) && !removeSkills.includes(removedSkill)) { 
            setRemoveSkills([...removeSkills, removedSkill]) 
          } 
          if (topSkills.includes(removedSkill)) {
            const updateNewSkills = newSkills.filter(s => s !== removedSkill)
            setNewSkills([...updateNewSkills])
          }
        }
      }
    } else {
      const removeSkill = topSkills.pop()
      const keepSkills = topSkills.filter(skill => skill !== removeSkill)
      setTopSkills([...keepSkills])
    }
  }

  const handleInputAvatar = (event) => setAvatar(event.target.textContent)

  const createAccount = (event) => {
    event.preventDefault()

    const newUser = {
      email: fields.email,
      first_name: fields.firstName,
      last_name: fields.lastName,
      job_title: fields.jobTitle,
      top_skills: topSkills,
      birthday: dateInput,
      avatar: avatar,
      password: fields.password
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
      if (data.errorStatus) {
        handleMessages(data)
      } else {
        const { user, token } = data
        dispatch({ type: ADD_USER, payload: user })
        dispatch({ type: SET_KEY_HOLDER, payload: user })
        localStorage.token = token
        props.history.push('/issues')
      }
    })
  }

  const updateAccount = event => {
    event.preventDefault()
    
    const updateUser = {
      first_name: fields.firstName,
      last_name: fields.lastName,
      email: fields.email,
      job_title: fields.jobTitle,
      new_skills: newSkills,
      remove_skills: removeSkills,
      avatar: avatar,
      birthday: dateInput,
      password: fields.password
    }

    fetch(`http://localhost:3000/users/${currentUser.id}`, {
      method: "PATCH",  
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateUser)
    })
    .then(r => r.json())
    .then(data => {
      if (data.errorStatus) {
        handleMessages(data)
      } else {
        const { user } = data
        dispatch({ type: UPDATE_USER, payload: user })
        props.history.push(`/account/${currentUser.id}`)
      }
    })
  }

  const handleDateChange = (name, value) => {
    setDateInput(value.split("-").join("/"))
  }

  const handleMessages = data => {
    setAlertHeader(data.header)
    setAlertStatus(true)
    handleDismissCountDown()
    setMessage(data.error)
  }

  const renderAlertMessage = () => {
    return message.map(message => <li className="content">{message}</li> )
  }

  const handleDismissOnClick = () => {
    setAlertStatus(false)
  }

  const handleDismissCountDown = () => {
    setTimeout(() => {
      setAlertStatus(false)
    }, 4000)
  }

  return (
    <div id="SignUp-Container">
      {
      skills ?
      <Segment raised className="SignUp-Segment">
        <Form onSubmit={props.createAccount ? createAccount : updateAccount}>
          <Header as='h1' textAlign="center" className="SignUp-Header">{props.header}</Header>
          <Form.Group>
            <Form.Input 
              width={8} 
              name="firstName" 
              label='First Name' 
              placeholder="First Name" 
              onChange={handleFieldChange} 
              defaultValue={!props.createAccount ? fields.firstName : undefined} 
            />
            <Form.Input 
              width={8} 
              name="lastName" 
              label='Last Name' 
              placeholder='Last Name' 
              onChange={handleFieldChange} 
              defaultValue={!props.createAccount ? fields.lastName : undefined} 
            />
          </Form.Group>
          <Form.Group>
            <Form.Input 
              width={10} 
              name="jobTitle" 
              label='Job Title' 
              placeholder='Job Title' 
              onChange={handleFieldChange} 
              defaultValue={!props.createAccount ? fields.jobTitle : undefined} 
            />
            <DateInput
              width={10} 
              name="date"
              label="Date of Birth"
              dateFormat="MM-DD-YYYY"
              placeholder="mm/dd/yyyy"
              value={dateInput}
              iconPosition="left"
              animation={false}
              defaultValue={!props.createAccount ? dateInput : undefined} 
              onChange={(e, {name, value}) => handleDateChange(name, value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input 
              width={16} 
              name="topSkills" 
              label='Choose Your Top 5 Skills' 
              placeholder='Skills' 
            >
            <Dropdown 
              name="topSkills"
              placeholder='Choose your top 5 skills' 
              className={`ui ${props.createAccount && topSkills.length === 5 ? "disabled" : ""}`}
              fluid 
              multiple 
              selection 
              closeOnChange
              options={skillSelection} 
              onChange={(event, {value}) => handleSkillInput(event, value)} 
              value={topSkills}
            />
            </Form.Input>
          </Form.Group>
          { 
            props.createAccount && topSkills.length === 5 ?
            <Label pointing prompt color="green">
              All set! If you change your mind you can always add or remove it later. 
            </Label> :
            topSkills.length === 5 &&
            <Label pointing prompt color="green">
              All set! If you wish to add more skills subscribe to become a member and add up to 10 top skills. 
            </Label>
          }
          <Form.Group>
            <Form.Input label='Avatar' placeholder='Avatar' width={16} >
              <Dropdown
                name="avatar"
                placeholder='Choose avatar'
                openOnFocus
                selection
                options={avatarSelection}
                onChange={handleInputAvatar}
                value={avatar}
                defaultValue={!props.createAccount ? avatar : undefined}
              />
            </Form.Input>
          </Form.Group>
          <Form.Group>
            <Form.Input 
              width={16} 
              name="email" 
              label='Email' 
              placeholder='Email' 
              onChange={handleFieldChange}
              defaultValue={!props.createAccount ? fields.email : undefined} 
            />

          </Form.Group>
          <Form.Group>
            <Form.Input type="password" label='Password' placeholder='Password' width={16} name="password" onChange={handleFieldChange}/>
          </Form.Group>
          <Button type='submit' color="green">{props.createBtn ? "Create Account" : "Update Account"}</Button>
          {
            (alertStatus && !!message) && 
              <div className="ui negative message">
                <i className="close icon" onClick={handleDismissOnClick}></i>
                <div className="header">
                  {alertHeader}
                </div>
                <ul className="list">
                  {message.length !== 0 ? renderAlertMessage() : null}
                </ul>
              </div>
            }
        </Form>
      </Segment> : <Loading loadingClass={true} /> 
      }
    </div>
  );
}

export default withRouter(AccountForm);

