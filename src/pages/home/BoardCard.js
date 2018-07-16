import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Edit from '../common/Edit'
import BoardDropdownMenu from './BoardDropdownMenu'
import ChangeBoardMembers from './ChangeBoardMembers'
import {
  requestEditBoard,
  requestDeleteBoard
} from '../../reducers/userBoardsReducer'

class BoardCard extends Component {
  state = {
    hovering: false,
    editing: false,
    title: this.props.title,
    changeMembersOpen: false
  }
  handleMouseHover = e => {
    if (e.type === 'mouseenter') this.setState({ hovering: true })
    if (e.type === 'mouseleave') this.setState({ hovering: false })
  }
  editBoard = () => {
    this.setState({ editing: true })
  }
  endEdit = () => {
    this.props.requestEditBoard({
      title: this.state.title,
      boardId: this.props.id
    })
    this.setState({
      hovering: false,
      editing: false
    })
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  close = e => {
    e.preventDefault()
    this.setState({ editing: false, title: this.props.title })
  }
  deleteBoard = () => {
    this.props.requestDeleteBoard({
      boardId: this.props.id
    })
    this.setState({ hovering: false })
  }
  openChangeMembers = () => {
    this.setState({ changeMembersOpen: true })
  }
  closeChangeMembers = () => {
    this.setState({ changeMembersOpen: false })
  }

  render() {
    const { title, id, owner, classes, buttonText, user } = this.props
    const { changeMembersOpen, editing, hovering } = this.state
    return (
      <div
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
      >
        {editing ? (
          <Edit
            type="Board"
            title={this.state.title}
            close={this.close}
            handleChange={this.handleChange}
            handleSubmit={this.endEdit}
          />
        ) : (
          <div>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.title}>{title}</Typography>
              </CardContent>
              <CardActions>
                <Link to={`/board/${id}`}>
                  <Button className={classes.button}>{buttonText}</Button>
                </Link>
                {hovering && user.id === owner && (
                  <div style={{ ...dropdownMenuStyle }}>
                    <BoardDropdownMenu
                      changeMembers={this.openChangeMembers}
                      handleEdit={this.editBoard}
                      handleDelete={this.deleteBoard}
                    />
                  </div>
                )}
              </CardActions>
            </Card>
            {changeMembersOpen && (
              <ChangeBoardMembers open={changeMembersOpen} closeChangeMembers={this.closeChangeMembers} boardId={id}/>
            )}
          </div>
        )}
      </div>
    )
  }
}

const styles = {
  title: {
    marginBottom: 5,
    fontSize: 14
  },
  pos: {
    marginBottom: 5
  },
  button: {
    '&:hover': {
      backgroundColor: 'lightgray'
    }
  },
  card: {
    width: '175px',
    height: '106px'
  }
}

const dropdownMenuStyle = {
  position: 'absolute',
  top: '2px',
  right: '0px',
  background: 'white',
  color: 'black',
  cursor: 'pointer',
  height: 'auto'
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestEditBoard,
      requestDeleteBoard
    },
    dispatch
  )

BoardCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardCard)

export default withStyles(styles)(BoardCard)
