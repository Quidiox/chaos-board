import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { requestFetchBoardsByUser } from '../reducers/userBoardsReducer'
import BoardPreview from '../components/BoardPreview'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import { withStyles } from '@material-ui/core/styles'

class Home extends Component {
  componentDidMount() {
    this.props.requestFetchBoardsByUser(this.props.user)
  }
  render() {
    const { classes, boards } = this.props
    return (
      <div className={classes.root} style={{ height: '93%' }}>
        <GridList cellHeight={160} className={classes.gridList} cols={4}>
          {boards &&
            boards.map(board => (
              <GridListTile className={classes.tile} key={board.id}>
                <BoardPreview title={board.title} description={board.description} id={board.id}/>
              </GridListTile>
            ))}
          <GridListTile>
            <div>Create new board</div>
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
    // width: 600,
    height: 300
  },
  subheader: {
    width: '100%'
  },
  tile: {
    minWidth: '175px'
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
