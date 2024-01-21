import React, { useState } from 'react';
import styles from './Categories.module.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {useNavigate} from 'react-router-dom';

const Categories = ({images, handlePage}) => {

  const navigate = useNavigate()

    let category = []
    // Push all tags to category array
    images.map((item)=> category.push(item.tags))

    // split the combined words in to array. eg.=> 'flower, nature, flora' to [flower, nature, flora]
    const arrayFromString = category.map(str => str.split(', '))

    // flat all sub arrays into a single array 
    const singleArray = arrayFromString.flat()

    // Remove the duplicate words from array
    const filteredArray = singleArray.filter((word, index, array)=> array.indexOf(word) == index)

    const handleCategory=(item)=> {
      handlePage(1)
       navigate(`/search?q=${item}`)
    }


    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 6
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 6
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2
        }
      };


  return (
    <div className={styles.Carousel}>
    <Carousel
      responsive={responsive} 
      itemClass="carousel-containers" 
      dotListClass="custom-dot-list-style"  
      infinite={true}
      arrows={false}
      autoPlay={true} 
      autoPlaySpeed={2000}
      keyBoardControl={true}
      transitionDuration={500} 
      removeArrowOnDeviceType={["tablet", "mobile"]}
      draggable={true}>

      {filteredArray.map((item)=> (
        <div className={styles.gap} onClick={() => handleCategory(item)}>    
        <p className={styles.n1}>{item}</p>
        </div>
      ))}

   </Carousel>
    </div>
  )
}

export default Categories