import React from 'react';

function DiscountSelectionComponent(props) {

  return (
    <select 
      onChange={props.handleChange}
      value={props.selectedValue || -1}
    >
      {
        props.values.map(discountMeta => (
          <option 
            key={discountMeta.key} 
            value={discountMeta.key}
          >
            {discountMeta.displayValue}
          </option>
        ))
      }
    </select>
  )
}

export default DiscountSelectionComponent