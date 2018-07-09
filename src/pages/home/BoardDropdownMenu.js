import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const BoardDropdownMenu = ({
  addMember,
  removeMember,
  handleEdit,
  handleDelete
}) => (
  <Dropdown icon="content" floating labeled className="icon">
    <Dropdown.Menu direction="left">
      <Dropdown.Item icon="plus circle" text="Add member" onClick={addMember} />
      <Dropdown.Item
        icon="minus circle"
        text="Remove member"
        onClick={removeMember}
      />
      <Dropdown.Item icon="edit" text="Edit board" onClick={handleEdit} />
      <Dropdown.Item icon="delete" text="Delete board" onClick={handleDelete} />
    </Dropdown.Menu>
  </Dropdown>
)

export default BoardDropdownMenu
