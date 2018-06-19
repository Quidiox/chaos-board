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
    minWidth: 275
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}

const BoardPreview = ({ title, description, classes, id }) => (
  <Card className={classes.card}>
    <CardContent>
      <Typography className={classes.title}>{title}</Typography>
      <Typography component="p">{description}</Typography>
    </CardContent>
    <CardActions>
      <Link to={`/board/${id}`}>
        <Button>open board</Button>
      </Link>
    </CardActions>
  </Card>
)

export default withStyles(styles)(BoardPreview)
