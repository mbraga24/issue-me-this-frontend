import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Image, Icon } from 'semantic-ui-react'
import '../resources/UserCard.css';

const UserCard = props => {

  const currentUser = useSelector(state => state.user.keyHolder)
  const { id, first_name, last_name, job_title, profile_picture, issues } = props.user

  return (
    <Card id="UserCard-Container" className="Card-Size">
      <Image className="Card-Image" as={Link} to={`${currentUser ? `/account/${id}` : "/login"}`} src={profile_picture.image_url} wrapped ui={true} size="medium" />
      <Card.Content>
        <Link to={`${currentUser ? `/account/${id}` : "/login"}`}>
          <Card.Header>{first_name} {last_name}</Card.Header>
        </Link>
        <Card.Description>
          {job_title}
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