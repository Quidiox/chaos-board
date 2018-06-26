import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const DropdownMenu = ({ handleEdit, handleDelete, type }) => {
  return (
    <Dropdown icon="content" floating labeled className="icon">
      <Dropdown.Menu direction="left">
        <Dropdown.Item icon="edit" text={`Edit ${type}`} onClick={handleEdit} />
        <Dropdown.Item icon="delete" text={`Delete ${type}`} onClick={handleDelete} />
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropdownMenu
