function formatString (specialStr) {
  let specialCharacter = '`'
  let tagCount = 0;
  let threeCount =  3;
  let openClose = false;
  let formattedString = []

  for (let i = 0; i < specialStr.length; i++) {
    if (specialStr[i] === specialCharacter) {
      threeCount--;
      if (threeCount === 0 && openClose === false) {
        formattedString.push(specialStr.split("```")[tagCount])
        formattedString.push("<Highlight>")
      
        // keep track of openClose variable to determine when to open and close element
        openClose = true;
        // open <Highlight> component 
        threeCount = 3; 
        tagCount++
      }

      if (threeCount === 0 && openClose === true) {
        formattedString.push(specialStr.split("```")[tagCount])
        formattedString.push("</Highlight>")
        openClose = false;
        // Close </Highlight> component 
        threeCount = 3;
        tagCount++
      }
    }
  }

  return formattedString.join("");
}

export default formatString;