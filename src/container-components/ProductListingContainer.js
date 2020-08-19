import React from 'react';
import { connect } from 'react-redux';
import {ProductCard} from '../components'

function ProductListing({dispatch, productListIds, productList, appliedFiler}) {
  return (
    <main className='content'>
      {
        productListIds && productListIds.length > 0 &&
        productListIds.map(productId => (
          <ProductCard 
            key={productId}
            dispatch={dispatch} 
            {...productList.filterable_products[productId]} 
          />
        ))
      }
    </main>
  )
} 



const mapStateToProps = (state) => {
  return {
    appliedFiler: state.filter.applied_filters,
    productListIds: state.product_list,
    productList: state.filterable_product_list
  }
}

export default connect(mapStateToProps)(ProductListing);