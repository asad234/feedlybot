'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Features', href: '/#features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'About', href: '/about' },
    ];
    
    return (
        <header className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center space-x-2">
                             <svg className="h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.17 48.17 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                            </svg>
                            <span className="text-2xl font-bold text-gray-800">FeedlyBot</span>
                        </Link>
                    </div>
                    <nav className="hidden md:flex md:items-center md:space-x-8">
                        {navLinks.map(link => (
                             <Link key={link.name} href={link.href} className="font-medium text-gray-600 hover:text-blue-600 transition-colors">
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                    <div className="hidden md:flex items-center space-x-2">
                        <Link href="/dashboard" className="font-medium text-gray-600 hover:text-blue-600 px-4 py-2 rounded-md transition-colors">Log In</Link>
                        <Link href="/dashboard" className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">Sign Up</Link>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-white py-4">
                     {navLinks.map(link => (
                         <Link key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-600">
                            {link.name}
                        </Link>
                    ))}
                    <div className="px-4 pt-4 pb-2 border-t border-gray-200 flex flex-col space-y-2">
                         <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="w-full text-left font-medium text-gray-600 hover:text-blue-600 px-4 py-2 rounded-md transition-colors">Log In</Link>
                        <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="w-full text-center bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition-all">Sign Up</Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
