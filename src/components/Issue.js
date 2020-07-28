import React from 'react';

const Issue = (props) => {

    const user_name = props.user.name
    const user_avatar = props.user.avatar
    const total_comments = props.comment.length
    const { title, issue_body } = props.issue

    return (

      // <div className="ui card fluid">
        // <div className="content">
        //   <div className="header">
        //     {title}
        //     <img src={user_avatar} alt={user_name} className="ui mini right floated image" />
        //   </div>
        // </div>
        // <div className="content">
        //   <div className="description">
        //     {issue_body}
        //   </div>
        // </div>
        // <div className="extra content">
        //   <i aria-hidden="true" className="edit icon"></i>
        //   {total_comments} Comments
        // </div>
      //   <div class="ui blue buttons">
      //     <button class="ui button">One</button>
      //     <button class="ui button">Two</button>
      //   </div>
      // </div>

      <div class="ui celled grid">
        <div class="row">
          {/* <div class="three wide column"> */}
            {/* <img src="https://react.semantic-ui.com/images/wireframe/image.png" class="ui image" /> */}
          {/* </div> */}
          <div class="sixteen wide column ui card">
            <div className="content">
              <div className="header">
                {title}
                <img src={user_avatar} alt={user_name} className="ui mini right floated image" />
              </div>
            </div>
            <div className="content">
              <div className="description">
                {issue_body}
              </div>
            </div>
            <div className="extra content">
              <i aria-hidden="true" className="edit icon"></i>
              {total_comments} Comments
            </div>
          </div>
          {/* <div class="ui horizontal segments">
            <div class="ui blue buttons">
              <button class="ui button">Delete</button>
              <button class="ui button">Edit</button>
            </div>
          </div> */}
          <div class="row">
            <div class="five wide column">
              <div class="ui buttons" style={{padding: "10px"}}>
                <button class="ui red button">Delete</button>
                <button class="ui olive button">Edit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Issue;