import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Image, Icon } from 'semantic-ui-react'

const UserCard = props => {

  const currentUser = useSelector(state => state.user.keyHolder)
  const { id, first_name, last_name, job_title, picture, issues } = props.user
  // const imgUrl = `https://semantic-ui.com/images/avatar/large/${avatar}.jpg`

  return (
    <Card>
      <Image as={Link} to={`${currentUser ? `/account/${id}` : "/login"}`} src={picture} wrapped ui={true} size="medium" />
      <Card.Content>
        <Link to={`${currentUser ? `/account/${id}` : "/login"}`}>
          <Card.Header>{first_name} {last_name}</Card.Header>
        </Link>
        <Card.Description>
          Job Title: {job_title}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Link to={`${currentUser ? `/user-issues/${id}` : "/login"}`}>
          <Icon name='list alternate outline' size="large"/>
          {issues.length} {issues.length > 1 || issues.length === 0 ? "Issues" : "Issue"}
        </Link>
      </Card.Content>
    </Card>
  );
}

export default UserCard;