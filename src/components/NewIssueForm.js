import React from 'react';
import IssueForm from './IssueForm';
import '../resources/NewIssueForm.css';

const NewIssueForm = props => {

  return (
    <div id="NewIssue-Container">
      <IssueForm showBtn={true} displayHeader={true} />
    </div>
  );
}

export default NewIssueForm;