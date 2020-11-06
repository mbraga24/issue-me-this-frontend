import React from 'react';
import { Highlight } from 'react-fast-highlight';

const CreateHighlight = props => {

  let arrayString = props.dataString.split("```")
  
  const returnHighlight = () => {
    return arrayString.map((element, index) => {
      if(index % 2 !== 0) {
        return <Highlight className={`${props.user && `Copy-Clipboard-${props.user.first_name}-${props.user.last_name}-${props.user.id}`}`} languages={[`${props.syntax}`]}>{element}</Highlight>
      } else {
        return element
      }
    })
  }
  
  return ( returnHighlight() )
}

export default CreateHighlight;