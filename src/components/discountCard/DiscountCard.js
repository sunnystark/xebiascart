import React from 'react';
import DiscountSelection from './DiscountSelectionComponent'
import styles from './DiscountCard.module.css'

function DiscountCard(props) {
  const selectOption = {key:-1, displayValue:'select'}
  const discountRangeClone = [...props.values]
  const minValues = [selectOption, ...discountRangeClone.slice(0, discountRangeClone.length - 1)];
  const maxValues = [selectOption, ...discountRangeClone.slice(1)];
  return (
    <div className={styles.container}>
      <br/>
      <h3>Discount</h3>
      <br/>
      <hr/>
      <div className={styles.options}>
        <div style={{display:'inline-block', marginRight:'1rem'}}>
          <span>min: </span>
          <DiscountSelection 
            values={minValues} 
            handleChange={props.handleMinChange} 
            selectedValue={props.selectedMinMax[0]} 
          />
        </div>
        <div style={{display:'inline-block'}}>
          <span>max: </span>
          <DiscountSelection 
            values={maxValues} 
            handleChange={props.handleMaxChange}
            selectedValue={props.selectedMinMax[1]} 
          />
        </div>
      </div>
    </div>
  )
}

export default DiscountCard;