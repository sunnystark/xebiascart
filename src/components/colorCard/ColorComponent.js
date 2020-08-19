import React from 'react';
import styles from './ColorComponent.module.css'

const classToApplied = (selected) => {
  let classes = `${styles.color}`
  if(selected){
    classes += ` ${styles.mark}`
  }
  return classes;
}

function ColorComponent(props) {

  const handleClick = () => {
    if(props.noEvent){
      return;
    }
    if(props.selected){
      props.handleRemoveColor(props.color);
    } else {
      props.handleAddColor(props.color);
    }
  }

  return (
    <button
      onClick={handleClick}
      className={classToApplied(props.selected)}
      style={{backgroundColor:props.color}}
    >
      {<span style={{display:'none'}}>{props.title}</span>}
    </button>
  )
} 

export default ColorComponent;