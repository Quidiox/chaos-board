import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import { requestFetchBoardsByUser } from '../reducers/userBoardsReducer'
import BoardCard from './home/BoardCard'

class Home extends Component {
  state = { boardForm: false, title: '' }
  componentDidMount() {
    this.props.requestFetchBoardsByUser(this.props.user)
  }
  handleClick = () => {
    this.setState({ boardForm: true })
  }
  render() {
    const { classes, boards } = this.props
    const { boardForm } = this.state
    return (
      <div className={classes.root}>
        <GridList cellHeight={110} className={classes.gridList} cols={4}>
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
          <GridListTile className={classes.tile}>
            <Card className={classes.card}>
              {boardForm ? (
                <div>hiiii</div>
              ) : (
                <Button className={classes.button} onClick={this.handleClick}>
                  Create new board
                </Button>
              )}
            </Card>
          </GridListTile>
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
    minHeight: '110px'
  },
  subheader: {
    width: '100%'
  },
  tile: {
    minHeight: '100px',
    minWidth: '175px'
  },
  card: {
    width: 175,
    height: 109
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestFetchBoardsByUser }, dispatch)

Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default withStyles(styles)(Home)
