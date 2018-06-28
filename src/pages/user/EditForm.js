import React from 'react'
import { Form, Button, Input, Checkbox } from 'semantic-ui-react'

const EditForm = ({
  name,
  username,
  password,
  confirmPassword,
  passwordEdit,
  handleChange,
  handleSubmit,
  clear
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field
        label="Fullname"
        value={name}
        name="name"
        control={Input}
        onChange={handleChange}
        style={inputStyle}
      />
      <Form.Field
        label="Username"
        name="username"
        control={Input}
        value={username}
        onChange={handleChange}
        style={inputStyle}
      />
      <Checkbox
        type="checkbox"
        name="passwordEdit"
        label="Edit password?"
        onChange={(e, {checked})=>handleChange(e, checked)}
      />
      {passwordEdit && (
        <div>
          <Form.Field
            label="Password"
            name="password"
            control={Input}
            value={password}
            onChange={handleChange}
            style={inputStyle}
          />
          <Form.Field
            label="Confirm new password"
            name="confirmPassword"
            control={Input}
            value={confirmPassword}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      )}
      <Form.Group>
        <Form.Field control={Button} type='submit'>Submit</Form.Field>
        <Form.Field control={Button} onClick={clear}>
          Clear
        </Form.Field>
      </Form.Group>
    </Form>
  )
}

const inputStyle = {
  width: '250px'
}

export default EditForm
