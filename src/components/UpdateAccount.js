import React from 'react';
import AccountForm from './AccountForm';

const UpdateAccount = props => {
  return (
    <AccountForm createAccount={false} header="Update Account" createBtn={false} />
  )
}

export default UpdateAccount;