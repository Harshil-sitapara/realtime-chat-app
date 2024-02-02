import React from 'react'
import "../../App.css"
import bg from '../../assets/landing/bg.png'

export default function Landing() {
    return (
        <>
            <div className="main-landing-container">
                <div className='main-hero'>
                    <img src={bg} alt="bg image" className='bg-image' />
                    <div className="left-hero">
                        <h1 className='text-red-950'>
                            Message privately
                        </h1>
                    </div>
                    <div className="left-hero"></div>
                </div>
            </div>
        </>
    )
}