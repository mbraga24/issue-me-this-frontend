import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import '../resources/SideBar.css';
import { SET_KEY_HOLDER } from '../store/type';

const SideBar = props => {

  const currentUser = useSelector(state => state.user.keyHolder)
  const dispatch = useDispatch()
  
  const handleLogout = () => {
    // remove token from localStorage
    localStorage.removeItem("token")
    // set currentUser state back to null
    dispatch({ type: SET_KEY_HOLDER, payload: null })
  }

  return (
    <div className={`ui vertical inverted overlay left animating sidebar menu ${props.toggleMenu ? 'visible' : 'hidden'}`}>
      {currentUser ? (
        <>
          <Link to="/login" className="item" onClick={handleLogout}>
            Logout
            <i className="large sign-out alternate icon"></i>
          </Link>  
          <Link to="/issues/new" className="item">
            New Issue
            <i className="large pen square icon"></i>
          </Link>     
        </>
        ) : (
        <>
          <Link to="/signup" className="item">
            Signup
            <i className="large write square icon"></i>
          </Link>
          <Link to="/login" className="item">
            Login
            <i className="large sign-in alternate icon"></i>
          </Link>
        </>
      )}

      <Link to="/issues" className="item">
        Issues
        <i className="large list alternate outline icon"></i>
      </Link>
      <Link to="/users" className="item">
        Users
        <i className="large users icon"></i>
      </Link>
    </div>
  );
}

export default SideBar;