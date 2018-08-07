import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'

const UserList = ({ classes, users, handleToggle, checked }) => (
  <div className={classes.root}>
    <List>
      {users.map(user => (
        <ListItem
          key={user.id}
          button
          onClick={handleToggle(user.id)}
          className={classes.listItem}
        >
          <Checkbox
            checked={checked.indexOf(user.id) !== -1}
            tabIndex={-1}
            disableRipple
            className={classes.checkbox}
          />
          <ListItemText primary={`${user.name} (${user.username})`} />
        </ListItem>
      ))}
    </List>
  </div>
)

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    maxHeight: 400,
    position: 'relative',
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper
  },
  listItem: {
    paddingTop: '0px',
    paddingBottom: '0px'
  },
  checkbox: {
    width: '30px',
    height: '30px'
  }
})

export default withStyles(styles)(UserList)
