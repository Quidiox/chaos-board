import React from 'react'
import { Form, Button, TextArea } from 'semantic-ui-react'

const Edit = ({endEdit, close, title, type, handleChange}) => {
  const handleSubmit = () => {
    endEdit()
  }
  const closeForm = e => {
    e.preventDefault()
    close()
  }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Field
          value={title}
          control={TextArea}
          placeholder={`${type} title`}
          name="title"
          onChange={handleChange}
        />
        <Form.Group>
          <Form.Field control={Button} type="submit">
            Save
          </Form.Field>
          <Form.Field control={Button} onClick={closeForm}>
            Close
          </Form.Field>
        </Form.Group>
      </Form>
    </div>
  )
}

export default Edit
