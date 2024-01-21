import React from 'react'
import styles from './Model.module.css';

const Model = ({children}) => {
  return (
    <div className={styles.modelOverlay}>
        <div className={styles.model}>
        {children}
        </div>
    </div>
  )
}

export default Model