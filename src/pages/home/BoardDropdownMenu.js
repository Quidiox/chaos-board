import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const BoardDropdownMenu = ({
  changeMembers,
  handleEdit,
  handleDelete
}) => (
  <Dropdown icon="content" floating labeled className="icon">
    <Dropdown.Menu direction="left">
      <Dropdown.Item icon="users" text="Change members" onClick={changeMembers} />
      <Dropdown.Item icon="edit" text="Edit board" onClick={handleEdit} />
      <Dropdown.Item icon="delete" text="Delete board" onClick={handleDelete} />
    </Dropdown.Menu>
  </Dropdown>
)

export default BoardDropdownMenu
