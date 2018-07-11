import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import { requestGetAllUsers } from '../../reducers/usersReducer'
import { requestAddBoardMembers } from '../../reducers/userBoardsReducer'

class AddBoardMembers extends Component {
  componentDidMount() {
    this.props.requestGetAllUsers()
  }
  addMembers = e => {
    e.preventDefault()
    this.props.requestAddBoardMembers()
  }
  render() {
    const { classes, users } = this.props
    console.log(users)
    return (
      <Fragment>
        <Modal open={true}>
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" id="modal-title">
              Text in a modal
            </Typography>
            <Button onClick={this.props.closeAddMember}>Close Modal</Button>
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
