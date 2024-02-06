import React from 'react'
import '../app.css'
import { Link } from 'react-router-dom'

export default function Button() {
  return (
    <>
      <a href={"/app"}>
        <button className="chatapp-btn">Chat App</button>
      </a>
      {/* <nav className='main-btn'>
        <ul>
          <li>
            contact
            <span></span>
          </li>
        </ul>
      </nav> */}
    </>
  )
}
