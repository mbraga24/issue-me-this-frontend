<div className="ui container Login-container" onSubmit={handleSubmit}>
        <div className="ui grid">
          <form className="ui form six wide column centered raised segment Login-form">
            <h1 className="ui center aligned header">Login</h1>
            <div className="field">
              <label>Email</label>
              <input name="email" placeholder="email" onChange={handleFieldChange} />
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" name="password" autoComplete="current-password" placeholder="Password" onChange={handleFieldChange} />
            </div>
            <button type="submit" className="ui button green">Login</button>
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
          </form>
        </div>
    </div>