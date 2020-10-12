import { useState } from 'react';

export default initialState => {
  const [ fields, setValues ] = useState(initialState)
  console.log("USEFORMFIELD - FIELDS --->", fields)
  return [
    fields,
    function(event) {
      console.log("USEFORMFIELD - event.target --->", event.target)
      console.log("USEFORMFIELD - event.target.value --->", event.target.value)
      console.log("USEFORMFIELD - event.target.textContent --->", event.target.textContent)
      setValues({
        ...fields,
        [event.target.name]: event.target.value
      })
    }
  ]
}