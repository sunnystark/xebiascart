import React from 'react';

function PriceSelectionComponent(props) {

  return (
    <select 
      onChange={props.handleChange}
      value={props.selectedValue || -1}
    >
      {
        props.values.map(priceMeta => (
          <option 
            key={priceMeta.key} 
            value={priceMeta.key}
          >
            {priceMeta.displayValue}
          </option>
        ))
      }
    </select>
  )
}

export default PriceSelectionComponent