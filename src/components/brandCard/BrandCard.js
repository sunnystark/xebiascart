import React from 'react';
import BrandComponent from './BrandComponent';

import InfiniteLoading from 'react-simple-infinite-loading';

import styles from './BrandCard.module.css'

function rowContainer(items, handleChange, selectedBrands){
  let mapArray = []
  let len = items.length;
  for(let i = 0; i + 1 < len; i += 2){
    let first = items[i];
    let second = items[i+1];
    mapArray.push(
      <div className={styles['brand-options']} key={`${first.value}__${second.value}`}>
        <BrandComponent 
              {...first}
              selected={selectedBrands.includes(first.value)}
              handleChange={handleChange}
            />
        <BrandComponent 
              {...second}
              selected={selectedBrands.includes(second.value)}
              handleChange={handleChange}
            />
      </div>
    )
  }
  if(len % 2 === 1){
    let last = items[len -1];
    mapArray.push(
      <div key={`${last.value}`}>
        <BrandComponent 
              {...last}
              selected={selectedBrands.includes(last.value)}
              handleChange={handleChange}
            />
      </div>
    )
  }
  return mapArray;
}

function BrandCard(props) {
  return (
    <div className={styles.container}>
      <h3>Brand</h3>
      <div style={{ width: '100%', height: '10rem' }}>
      <InfiniteLoading
        itemHeight={40}
      >
        { 
          rowContainer(props.values, props.handleChange, props.selectedBrands)
        }
      </InfiniteLoading>
      </div>
    </div>
  )
}

export default BrandCard;