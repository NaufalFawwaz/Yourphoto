// components/PhotoBooth/Navbar.jsx
import React, { useState } from 'react'
import Link from 'next/link';
import assets from '@/assets'
import { useTheme } from '@/context/ThemeContext'

const navItem = [
    {
        name: 'Home',
        url: '/'
    },
    {
        name: 'About',
        url: '/about'
    },
    {
        name: 'Privacy Policy',
        url: '/privacy'
    },
    {
        name: 'Layouts',
        url: '/pict'
    }
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`w-full p-4 flex items-center justify-between sticky top-0 z-50 shadow-md transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-white text-black'
    }`}>
      <Link href="/">
        <img 
          src={isDarkMode ? assets.logo_light : assets.logo} 
          alt="logo" 
          height={40} 
          width={160} 
          className="ml-4 md:ml-9" 
        />
      </Link>

      <div className='hidden md:flex flex-grow justify-center pr-10'>
        <div className='flex flex-row gap-10 font-primary font-semibold text-lg'>
          {navItem.map(data => (
            <div className='relative group' key={data.name}>
              <Link
                href={data.url}
                className={`transition-colors duration-300 ease-in-out hover:text-gray-400 ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
              >
                {data.name}
                <div className='absolute bottom-0 left-0 w-0 h-1 bg-gray-400 transition-all duration-300 ease-in-out group-hover:w-full rounded-md'></div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="md:hidden flex items-center">
        <button 
          onClick={toggleMenu}
          className={`hover:text-gray-700 focus:outline-none mr-4 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-500'
          }`}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <button 
        className='mr-9 hidden md:block'
        onClick={toggleTheme}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <img 
          src={isDarkMode ? assets.light : assets.night} 
          alt={isDarkMode ? 'light mode' : 'dark mode'} 
          className="w-10 h-10  cursor-pointer"
        />
      </button>

      <div className={`md:hidden fixed top-16 left-0 w-full h-full z-40 transform transition-transform duration-300 ease-in-out ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      } ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col items-center mt-10 space-y-8">
          {navItem.map(data => (
            <div className='relative group' key={data.name}>
              <Link
                href={data.url}
                className={`transition-colors duration-300 ease-in-out hover:text-gray-400 text-xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {data.name}
                <div className='absolute bottom-0 left-0 w-0 h-1 bg-gray-400 transition-all duration-300 ease-in-out group-hover:w-full rounded-md'></div>
              </Link>
            </div>
          ))}

          <button 
            onClick={toggleTheme}
            className='mt-4'
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <img 
              src={isDarkMode ? assets.light : assets.night} 
              alt={isDarkMode ? 'light mode' : 'dark mode'} 
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar