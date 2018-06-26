import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

const styles = {
  card: {
    maxWidth: 175,
    maxHeight: 110
  },
  title: {
    marginBottom: 5,
    fontSize: 14
  },
  pos: {
    marginBottom: 5
  }
}

const BoardCard = ({ title, description, classes, id, buttonText }) => (
  <Card className={classes.card}>
    <CardContent>
      <Typography className={classes.title}>{title}</Typography>
      <Typography component="p">{description}</Typography>
    </CardContent>
    <CardActions>
      <Link to={`/board/${id}`}>
        <Button>{buttonText}</Button>
      </Link>
    </CardActions>
  </Card>
)

export default withStyles(styles)(BoardCard)
