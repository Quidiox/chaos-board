import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { requestFetchBoardsByUser } from '../reducers/userBoardsReducer'
import BoardPreview from '../components/BoardPreview'

class Home extends Component {
  componentDidMount() {
    this.props.requestFetchBoardsByUser(this.props.user)
  }
  render() {
    return (
      <div style={{height: '93%'}}>
        {this.props.boards &&
          this.props.boards.map(board => (
            <BoardPreview
              key={board.id}
              title={board.title}
              description={board.description}
            />
          ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  boards: state.boards
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestFetchBoardsByUser }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
