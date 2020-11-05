import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, Icon } from 'semantic-ui-react'

const UserCard = props => {

  const { id, first_name, last_name, job_title, avatar, issues } = props.user
  const imgUrl = `https://semantic-ui.com/images/avatar/large/${avatar}.jpg`

  return (
    <Card>
      <Link to={`/account/${id}`}>
        <Image src={imgUrl} wrapped ui={true} />
      </Link>
      <Card.Content>
        <Link to={`/account/${id}`}>
          <Card.Header>{first_name} {last_name}</Card.Header>
        </Link>
        <Card.Description>
          <p className="description">Job Title: {job_title}</p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Link to={`/view-issues/user/${id}`}>
          <Icon name='list alternate outline' size="large"/>
          {issues.length} {issues.length > 1 || issues.length === 0 ? "Issues" : "Issue"}
        </Link>
      </Card.Content>
    </Card>
  );
}

export default UserCard;