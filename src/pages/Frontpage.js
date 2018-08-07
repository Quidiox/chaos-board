import React from 'react'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const Frontpage = ({ classes }) => (
  <div className={classes.wrapperDiv}>
    <div className={classes.innerDiv}>
      <Typography
        variant="headline"
        component="h2"
        style={{ textAlign: 'center' }}
      >
        Welcome to Chaos Board!
      </Typography>
      <Typography component="p" className={classes.pElement}>
        This network address hosts demo installation of Chaos board. Chaos board
        is an application for creating and operating Kanban boards. Do not use
        Chaos board demo for anything real as all data can be deleted at any
        moment.
      </Typography>
      <hr />
      <Typography component="p" className={classes.pElement}>
        To use Chaos board you need to <Link to="/login">login</Link>. <br />
        If you don't have an account yet then{' '}
        <Link to="/register">register</Link>.
      </Typography>
      <hr />
      <Typography component="p" className={classes.pElement}>
        Currently only desktop environment is supported because I have not found
        uptodate touch backend for react-dnd. Mobile support might be added
        later.
      </Typography>
    </div>
  </div>
)

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

export default withStyles(styles)(Frontpage)
