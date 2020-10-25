import React from 'react';
import { Highlight } from 'react-fast-highlight';

const CreateHighlight = props => {
  let arrayString = props.dataString.split("```")
  
  const returnHighlight = () => {
    return arrayString.map((element, index) => {
      if(index % 2 !== 0) {
        return <Highlight languages={[`${props.syntax}`]}>{element}</Highlight>
      } else {
        return element
      }
    })
  }

  return ( returnHighlight() )
}

export default CreateHighlight;