import '../app.css'
import logo from '../assets/logo.png'
import logo1 from '../assets/logo1.png'

import { useEffect, useState } from "react";
import Button from "./Button";

export default function Header() {
    const [navbar, setNavbar] = useState(false);
    const [showBorder, setShowBorder] = useState(true);

    useEffect(() => {
        function handleScroll() {
            const scrollTop = window.scrollY;
            if (scrollTop === 0) {
                setShowBorder(false);
            } else {
                setShowBorder(true);
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`w-full bg-[#fcf5ebcc] fixed top-0 z-[99999] ${showBorder ? 'border-b-[1px] border-[#cec9c1]' : ''} backdrop-blur-sm custom-nav`}>
            <div className="justify-between px-4 mx-auto lg:max-w-7xl lg:max-h-[70px] md:max-h-[70px] md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <a href="javascript:void(0)">
                            <h2 className="text-2xl font-bold text-black"><img src={logo1} width={'150px'} alt="Logo" /></h2>
                        </a>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-black"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-black"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                            }`}
                    >
                        <ul className="items-center text-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            <li>
                                <a href="javascript:void(0)" className="transition-colors hover:text-[#25d366]">Home</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)" className="transition-colors hover:text-[#25d366]">Blog</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)" className="transition-colors hover:text-[#25d366]">About US</a>
                            </li>
                        </ul>

                        <div className="mt-3 space-y-2 md:hidden pb-[12px] flex justify-center">
                            <Button />
                        </div>
                    </div>
                </div>
                <div className="hidden space-x-2 md:inline-block">
                    <Button />

                </div>
            </div>
        </nav>
    );
}