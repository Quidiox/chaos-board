import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'

class UserList extends Component {
  state = { checked: [] }

  handleToggle = value => () => {
    const { checked } = this.state
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]
    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }
    this.setState({
      checked: newChecked
    })
  }

  render() {
    const { classes, users } = this.props
    console.log(this.state)
    return (
      <div className={classes.root}>
        <List>
          {users.map(user => (
            <ListItem
              key={user.id}
              button
              onClick={this.handleToggle(user.id)}
              className={classes.listItem}
            >
              <Checkbox
                checked={this.state.checked.indexOf(user.id) !== -1}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={`${user.name} (${user.username})`} />
            </ListItem>
          ))}
        </List>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    maxHeight: 200,
    position: 'relative',
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper
  },
  listItem: {
    paddingTop: '0px',
    paddingBottom: '0px'
  }
})

export default withStyles(styles)(UserList)
