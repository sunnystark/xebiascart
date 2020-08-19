import React from 'react';
import { connect } from 'react-redux';
import { ColorCard } from '../components'
import {
  addColorToFilter, 
  removeColorFromFilter
} from '../actions/filterActions';

import {filterProductList} from '../actions/productActions';
import {COLOR} from '../constants/appConst'

function ColorContainer(props){
  
  const handleAddColor = (color) => {
    props.dispatch(addColorToFilter(color));
    props.dispatch(filterProductList());
  }

  const handleRemoveColor = (color) => {
    props.dispatch(removeColorFromFilter(color));
    props.dispatch(filterProductList());
  }

  return (
    <ColorCard
      selectedColors={props.selectedColors}
      values={props.values} 
      handleAddColor={handleAddColor} 
      handleRemoveColor={handleRemoveColor} 
    />
  )
}

const mapStateToProps = (state) => {
  return {
    selectedColors: state.filter.applied_filters[COLOR] || []
  }
}

export default connect(mapStateToProps)(ColorContainer);