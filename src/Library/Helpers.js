export const findIds = (userList, pathname) => {
  return userList.map(item => item.issue_id)
}

export const findIssues = (issues, issueIds) => {
  return issues.filter(issue => (issueIds.includes(issue.id)))
}