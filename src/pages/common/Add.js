import React from 'react'
import { Form, Button, TextArea } from 'semantic-ui-react'

const Add = ({ title, type, handleChange, handleSubmit, clear }) => {
  return (
    <div>
      <h4>Add {type.toLowerCase()}</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Field
          value={title || ''}
          control={TextArea}
          placeholder={`${type} title`}
          name="title"
          onChange={handleChange}
        />
        <Form.Group>
          <Form.Field control={Button} type='submit'>Save</Form.Field>
          <Form.Field control={Button} onClick={clear}>
            Clear
          </Form.Field>
        </Form.Group>
      </Form>
    </div>
  )
}

export default Add
