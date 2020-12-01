import React from 'react';
import { Container, Header } from 'semantic-ui-react'
import '../resources/MissingTemplate.css';

const MissingTemplate = props => {

  return (
    <Container className={props.center ? "Top-Center" : "Middle-Center"}>
      <Header textAlign="center" color="teal" as='h1'>{props.header}</Header>
    </Container>
  );
}

export default MissingTemplate;

