import React from 'react'
import MovieList from './MovieList'
import styles from './css/homepage.module.css'

export default function Homepage() {
  return (
    <div id={styles.container}>
        <h1 id={styles.heading}>Pick and watch your favorite movie on this weekend</h1>
       <MovieList/>       
    </div>
  )
}
