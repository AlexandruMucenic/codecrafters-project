import React, { useState } from 'react'
import './DropDownMenu.css'

interface DropDownMenuProps {
  options: string[]
  onSelected: (option: string) => void
  selected: string
  placeholder: string
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ options, onSelected, selected, placeholder }) => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false)

  const selectedOption = options.find(option => option === selected)

  const handleToggleDropDown = () => {
    setShowDropDown(!showDropDown)
  }

  const handleChangeSelectedOption = (option: string) => {
    if (onSelected) {
      onSelected(option)
    }
    setShowDropDown(false)
  }

  return (
    <div>
      <div className="selectedContainer">
        <button className="option" onClick={handleToggleDropDown}>
          {selectedOption ? selectedOption : placeholder}
        </button>

        {showDropDown && (
          <div className="menuContainer">
            {options.map(option => (
              <div key={option} className="menuItem" onClick={() => handleChangeSelectedOption(option)}>
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DropDownMenu
