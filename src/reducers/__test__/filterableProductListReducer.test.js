import filterableProductListReducer from '../filterableProductListReducer';
import {
  PRODUCT_LIST_RECEIVED
} from '../../actions/productActions'

const initialState = {
  filterable_products:null,
  products_searchable_criteria:null
}

const serverResponse = [
  {
    'id': 'product_1',
    'colour': {
        'color': '#00AF33',
        'title': 'Green'
    },
    'brand': 'peter england'
  },
  {
    'id': 'product_2',
    'colour': {
        'color': '#33A1DE',
        'title': 'Blue'
    },
    'brand': 'raymond'
  },
  {
    'id': 'product_3',
    'colour': {
        'color': '#33A1DE',
        'title': 'Blue'
    },
    'brand': 'peter england'
  }
];

const storeBasedOnServerResponse = {
  'products_searchable_criteria':{
    'brand':{
      'peter england':['product_1', 'product_3'],
      'raymond':['product_2']
    },
    'color':{
      '#00AF33':['product_1'],
      '#33A1DE':['product_2', 'product_3']
    }
  },
  'filterable_products': {
    'product_1': {
      'id': 'product_1',
      'colour': {
          'color': '#00AF33',
          'title': 'Green'
      },
      'brand': 'peter england'
    },
    'product_2':{
      'id': 'product_2',
      'colour': {
          'color': '#33A1DE',
          'title': 'Blue'
      },
      'brand': 'raymond'
    },
    'product_3':{
      'id': 'product_3',
      'colour': {
          'color': '#33A1DE',
          'title': 'Blue'
      },
      'brand': 'peter england'
    }
  }
}

describe('Filterable Product List Reducer', () => {
  it('should return default state if action type does not match', () => {
    const newState = filterableProductListReducer(initialState, {type:'unknown'});
    expect(newState).toEqual(initialState);
  });

  it('should convert server product list to searchable product list', () => {
    const action = {type:PRODUCT_LIST_RECEIVED, payload:serverResponse}
    const newState = filterableProductListReducer(initialState, action);

    expect(newState).toEqual(storeBasedOnServerResponse);
    expect(newState).not.toEqual(initialState);
  })
})