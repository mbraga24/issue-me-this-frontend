const findIssueIds = userList => {
    return userList.map(item => item.issue_id)
}

// if i figure out a way to find the like_issues and favorite issues of the currentUser 
// with one function I can combine all components

// currentUser.like_issues
// currentUser.favorites
export const findIssues = (issues, userList) => {
  return issues.filter(issue => (findIssueIds(userList).includes(issue.id)))
}