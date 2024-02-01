import React, { useContext } from 'react'
import '../app.css'
import logo from '../assets/logo.png'
import { ConfigContext } from '../context/config.context'

const Header = () => {
    const { isDarkMode } = useContext(ConfigContext)
    return (
        <>
            <nav className="navbar navbar-expand-md">
                <div className="container-fluid">
                    <a className="navbar-brand " href="#"
                        style={{ display: "flex", justifyContent: "center" }}>
                        <img src={logo} alt="Bootstrap" className='landing-logo' style={{ width: "4rem" }} />
                    </a>
                    <button
                        className="navbar-toggler ms-auto"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseNavbar"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse" id="collapseNavbar"
                    >
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#myAlert" data-bs-toggle="collapse"
                                >Contact</a >
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <button className="chatapp-btn">Chat App</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav >
        </>
    )
}

export default Header;