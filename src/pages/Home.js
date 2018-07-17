import React, { Component } from 'react'
import { connect } from 'react-redux'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles'
import { requestFetchBoardsByUser } from '../reducers/userBoardsReducer'
import BoardCard from './home/BoardCard'
import AddBoard from './home/AddBoard'

class Home extends Component {
  state = { boardForm: false, title: '' }

  async componentDidMount() {
    if (this.props.boards.length < 1) {
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
        <GridList cellHeight={'auto'} className={classes.gridList} cols={5}>
          {boards &&
            boards.map(board => (
              <GridListTile
                classes={{ tile: classes.tile, root: classes.tileRoot }}
                key={board.id}
              >
                <BoardCard
                  buttonText="open board"
                  title={board.title}
                  id={board.id}
                  owner={board.owner}
                />
              </GridListTile>
            ))}
          {boardForm ? (
            <AddBoard boardFormVisible={this.boardFormVisible} />
          ) : (
            <GridListTile
              classes={{ tile: classes.tile, root: classes.tileRoot }}
            >
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
    alignItems: 'start',
    height: '93%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    height: '100%',
    alignContent: 'start',
    justifyContent: 'flex-start'
  },
  tileRoot: {
    alignSelf: 'start',
    minWidth: '177px'
  },
  tile: {
    height: '114px',
    width: '175px',
    overflow: 'visible'
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

const mapDispatchToProps = { requestFetchBoardsByUser }

Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default withStyles(styles)(Home)
