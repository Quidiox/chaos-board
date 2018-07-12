import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import { requestGetAllUsers } from '../../reducers/usersReducer'
import { requestAddBoardMembers } from '../../reducers/userBoardsReducer'
import UserList from './UserList'

class AddBoardMembers extends Component {
  componentDidMount() {
    this.props.requestGetAllUsers()
  }
  addMembers = e => {
    e.preventDefault()
    this.props.requestAddBoardMembers()
  }
  render() {
    const { classes, open, users } = this.props
    return (
      <Fragment>
        <Modal open={open}>
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" id="modal-title">
              Users: 
            </Typography>
            <UserList users={users}/>
            <Button onClick={this.props.closeAddMember}>Close</Button>
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
  bindActionCreators({ requestGetAllUsers, requestAddBoardMembers }, dispatch)

const mapStateToProps = state => ({
  users: state.users
})

AddBoardMembers = connect(mapStateToProps, mapDispatchToProps)(AddBoardMembers)

export default withStyles(styles)(AddBoardMembers)
