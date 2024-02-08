import React from 'react'
import '../app.css'
import { Link } from 'react-router-dom'

export default function Button() {
  return (
    <>
      <a href={"/app"}>
        <button className="chatapp-btn">Chat App</button>
      </a>
    </>
  )
}
export function FooterButton() {
  return (
    <>
      <a href={"/app"}>
        <button className="chatapp-btn" style={{color:"white"}}>Chat App</button>
      </a>
    </>
  )
}
