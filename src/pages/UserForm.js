import React from 'react'
import { Form, Button, Input } from 'semantic-ui-react'

const UserForm = ({
  nameField,
  name,
  username,
  password,
  handleChange,
  handleSubmit,
  clear
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      {nameField  && (
        <Form.Field
          value={name}
          control={Input}
          placeholder="Full name"
          name="name"
          onChange={handleChange}
          style={inputStyle}
        />
      )}
      <Form.Field
        value={username}
        control={Input}
        placeholder="Username"
        name="username"
        onChange={handleChange}
        style={inputStyle}
      />
      <Form.Field
        value={password}
        control={Input}
        placeholder="Password"
        name="password"
        onChange={handleChange}
        style={inputStyle}
      />
      <Form.Group>
        <Form.Field control={Button}>Submit</Form.Field>
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

export default UserForm
