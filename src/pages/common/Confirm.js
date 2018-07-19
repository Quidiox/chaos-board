import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'

const Confirm = ({
  open,
  title,
  body,
  noButtonText,
  yesButtonText,
  no,
  yes,
  classes
}) => (
  <Modal open={open}>
    <div style={getModalStyle()} className={classes.paper}>
      <Typography variant="title" id="modal-title">
        {title}
      </Typography>
      <Typography className={classes.body} id="modal-body1">
        {body}
      </Typography>
      <Button onClick={yes} className={classes.yesButton}>
        {yesButtonText}
      </Button>
      <Button onClick={no} className={classes.noButton}>
        {noButtonText}
      </Button>
    </div>
  </Modal>
)

function getModalStyle() {
  const top = 50
  const left = 50
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  body: {
    marginTop: '15px',
    marginBottom: '5px'
  },
  yesButton: {
    marginTop: '10px',
    backgroundColor: '#FF9999',
    '&:hover': {
      background: '#FF0000'
    }
  },
  noButton: {
    marginTop: '10px',
    marginLeft: '100px',
    backgroundColor: '#e0e1e2',
    '&:hover': {
      background: '#C0C0C0'
    }
  }
})

export default withStyles(styles)(Confirm)
