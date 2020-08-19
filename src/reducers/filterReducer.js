import { 
  FILTERS_RECEIVED, 
  ADD_COLOR_TO_FILTER, 
  REMOVE_COLOR_FROM_FILTER, 
  ADD_BRAND_TO_FILTER, 
  REMOVE_BRAND_FROM_FILTER, 
  ADD_MIN_PRICE_TO_FILTER,
  REMOVE_MIN_PRICE_FROM_FILTER,
  ADD_MAX_PRICE_TO_FILTER,
  REMOVE_MAX_PRICE_FROM_FILTER,
  RESET_APPLIED_FILTER
} from "../actions/filterActions";

import {
  COLOR,
  BRAND,
  PRICE
} from '../constants/appConst'

export 
const initialState = {
  filter_list:null,
  applied_filters:{}
}

function addToFilter(filters, key, value){
  if(filters === {}){
    return {[key]:[value]};
  }
  return {
    ...filters,
    [key]: filters[key] ? [...filters[key], value] : [value]
  }
}

function removeFilter(filter, key, value){
  let newFilter = {...filter};
  if(newFilter[key].length === 1){
    delete newFilter[key]
    return newFilter
  }
  newFilter[key] = newFilter[key].filter(val => val !== value);
  return newFilter
}

function isValueExits(filters, key, value) {
  return (filters && filters[key] && filters[key].includes(value))
}

function addFilterOrReturnSameState(state, key, value){
  let appliedFilters = state.applied_filters;
  if(isValueExits(appliedFilters, key, value)){
    return state;
  }
  return {
    ...state,
    applied_filters: addToFilter(appliedFilters, key, value)
  }
}

function removeFilterOrReturnSameState(state, key, value){
  let appliedFilters = state.applied_filters;
  if(isValueExits(appliedFilters, key, value)){
    return {
      ...state,
      applied_filters: removeFilter(appliedFilters, key, value)
    }
  }
  return state;
}

function isValueExitsInRange(options) {
  let {filters, key, position} = options;
  if(options.value) {
    return (filters && filters[key] && filters[key][position] === options.value);
  }
  return filters && filters[key] && filters[key][position] > -1
}

function addRangeToFilter({filters, key, value, position}) {
  let arr = [];
  arr[position] = value;

  if(filters === {}){
    return {[key]:arr};
  }
  if(filters[key]){
    arr = [...filters[key]];
    arr[position] = value;
  }
  return {
    ...filters,
    [key]: arr
  }
}

//TODO: Either break it more function or
// check better solution for the same.
function removeRangeToFilter({filters, key, position}) {
  let arr = [...filters[key]]
  if((arr.length === 1 && position === 0) 
    || (arr.length === 2 && (!arr[0] || arr[0] === -1) && position === 1)
  ){
    let cloneFilter = {...filters};
    delete cloneFilter[key];
    return cloneFilter
  }
  arr[position] = -1;
  return {
    ...filters,
    [key]:arr
  }
}

function addPriceFilterOrReturnSameState({state, key, value, position}) {
  let filters = state.applied_filters
  if(isValueExitsInRange({filters, key, value, position})){
    return state;
  }
  return {
    ...state,
    applied_filters: addRangeToFilter({filters, key, value, position})
  }
}

function removePriceFilterOrReturnSameState({state, key, position}) {
  let filters = state.applied_filters
  if(isValueExitsInRange({filters, key, position})){
    return {
      ...state,
      applied_filters: removeRangeToFilter({filters, key, position})
    }
  }
  return state;
}

const filterReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case FILTERS_RECEIVED:
      return {
        ...state,
        filter_list:payload
      }
    case ADD_COLOR_TO_FILTER:
      return addFilterOrReturnSameState(state, COLOR, payload);
    case REMOVE_COLOR_FROM_FILTER:
      return removeFilterOrReturnSameState(state, COLOR, payload);
    case ADD_BRAND_TO_FILTER:
      return addFilterOrReturnSameState(state, BRAND, payload);
    case REMOVE_BRAND_FROM_FILTER:
      return removeFilterOrReturnSameState(state, BRAND, payload);
    case ADD_MIN_PRICE_TO_FILTER:
      return addPriceFilterOrReturnSameState({
        state, 
        key:PRICE, 
        value:payload,
        position:0
      });
    case REMOVE_MIN_PRICE_FROM_FILTER:
      return removePriceFilterOrReturnSameState({
        state,
        key:PRICE,
        position:0
      })
    case ADD_MAX_PRICE_TO_FILTER:
      return addPriceFilterOrReturnSameState({
        state,
        key:PRICE,
        value:payload,
        position: 1
      })
    case REMOVE_MAX_PRICE_FROM_FILTER:
      return removePriceFilterOrReturnSameState({
        state,
        key:PRICE,
        position:1
      })
    case RESET_APPLIED_FILTER:
      return {
        ...state,
        applied_filters:{}
      }
    default:
      return state;
  }
}

export default filterReducer;
