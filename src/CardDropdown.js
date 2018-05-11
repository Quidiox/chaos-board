import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const CardDropdown = ({editCard, deleteCard}) => {
  return (
    <Dropdown icon="content" floating labeled className="icon">
      <Dropdown.Menu direction="left">
        <Dropdown.Item icon="edit" text="Edit card" onClick={editCard}/>
        <Dropdown.Item icon="delete" text="Delete card" onClick={deleteCard}/>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default CardDropdown
