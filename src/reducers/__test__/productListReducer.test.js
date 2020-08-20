import productListReducer from '../productListReducer';
import { FILTER_PRODUCT_LIST } from '../../actions/productActions';

const initialState = null;

const storeStateWithoutFilter = {
  'filterable_product_list': {
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
        'brand': 'peter england',
        "price": {
          "mrp": 2200,
          "final_price": 1100
        },
      },
      'product_2':{
        'id': 'product_2',
        'colour': {
            'color': '#33A1DE',
            'title': 'Blue'
        },
        'brand': 'raymond',
        "price": {
          "mrp": 8000,
          "final_price": 4000
        },
      },
      'product_3':{
        'id': 'product_3',
        'colour': {
            'color': '#33A1DE',
            'title': 'Blue'
        },
        'brand': 'peter england',
        "price": {
          "mrp": 3000,
          "final_price": 1500
        },
      }
    }
  }
}

describe('Product list reducer', () => {
  it('should return default state if action type does not match', () => {
    const newState = productListReducer(initialState, {type:'unknown'});
    expect(newState).toEqual(initialState);
  });
  
  it('should return all the products if no filter is applied', () => {
    const allProductIdsIfNoFilterApplied = ['product_1', 'product_2', 'product_3']

    const payload  = {...storeStateWithoutFilter, applied_filters:null}
    const newState = productListReducer(initialState, {type:FILTER_PRODUCT_LIST, payload});
    expect(newState).toEqual(allProductIdsIfNoFilterApplied);
    expect(newState).not.toEqual(initialState);
  });
  
  it('should return filtered product list to display if only color filter applied', () => {
    const onlyColorFilter = {
      'applied_filters': {
        'color':['#33A1DE'], 
      }
    };
    const onlyColorFilterOutput = ['product_2', 'product_3'];

    const payload = {...storeStateWithoutFilter, ...onlyColorFilter }
    const newState = productListReducer(initialState, {type:FILTER_PRODUCT_LIST, payload});
    expect(newState).toEqual(onlyColorFilterOutput);
    expect(newState).not.toEqual(initialState);
  });
  
  it('should return filtered product list to display if only brand filter applied', () => {
    const onlyBrandFilter = {
      'applied_filters': {
        'brand':['peter england'],
      }
    };
    const onlyBrandFilterOutput = ['product_1', 'product_3'];

    const payload = {...storeStateWithoutFilter, ...onlyBrandFilter }
    const newState = productListReducer(initialState, {type:FILTER_PRODUCT_LIST, payload});
    expect(newState).toEqual(onlyBrandFilterOutput);
    expect(newState).not.toEqual(initialState);
  });
  
  it('should return filtered product list to display if brand and color filter applied', () => {
    const brandAndColorFilter = {
      'applied_filters': {
        'brand':['peter england'],
        'color':['#33A1DE'],
      }
    }
    const brandAndColorFilterOutput = ['product_3']

    const payload = {...storeStateWithoutFilter, ...brandAndColorFilter }
    const newState = productListReducer(initialState, {type:FILTER_PRODUCT_LIST, payload});
    expect(newState).toEqual(brandAndColorFilterOutput);
    expect(newState).not.toEqual(initialState);
  });
  
  it('should return filtered product list to display if only price filter with minimum and maximum applied', () => {
    const onlyPriceWithMinMaxFilter = {
      'applied_filters': {
        'price':[1000, 3000]
      }
    };
    const onlyPriceWithMinMaxFilterOutput = ['product_1', 'product_3'];

    const payload = {...storeStateWithoutFilter, ...onlyPriceWithMinMaxFilter }
    const newState = productListReducer(initialState, {type:FILTER_PRODUCT_LIST, payload});
    expect(newState).toEqual(onlyPriceWithMinMaxFilterOutput);
    expect(newState).not.toEqual(initialState);
  });
  
  it('should return filtered product list to display if only price filter with only minimum applied', () => {
    const onlyPriceWithMinFilter = {
      'applied_filters': {
        'price':[1500]
      }
    }
    const onlyPriceWithMinFilterOutput = ['product_2', 'product_3'];

    const payload = {...storeStateWithoutFilter, ...onlyPriceWithMinFilter }
    const newState = productListReducer(initialState, {type:FILTER_PRODUCT_LIST, payload});
    expect(newState).toEqual(onlyPriceWithMinFilterOutput);
    expect(newState).not.toEqual(initialState);
  });
  
  it('should return filtered product list to display if only price filter with only maximum applied', () => {
    const onlyPriceWithMaxFilter = {
      'applied_filters': {
        'price':[, 1500]
      }
    }
    const onlyPriceWithMaxFilterOutput = ['product_1', 'product_3'];

    const payload = {...storeStateWithoutFilter, ...onlyPriceWithMaxFilter }
    const newState = productListReducer(initialState, {type:FILTER_PRODUCT_LIST, payload});
    expect(newState).toEqual(onlyPriceWithMaxFilterOutput);
    expect(newState).not.toEqual(initialState);
  });
  
  it('should return filtered product list to display if all three brand, color, and price filter applied', () => {
    const brandAndColorAndPriceFilter = {
      'applied_filters': {
        'brand':['peter england'],
        'color':['#33A1DE'],
        'price':[1000, 3000]
      }
    }
    const brandAndColorAndPriceFilterOutput = ['product_3']

    const payload = {...storeStateWithoutFilter, ...brandAndColorAndPriceFilter }
    const newState = productListReducer(initialState, {type:FILTER_PRODUCT_LIST, payload});
    expect(newState).toEqual(brandAndColorAndPriceFilterOutput);
    expect(newState).not.toEqual(initialState);
  });

  it('should return empty list if brand not match with exiting list but color and prices does', () => {
    const brandAndColorAndPriceFilter = {
      'applied_filters': {
        'brand':['nike'],
        'color':['#33A1DE'],
        'price':[1000, 3000]
      }
    }
    const brandAndColorAndPriceFilterOutput = [];
    const payload = {...storeStateWithoutFilter, ...brandAndColorAndPriceFilter }
    const newState = productListReducer(initialState, {type:FILTER_PRODUCT_LIST, payload});
    expect(newState).toEqual(brandAndColorAndPriceFilterOutput);
    expect(newState).not.toEqual(initialState);
  })
})