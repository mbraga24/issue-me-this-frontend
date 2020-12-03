import React from 'react';
import { Header } from 'semantic-ui-react'
import IssueForm from './IssueForm';
import '../resources/NewIssue.css';

const NewIssue = props => {
  return (
    <div id="NewIssue-Container">
      <Header as='h1' textAlign="center" color="teal" className="NewIssue-Header">What's your issue?</Header>
      <IssueForm 
        isUpdateForm={false} 
        displayContent={true} 
        newIssueForm={true}
        />
    </div>
  );
}

export default NewIssue;