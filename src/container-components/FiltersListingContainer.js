import React from 'react';
import { connect } from 'react-redux';
import ColorContainer from './ColorContainer';
import BrandContainer from './BrandContainer';
import PriceContainer from './PriceContainer';
import { resetAppliedFilter } from '../actions/filterActions';
import { filterProductList } from '../actions/productActions';
import {BRAND, COLOUR, PRICE} from '../constants/appConst'

import styles from './FiltersListingContainer.module.css'

const mapComponent = {
  [BRAND.toUpperCase()]:BrandContainer,
  [COLOUR.toUpperCase()]:ColorContainer,
  [PRICE.toUpperCase()]:PriceContainer
}

function FiltersListing(props){
  const handleReset = () => {
    props.dispatch(resetAppliedFilter());
    props.dispatch(filterProductList());
  }

  return (
    <section className='side'>
      <header className={`${styles.header} ${styles.gap}`}>
        <h3>Filters</h3>
        <button className={styles.button} onClick={handleReset}>
          <svg className={styles['reset-svg']} viewBox="0 0 24 22" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" width="2rem" height="2rem">
            <g>
              <path d="M17.65 6.35c-1.45-1.45-3.44-2.35-5.65-2.35-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78l-3.22 3.22h7v-7l-2.35 2.35z"></path>
            </g>
          </svg>
        </button>
      </header>
      <div>
        {
          props.filters &&
          props.filters.map((item) => {
            let Component = mapComponent[item.type];
            return (<Component key={item.type} values={item.values}/>)
          })
        }
      </div>
    </section>
  )
}

const mapStateToProps = (state) => {
  return {
    filters: state.filter.filter_list
  }
}

export default connect(mapStateToProps)(FiltersListing);