import React from 'react';
// import { useDispatch } from 'react-redux';
import IssueForm from './IssueForm';
import '../resources/NewIssueForm.css';

const NewIssueForm = props => {
  return (
    <div id="NewIssue-Container">
      <IssueForm 
        isUpdateForm={false} 
        displayContent={true} 
        newIssueForm={true}
        />
    </div>
  );
}

export default NewIssueForm;