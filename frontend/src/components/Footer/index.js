import React from 'react'
import './Footer.css'


export default function Footer() {
  return (
    <div className='footer-container'>
      <div className='footer-header'>
        By <a className='footer-name' href='https://jacoblauxman.com/'>Jacob Lauxman</a>
      </div>
      <div className='footer-link'>
        <a href='https://www.linkedin.com/in/jacob-lauxman-a3170b261/'><i class="fa-brands fa-linkedin"></i></a>
      </div>
      <div className='footer-link'>
        <a href='https://github.com/jacoblauxman'><i class="fa-brands fa-github"></i></a>
      </div>
      <div className='footer-link'>
        <a href='https://jacoblauxman.com/#work'>My Portfolio</a>
      </div>
    </div>
  )
}
