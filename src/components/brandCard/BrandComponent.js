import React from 'react';
import styles from './BrandComponent.module.css'

function BrandComponent(props) {
  return (
    <div className={styles.container}> 
      <input 
        type='checkbox' 
        onChange={props.handleChange} 
        name={props.value} 
        id={props.value}
        checked={props.selected} 
      />
      <label htmlFor={props.value}>{props.title}</label>
    </div>
  )
}

export default BrandComponent;