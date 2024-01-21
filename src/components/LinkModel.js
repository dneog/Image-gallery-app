import React from 'react'
import styles from './LinkModel.module.css';

const LinkModel = ({children}) => {
  return (
    <div className={styles.modelOverlay}>
        <div className={styles.model}>
        {children}
        </div>
    </div>
  )
}

export default LinkModel