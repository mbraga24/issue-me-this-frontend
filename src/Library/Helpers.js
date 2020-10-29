const findIssueIds = (userList) => {
  if (userList[0].issue_id) {
    return userList.map(item => item.issue_id )
  } else {
    return userList.map(item => item.id )
  }
}

export const findFavoriteIssues = (issues, userList) => {
  return issues.filter(issue => (findIssueIds(userList).includes(issue.id)))
}