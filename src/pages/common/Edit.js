// Used by board, container and card.
import React from 'react'
import { Form, Button, TextArea } from 'semantic-ui-react'

const Edit = ({ handleSubmit, close, title, type, handleChange }) => (
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
        <Form.Field control={Button} onClick={close}>
          Close
        </Form.Field>
      </Form.Group>
    </Form>
  </div>
)

export default Edit
