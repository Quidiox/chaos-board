import React from 'react'
import { Form, Button, TextArea } from 'semantic-ui-react'

const Edit = props => {
  const handleSubmit = () => {
    props.endEdit()
  }
  const close = e => {
    e.preventDefault()
    props.close()
  }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Field
          value={props.title}
          control={TextArea}
          placeholder={`${props.type} title`}
          name="title"
          onChange={props.handleChange}
        />
        <Form.Group>
          <Form.Field control={Button} type="submit">
            Save
          </Form.Field>
          <Form.Field control={Button} onClick={close}>
            Close
          </Form.Field>
        </Form.Group>
      </Form>
    </div>
  )
}

export default Edit
