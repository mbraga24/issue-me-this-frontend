import React from 'react';
import IssueForm from './IssueForm';
import '../resources/NewIssueForm.css';

const NewIssueForm = props => {

  return (
    <div id="NewIssue-Container">
      <IssueForm displayContent={true} isUpdateForm={false} />
    </div>
  );
}

export default NewIssueForm;