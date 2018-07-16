import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import { requestGetAllUsers } from '../../reducers/usersReducer'
import { requestChangeBoardMembers } from '../../reducers/boardReducer'
import UserList from './UserList'

class ChangeBoardMembers extends Component {
  state = { checked: [] }
  componentDidMount() {
    this.props.requestGetAllUsers()
  }
  changeMembers = e => {
    e.preventDefault()
    this.props.requestChangeBoardMembers({
      boardId: this.props.boardId,
      members: this.state.checked
    })
    this.props.closeChangeMembers()
  }
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
    const { classes, open, users, closeChangeMembers } = this.props
    const { checked } = this.state
    return (
      <Fragment>
        <Modal open={open}>
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" id="modal-title">
              Users:
            </Typography>
            <UserList
              users={users}
              handleToggle={this.handleToggle}
              checked={checked}
            />
            <Button onClick={this.changeMembers}>Submit</Button>
            <Button onClick={closeChangeMembers}>Close</Button>
          </div>
        </Modal>
      </Fragment>
    )
  }
}

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestGetAllUsers, requestChangeBoardMembers }, dispatch)

const mapStateToProps = state => ({
  users: state.users
})

ChangeBoardMembers = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeBoardMembers)

export default withStyles(styles)(ChangeBoardMembers)
