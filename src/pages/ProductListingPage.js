import React from 'react';
import {
  ProductListing,
  FiltersListing,
  HeaderContainer
} from '../container-components';


function ProductListingPage() {
  return (
    <div className='container'>
      <HeaderContainer /> 
      <FiltersListing />
      <ProductListing />
    </div>
  )
}

export default ProductListingPage