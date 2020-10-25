<Grid.Row>
  <Grid.Column className="ShowIssue-Wrap" width={12}>
      <Card fluid raised>
        <Card.Content className="ShowIssue-Content">
          <Link to={`/users/${currentIssue.user.id}`}>
            <Image
              floated='right'
              size='big'
              avatar
              alt={`${currentIssue.user.first_name} ${currentIssue.user.last_name}`}
              src={`https://semantic-ui.com/images/avatar/small/${currentIssue.user.avatar}.jpg`}
            />
          </Link>
          <Card.Header>
            {currentIssue.title}
          </Card.Header>
          <Divider clearing />
          <Card.Description className="ShowIssue-Issue-Body">
            {
              <CreateHighlight dataString={currentIssue.issue_body} syntax={currentIssue.syntax} />
            }
          </Card.Description>
        </Card.Content>
        {
          currentUser && currentUser.id === currentIssue.user.id &&
            <Card.Content extra>
            <div className='ui two buttons'>
              <Button as={Link} to={'/home'} inverted color='green'>
                Edit
              </Button>
              <Button inverted color='red' onClick={deleteIssue}>
                Delete
              </Button>
            </div>
          </Card.Content>
        }
      </Card>
  </Grid.Column>
</Grid.Row>