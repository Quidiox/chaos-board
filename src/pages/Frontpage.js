import React from 'react'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  wrapperDiv: {
    width: '60%',
    height: '93%',
    textAlign: 'center',
    margin: '0 auto'
  },
  innerDiv: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    display: 'inline-block'
  },
  pElement: {
    fontSize: '1.2rem',
    lineHeight: '1.3'
  }
}

const Frontpage = ({ classes }) => (
  <div className={classes.wrapperDiv}>
    <div className={classes.innerDiv}>
      <Typography variant="headline" component="h2" style={{textAlign: 'center'}}>
        Welcome to Chaos Board!
      </Typography>
      <Typography component="p" className={classes.pElement}>
        This url hosts Chaos Board demo application that lets you create and operate Kanban boards. 
        Do not use Chaos Board demo application for anything real as all data can be wiped at any moment.
      </Typography>
      <Typography component="p" className={classes.pElement}>
        To use Chaos Board you need to <Link to='/login'>login</Link>. <br />
        If you don't have an account then you need to <Link to='/register'>register</Link>.
      </Typography>
    </div>
  </div>
)

export default withStyles(styles)(Frontpage)
