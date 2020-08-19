import {
  PRODUCT_LIST_RECEIVED
} from '../actions/productActions'


const initialState = {
  filterable_products:null,
  products_searchable_criteria:null
}

function pushOrCreateAndPushToList(list, data) {
  if(list){
    return [...list, data];
  }
  return [data]; 
}

function generateFilterableList(list) {
  return list.reduce((filterableList, item) => {
    let {
      products_searchable_criteria:{
        brand,
        color
      },
      filterable_products
    } = filterableList;
    let {
      id:itemId,
      colour:{color:colorId},
      brand:brandName
    } = item;

    filterable_products[itemId] = item;

    color[colorId] = pushOrCreateAndPushToList(color[colorId], itemId);
    brand[brandName] = pushOrCreateAndPushToList(brand[brandName], itemId);;

    return filterableList
  }, {
    products_searchable_criteria:{
      brand:{},
      color:{}
    },
    filterable_products:{}
  })
}

const filterableProductListReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case PRODUCT_LIST_RECEIVED:
      return generateFilterableList(payload)
    default:
      return state;
  }
}

export default filterableProductListReducer;