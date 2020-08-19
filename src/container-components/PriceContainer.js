import React from 'react';
import { connect } from 'react-redux';
import { PriceCard } from '../components';
import {
  addMinPriceToFilter, 
  addMaxPriceToFilter,
  removeMinPriceFromFilter,
  removeMaxPriceFromFilter
} from '../actions/filterActions';

import {filterProductList} from '../actions/productActions';
import {PRICE} from '../constants/appConst'

// TODO: show some message where max should always be more than min value.

function PriceContainer(props){
  const handleMinChange = (event) => {
    let value = event.target.value
    if(isNaN(value)){
      props.dispatch(removeMinPriceFromFilter());
    } else {
      props.dispatch(addMinPriceToFilter(Number(value)));
    }
    props.dispatch(filterProductList());
  }

  const handleMaxChange = (event) => {
    const value = event.target.value
    if(isNaN(value)){
      props.dispatch(removeMaxPriceFromFilter());
    } else {
      props.dispatch(addMaxPriceToFilter(Number(value)));
    }
    props.dispatch(filterProductList());
  }

  return (
    <PriceCard
      selectedMinMax={props.selectedMinMax} 
      values={props.values} 
      handleMinChange={handleMinChange} 
      handleMaxChange={handleMaxChange} 
    />
  )
}

const mapStateToProps = (state) => {
  return {
    selectedMinMax: state.filter.applied_filters[PRICE] || []
  }
}

export default connect(mapStateToProps)(PriceContainer);