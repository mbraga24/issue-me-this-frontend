const findIssueIds = userList => {
    return userList.map(item => item.issue_id)
}

export const findFavoriteIssues = (issues, userList) => {
  return issues.filter(issue => (findIssueIds(userList).includes(issue.id)))
}