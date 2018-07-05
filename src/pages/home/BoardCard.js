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
import DropdownMenu from '../common/DropdownMenu'
import {
  requestEditBoard,
  requestDeleteBoard
} from '../../reducers/userBoardsReducer'

class BoardCard extends Component {
  state = {
    isHovering: false,
    isEditing: false
  }

  handleMouseHover = e => {
    if (e.type === 'mouseenter') this.setState({ isHovering: true })
    if (e.type === 'mouseleave') this.setState({ isHovering: false })
  }

  editBoard = () => {
    this.setState({ isEditing: true })
  }

  endEdit = () => {
    this.setState({ isHovering: false, isEditing: false })
  }

  deleteBoard = () => {
    this.props.requestDeleteBoard({
      boardId: this.props.id
    })
    this.setState({ isHovering: false })
  }

  render() {
    const { title, description, classes, id, buttonText } = this.props
    return (
      <div
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
      >
        {this.state.isEditing ? (
          <Edit
            type="Board"
            title={title}
            boardId={id}
            endEdit={this.endEdit}
          />
        ) : (
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title}>{title}</Typography>
              <Typography component="p">{description}</Typography>
            </CardContent>
            <CardActions>
              <Link to={`/board/${id}`}>
                <Button className={classes.button}>{buttonText}</Button>
              </Link>
              {this.state.isHovering && (
                <div style={{ ...dropdownMenuStyle }}>
                  <DropdownMenu
                    handleEdit={this.editBoard}
                    handleDelete={this.deleteBoard}
                    type="board"
                  />
                </div>
              )}
            </CardActions>
          </Card>
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
  right: '20px',
  background: 'white',
  color: 'black',
  cursor: 'pointer'
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestEditBoard, requestDeleteBoard }, dispatch)

BoardCard = connect(
  null,
  mapDispatchToProps
)(BoardCard)

export default withStyles(styles)(BoardCard)
