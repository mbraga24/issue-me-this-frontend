export const avatarOptions = () => {
  const avatarNames = ["ade", "chris", "christian", "daniel", "elliot", "helen", "jenny", "joe", "justen", "laura", "matt", "nan", "steve", "stevie", "veronika"] 
  const avatars = avatarNames.map(avatar => {
    return {
      key: `${avatar}`,
      text: `${avatar}`,
      value: `${avatar}`,
      image: { avatar: true, src: `https://semantic-ui.com/images/avatar/large/${avatar}.jpg` },
    }
  })
  return avatars
}
