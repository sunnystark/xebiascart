import React from 'react';
import { connect } from 'react-redux';
import styles from './HeaderContainer.module.css'

function HeaderContainer(props) {

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('search functionality is not implemented yet.')
  }

  return (
    <header className='main-head'>
      <div className={styles.left}>
        <img src="https://xebiatalent.com/images/new/logo.svg" className={styles.logo} alt="logo" />
      </div>
      <div className={styles.center}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="search" name="search" className={styles['search-input']} />
          <button className={styles['search-button']}>search</button>
        </form>
      </div>
      <div className={styles.right}>
        <div>Welcome amigo</div>
        <div><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Shopping_cart_icon.svg/1200px-Shopping_cart_icon.svg.png" className={styles.cartlogo} alt=" cart logo" /></div>
         </div>
    </header>
  )
}

export default connect()(HeaderContainer);