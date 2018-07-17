import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import { requestGetAllUsers } from '../../reducers/usersReducer'
import {
  requestChangeBoardMembers,
  requestFetchBoardAndMembers
} from '../../reducers/boardReducer'
import UserList from './UserList'

class ChangeBoardMembers extends Component {
  state = { checked: [], initialChecked: false }
  async componentDidMount() {
    await this.props.requestGetAllUsers()
    await this.props.requestFetchBoardAndMembers({
      boardId: this.props.boardId
    })
    await this.setState({ initialChecked: true })
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
    const checked =
      this.state.initialChecked && this.props.board && this.props.board.members
        ? this.props.board.members
        : this.state.checked
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]
    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }
    this.setState({
      checked: newChecked,
      initialChecked: false
    })
  }
  render() {
    const { classes, open, users, board, closeChangeMembers } = this.props
    let checked =
      this.state.initialChecked && board.members
        ? board.members
        : this.state.checked
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

const mapDispatchToProps = {
  requestFetchBoardAndMembers,
  requestChangeBoardMembers,
  requestGetAllUsers
}

const mapStateToProps = state => ({
  users: state.users,
  board: state.board
})

ChangeBoardMembers = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeBoardMembers)

export default withStyles(styles)(ChangeBoardMembers)
