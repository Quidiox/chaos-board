import React, { Component } from 'react'
import { connect } from 'react-redux'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles'
import { requestFetchBoardsByUser } from '../reducers/userBoardsReducer'
import { bindActionCreators } from 'redux'
import BoardCard from './home/BoardCard'
import AddBoard from './home/AddBoard'

class Home extends Component {
  state = { boardForm: false, title: '' }
  async componentDidMount() {
    if (this.props.user && this.props.user.username) {
      await this.props.requestFetchBoardsByUser(this.props.user)
    }
  }
  handleClick = () => {
    this.setState({ boardForm: true })
  }
  boardFormVisible = () => {
    this.setState({ boardForm: false })
  }
  render() {
    const { classes, boards } = this.props
    const { boardForm } = this.state
    return (
      <div className={classes.root}>
        <GridList cellHeight={'auto'} className={classes.gridList} cols={4}>
          {boards &&
            boards.map(board => (
              <GridListTile className={classes.tile} key={board.id}>
                <BoardCard
                  title={board.title}
                  buttonText="open board"
                  id={board.id}
                />
              </GridListTile>
            ))}
          {boardForm ? (
            <AddBoard boardFormVisible={this.boardFormVisible} />
          ) : (
            <GridListTile className={classes.tile}>
              <Card className={classes.card}>
                <Button className={classes.button} onClick={this.handleClick}>
                  Create new board
                </Button>
              </Card>
            </GridListTile>
          )}
        </GridList>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: '100%',
    justifyContent: 'flex-start'
  },
  subheader: {
    width: '100%'
  },
  tile: {
    minHeight: '114px',
    minWidth: '175px'
  },
  card: {
    width: '175px',
    height: '106px'
  },
  button: {
    margin: '30px 0 0 0',
    '&:hover': {
      backgroundColor: 'lightgray'
    }
  }
})

const mapStateToProps = state => ({
  user: state.user,
  boards: state.boards
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({requestFetchBoardsByUser}, dispatch)
)

Home = connect(
  mapStateToProps, mapDispatchToProps
)(Home)

export default withStyles(styles)(Home)
