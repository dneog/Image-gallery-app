import React, { useState } from 'react'
import styles from './NewSearch.module.css';
import search from '../assets/search.png';
import {useNavigate} from 'react-router-dom';
const NewSearch = ({handlePage}) => {
  const [text, setText] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    setText('')
    handlePage(1)
    return navigate(`/search?q=${text}`)
  }

  return (
    <div className={styles.NewSearch}>
        <img className={styles.searchbox} src={search} alt="" />
        <form className={styles.sInp} onSubmit={handleSearch}>
        <input className={styles.input} type="text" name="" value={text} onChange={(e)=> setText(e.target.value)} id="" placeholder='Start New Search' autoFocus />
        <button className={styles.go}>Go!</button>
        </form>
       
    </div>
  )
}

export default NewSearch