import React, { Component } from 'react';
// import './NewIssueForm.css';

class NewIssueForm extends Component {

  state = {
    title: "",
    issueBody: ""
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  addIssue = (event) => {
    event.preventDefault()

    const newIssue = {
      title: this.state.title,
      issue_body: this.state.issueBody
    }
    
    fetch("http://localhost:3000/issues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newIssue)
    })
    .then(r => r.json())
    .then(newData => {
      // still need to add to the database
      console.log(newData)
      // this.props.handleNewIssue(newData)
    })
    
  }

  render() {
    // console.log("NewIssueForm ====> ", this.state) 
    return (
       <div className="NewIssueForm">
        <h1 class="ui header">Issue Away</h1>
        <form className="ui large form" onSubmit={this.addIssue}>
          <div className="equal width fields">
            <div className="field">
              <label>Title</label>
              <input style={{width:"600px"}} name="title" placeholder="Issue title" onChange={this.handleOnChange} value={this.state.title} />
            </div>
          </div>
          <div className="five field">
              <label>Issue</label>
              <textarea 
                placeholder="Share your issue and let others in our community help you find a solution" 
                name="issueBody" 
                rows="10"
                onChange={this.handleOnChange}
                value={this.state.issueBody} />
            </div>
          <button type="submit" className="ui button">Submit Issue</button>
          <div className="ui hidden divider"></div>
        </form>
      </div>
    );
  }
}

export default NewIssueForm;