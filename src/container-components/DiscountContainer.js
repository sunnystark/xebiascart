import React from 'react';
import { connect } from 'react-redux';
import { DiscountCard } from '../components';
import {
  addMinDiscountToFilter, 
  addMaxDiscountToFilter,
  removeMinDiscountFromFilter,
  removeMaxDiscountFromFilter
} from '../actions/filterActions';

import {filterProductList} from '../actions/productActions';
import {DISCOUNT} from '../constants/appConst'

// TODO: show some message where max should always be more than min value.

function DiscountContainer(props){
  const handleMinChange = (event) => {
    let value = event.target.value
    if(isNaN(value)){
      props.dispatch(removeMinDiscountFromFilter());
    } else {
      props.dispatch(addMinDiscountToFilter(Number(value)));
    }
    props.dispatch(filterProductList());
  }

  const handleMaxChange = (event) => {
    const value = event.target.value
    if(isNaN(value)){
      props.dispatch(removeMaxDiscountFromFilter());
    } else {
      props.dispatch(addMaxDiscountToFilter(Number(value)));
    }
    props.dispatch(filterProductList());
  }

  return (
    <DiscountCard
      selectedMinMaxDis={props.selectedMinMaxDis} 
      values={props.values} 
      handleMinChange={handleMinChange} 
      handleMaxChange={handleMaxChange} 
    />
  )
}

const mapStateToProps = (state) => {
  return {
    selectedMinMaxDis: state.filter.applied_filters[DISCOUNT] || []
  }
}

export default connect(mapStateToProps)(DiscountContainer);