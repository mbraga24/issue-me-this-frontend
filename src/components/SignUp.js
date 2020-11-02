import React from 'react';
import AccountForm from './AccountForm';

const Signup = props => {
  return (
    <AccountForm createAccount={true} header="Create Account" createBtn={true} />
  )
}

export default Signup;