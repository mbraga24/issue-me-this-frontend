export const findIds = (userList, pathname) => {
  if (pathname === "/view") {
    return userList.map(item => item.id)
  } else {
    return userList.map(item => item.issue_id)
  }
}

export const findIssues = (issues, issueIds) => {
  return issues.filter(issue => (issueIds.includes(issue.id)))
}