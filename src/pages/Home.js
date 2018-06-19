import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { requestFetchBoardsByUser } from '../reducers/userBoardsReducer'

class Home extends Component {
  componentDidMount() {
    this.props.requestFetchBoardsByUser()
  }
  render() {
    return <div>hello</div>
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestFetchBoardsByUser }, dispatch)

export default connect(null, mapDispatchToProps)(Home)
