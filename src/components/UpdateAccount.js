import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DateInput } from 'semantic-ui-calendar-react';
import { Form, Header, Icon, Divider, Button, Image, Dropdown, Label } from 'semantic-ui-react';
import { UPDATE_USER  } from '../store/type';
import useFormFields from '../hooks/useFormFields';
import '../resources/UpdateAccount.css';

const UpdateAccount = props => {

  const dispatch = useDispatch()
  const [ uploadStatus, setUploadStatus ] = useState(false)
  const [ btnUploadStatus, setBtnUploadState ] = useState(false)
  const [ btnLoading, setBtnLoading ] = useState(false)
  const [ disableBtn, setDisableBtn ] = useState(true)
  const [ changeDate, setChangeDate ] = useState(null)
  const [ tempImage, setTempImage ] = useState(null)
  const [ skillSelection, setSkillSelection ] = useState([])
  const [ dateInput, setDateInput ] = useState("")
  const [ file, setFile ] = useState(null)
  
  const [ topSkills, setTopSkills ] = useState([])
  const [ newSkills, setNewSkills ] = useState([])
  const [ removeSkills, setRemoveSkills ] = useState([])

  const skills = useSelector(state => state.skill.skills)
  const currentUser = useSelector(state => state.user.keyHolder)
  const [ alertHeader, setAlertHeader ] = useState("")
  const [ alertStatus, setAlertStatus ] = useState(false)
  const [ message, setMessage ] = useState([])
  const [ fields, handleFieldChange ] = useFormFields({
    firstName: null,
    lastName: null,
    jobTitle: null,
    email: null,
    password: null,
    picture: null,
  })

  useEffect(() => {
    setSkillSelection(skills)
    setDateInput(currentUser.birthday)
    setTopSkills(() => currentUser.skills.map(skill => skill.key))
  }, [skills, currentUser, skillSelection])

  useEffect(() => {
    if (fields.firstName || fields.lastName || fields.jobTitle || fields.email || fields.password || topSkills.length === 4 || changeDate) {
      setDisableBtn(false)
    } 
  }, [fields.firstName, fields.lastName, fields.jobTitle, fields.email, fields.password, topSkills, changeDate])

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

  const handleDateChange = (name, value) => {
    setChangeDate(value)
    setDateInput(value.split("-").join("/"))
  }

  const handleSkillInput = (event, value) => {
    
    if (topSkills.length === 0 || topSkills.length < 6) {
      setTopSkills(value)

      if (currentUser) {
        const skill = value[value.length - 1]   
        const unchangedUserSkills = currentUser.skills.map(skill => skill.key)
        const skillsBeforeUpdate = topSkills
        console.log("skillsBeforeUpdate ->", skillsBeforeUpdate)

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

  const fileChange = e => {
    setFile(e.target.files[0])
    setTempImage(URL.createObjectURL(e.target.files[0]))
    setBtnUploadState(true)
  };

  const handleSubmit = e => {
    e.preventDefault()
    setBtnLoading(true)
  
    const updateUser = {
      first_name: fields.firstName ? fields.firstName : currentUser.first_name,
      last_name: fields.lastName ? fields.lastName : currentUser.last_name,
      email: fields.email ? fields.email : currentUser.email,
      job_title: fields.jobTitle ? fields.jobTitle : currentUser.job_title,
      new_skills: newSkills,
      remove_skills: removeSkills,
      birthday: dateInput,
      password: fields.password
    }

    console.log("updateUser -->", updateUser)

    fetch(`http://localhost:3000/users/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
        // "Accept": "application/json"
      },
      body: updateUser
    })
    .then(r => r.json())
    .then(data => {
      if (data.errorStatus) {
        setBtnLoading(false)
        console.log("ERROR UPDATING ->", data)
        handleMessages(data)
      } else {
        setBtnLoading(false)
        console.log("SUCCESSFULLY UPDATED ->", data)
        const { user } = data
        dispatch({ type: UPDATE_USER, payload: user })
        props.history.push(`/account/${currentUser.id}`)
      }
    })
  }

  const imageUpload = e => {
    setUploadStatus(true)
    // FormData attributes 
    const formData = new FormData();

    formData.append("profile_picture", file);

    fetch(`http://localhost:3000/users/${currentUser.id}/upload_photo`, {
      method: "POST",
      body: formData
    })
    .then(r => r.json())
    .then(userImage => {
      setUploadStatus(false)
      dispatch({ type: UPDATE_USER, payload: userImage })
    })
  }

  console.log("FILE -->", file)

  return (
    <div id="UpdateAccount-Container">
      <Header as='h1' textAlign="center" color="blue" className="UpdateAccount-Header">Update Account</Header>
      <Divider />
      <div className="UpdateAccount-FormWrapper">
          <Form onSubmit={imageUpload}>
            <Form.Group className="Form-Group-Alignment">
              <Form.Field className="Signup-Profile-Picture-Item Circular">
                <Image src={btnUploadStatus ? tempImage : "/default-profile.jpg"} size='small'   
                  className="Circular-Img"
                />
              </Form.Field>
            </Form.Group>
            <Form.Group className="Form-Group-Alignment">
              <Form.Field className="Signup-Profile-Picture-Item">
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  id="file"
                  name="file"
                  hidden
                  onChange={fileChange}
                />
                <div>
                  {
                    !btnUploadStatus ?
                    <Button type="button" as="label" htmlFor="file" className="Upload-Btn-Size">
                      <Icon name="desktop" />
                      Choose a profile picture
                    </Button> :
                    <Button type="submit" color="blue" className={`${uploadStatus && "loading"} Upload-Btn-Size`}>
                      {uploadStatus ? "Loading" : "Confirm Profile Picture"}
                    </Button>
                  }
                </div>
              </Form.Field>
            </Form.Group>
          </Form>

        <Form onSubmit={handleSubmit}>
          <Form.Group widths={2}>
            <Dropdown 
              name="topSkills"
              placeholder='Choose your top 5 skills' 
              className="ui"
              fluid 
              multiple 
              selection 
              closeOnChange
              options={skillSelection} 
              onChange={(event, {value}) => handleSkillInput(event, value)} 
              value={topSkills}
            />
          </Form.Group>
          {
            topSkills.length === 5 &&
            <Label pointing prompt color="green">
              All set! If you wish to add more skills subscribe to become a member and add up to 10 top skills. 
            </Label>
          }
          <Form.Group widths={2}>
            <Form.Input 
              fluid
              onChange={handleFieldChange}
              name="firstName"
              className="UpdateAccount-Form" 
              label='First name' 
              placeholder='First name'
              defaultValue={fields.firstName ? fields.firstName : currentUser.first_name}
            />
            <Form.Input 
              fluid
              onChange={handleFieldChange}
              name="lastName"
              className="UpdateAccount-Form" 
              label='Last name' 
              placeholder='Last name'
              defaultValue={fields.firstLast ? fields.firstLast : currentUser.last_name}
            />
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Input 
              name="jobTitle"
              fluid
              onChange={handleFieldChange}
              className="UpdateAccount-Form" 
              label='Job Title' 
              placeholder='Job Title' 
              defaultValue={fields.jobTitle ? fields.jobTitle : currentUser.job_title}
            />
            <DateInput
              name="date"
              label="Date of Birth"
              dateFormat="MM-DD-YYYY"
              placeholder="mm/dd/yyyy"
              value={dateInput}
              iconPosition="right"
              animation={false}
              defaultValue={dateInput} 
              onChange={(e, {name, value}) => handleDateChange(name, value)}
            />
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Input 
              name="email"
              fluid
              onChange={handleFieldChange}
              className="UpdateAccount-Form" 
              label='Email' 
              placeholder='Email' 
              defaultValue={fields.email ? fields.email : currentUser.email}
              />
            <Form.Input 
              type="password"
              name="password"
              fluid
              onChange={handleFieldChange}
              className="UpdateAccount-Form" 
              label='Password' 
              placeholder='Password' 
              value={fields.password}
              />
          </Form.Group>
          <Form.Field className="Submit-Button-Wrapper">
            <Button type="submit" className={`${disableBtn && "disabled"}  ${btnLoading && !disableBtn ? "loading disabled" : ""} UpdateAccount-Button-Color`}>{btnLoading ? "Loading" : "Save changes"}</Button>
          </Form.Field>
          <Form.Group widths='equal'>
            <Form.Field>
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
            </Form.Field>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default withRouter(UpdateAccount);