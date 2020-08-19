import { FILTER_PRODUCT_LIST } from "../actions/productActions";
import {PRICE} from '../constants/appConst'

const initialState = null;

function intersect(firstArray, secondArray){
  return firstArray.reduce((uniqueList, item) => {
    if(secondArray.includes(item) === true){
      uniqueList.push(item);
    }
    return uniqueList;
  }, [])
}

function unique(firstArray, secondArray) {
  return firstArray.reduce((uniqueList, item) => {
    if(uniqueList.includes(item) === false){
      uniqueList.push(item);
    }
    return uniqueList;
  }, [...secondArray])
}

function getProductIdsUniqueList(criteriaListObject, keysList) {
  return keysList.reduce((concatList, nextKey) => {
    return unique(criteriaListObject[nextKey] || [], concatList);
  }, [])
}

function getPriceFilter([minimum, maximum], list) {
  let min = minimum || -1;
  let max = maximum || -1;
  return Object
    .entries(list)
    .reduce((newList, [productId, productDetails]) => {
      let price = productDetails.price.final_price;
      if((max !== -1 && min !== -1) && (price >= min && price <= max)){
        return [...newList, productId]
      }
      if(max === -1 && min !== -1 && price >= min){
        return [...newList, productId]
      }
      if(min === -1 && max !== -1 && price <= max){
        return [...newList, productId]
      }
      return newList
    }, [])
}

function getProductFilter(type, criteria, list){
  switch(type){
    case PRICE:
      return getPriceFilter(criteria, list)
    default:
      return Object.keys(list);
  }
}

function filterProductList(options) {
  const {
    filterable_product_list:{
      products_searchable_criteria, 
      filterable_products,
    },
    applied_filters
  } = options;
  if(applied_filters === null || Object.keys(applied_filters).length === 0){
    return Object.keys(filterable_products);
  }
  return Object
    .keys(applied_filters)
    .reduce((filterList, nextKey) => {
      const criteriaExists = products_searchable_criteria[nextKey];
      let uniqueList;
      if(criteriaExists){
        uniqueList = getProductIdsUniqueList(criteriaExists, applied_filters[nextKey]);
      } else {
        uniqueList = getProductFilter(nextKey, applied_filters[nextKey], filterable_products)
      }
      filterList.push(uniqueList)
      return filterList; 
    }, [])
    .reduce((finalList, uniqueList, index) => {
      return index === 0 ? uniqueList : intersect(uniqueList, finalList) 
    }, [])
}

const productListReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case FILTER_PRODUCT_LIST:
      return filterProductList(payload)
    default:
      return state;
  }
}

export default productListReducer;