import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'

const Confirm = ({
  open,
  text,
  noButtonText,
  yesButtonText,
  no,
  yes,
  classes
}) => (
  <Modal open={open}>
    <div style={getModalStyle()} className={classes.paper}>
      <Typography variant="title" id="modal-title">
        {text}
      </Typography>
      <Button onClick={yes}>{yesButtonText}</Button>
      <Button onClick={no}>{noButtonText}</Button>
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
  }
})

export default withStyles(styles)(Confirm)
