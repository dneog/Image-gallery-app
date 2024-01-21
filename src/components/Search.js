import React, { useState } from 'react'
import styles from './Search.module.css';
import search from '../assets/search.png';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';

const Search = () => {
  const [text, setText] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if(!text){
      toast.error('Please write some text in Search')
    }else{
      return navigate(`/search?q=${text}`)
      
    }
   
  }

  return (
    <div className={styles.search}>
        <img className={styles.searchbox} src={search} alt="" />
        <form className={styles.sInp} onSubmit={handleSearch}>
        <input className={styles.input} type="text" name="" value={text} onChange={(e)=> setText(e.target.value)} id="" placeholder='Search' autoFocus />
        <button className={styles.go}>Go!</button>
        </form>
       
    </div>
  )
}

export default Search