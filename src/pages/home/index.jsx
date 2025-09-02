import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import assets from '@/assets'
import Link from 'next/link';
import { Camera, Sparkles, Download, Share2 } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  const { isDarkMode } = useTheme();
  const aosInitialized = useRef(false);

  useEffect(() => {
    if (!aosInitialized.current) {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        startEvent: 'DOMContentLoaded',
        offset: 120,
        delay: 0,
      });
      aosInitialized.current = true;
    }
    
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 0);
    
    return () => clearTimeout(timer);
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen flex flex-col items-center p-6 pt-12 overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 to-gray-100'
    }`}>
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 mb-8 w-full max-w-6xl">
        <div className="rotate-[-6deg] hidden md:block" data-aos="fade-right" data-aos-delay="150">
          <Image
            src={assets.example}
            alt="Photo Strip Left"
            width={200}
            height={600}
            className="drop-shadow-xl rounded-lg"
            priority
          />
        </div>

        <div className="text-center max-w-2xl w-full">
          <div className="mb-2 flex justify-center" data-aos="fade-down" data-aos-delay="50">
            <div className={`text-sm font-semibold px-4 py-1 rounded-full flex items-center gap-2 ${
              isDarkMode ? 'bg-gray-700 text-white' : 'bg-black text-white'
            }`}>
              <Sparkles size={16} />
              <span>No account needed</span>
            </div>
          </div>

          <h1 
            className={`font-secondary text-5xl md:text-7xl font-bold bg-gradient-to-r ${
              isDarkMode ? 'from-gray-300 to-gray-100' : 'from-gray-800 to-black'
            } bg-clip-text text-transparent`}
            data-aos="fade-up" 
            data-aos-delay="100"
          >
            YourPhoto
          </h1>

          <p 
            className={`font-primary text-xl md:text-2xl font-semibold mt-6 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
            data-aos="fade-up" 
            data-aos-delay="150"
          >
            Snap, Smile, Repeat – Unforgettable Moments Await!
          </p>

          <Link href="/pict" passHref>
            <button 
              className={`mt-10 cursor-pointer px-8 py-4 rounded-lg font-semibold flex items-center gap-3 mx-auto transition transform hover:scale-105 shadow-lg ${
                isDarkMode 
                  ? 'bg-white text-black hover:bg-gray-200' 
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
              data-aos="zoom-in" 
              data-aos-delay="200"
            >
              Start Taking Photos <Camera size={22} />
            </button>
          </Link>

          <div className="mt-8 flex justify-center gap-4" data-aos="fade-up" data-aos-delay="250">
            <div className={`flex items-center text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <Download size={16} className="mr-1" />
              <span>Save to device</span>
            </div>
            <div className={`flex items-center text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <Share2 size={16} className="mr-1" />
              <span>Instant sharing</span>
            </div>
          </div>
        </div>

        <div className="rotate-[6deg] hidden md:block" data-aos="fade-left" data-aos-delay="150">
          <Image
            src={assets.example}
            alt="Photo Strip Right"
            width={200}
            height={600}
            className="drop-shadow-xl rounded-lg"
            priority
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-2 w-full">
        <div 
          className={`p-6 rounded-lg shadow-md border text-center ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-600 text-white' 
              : 'bg-white border-gray-200 text-black'
          }`}
          data-aos="fade-up" 
          data-aos-delay="300"
        >
          <div className={`p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4 ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">Instant Capture</h3>
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Take photos instantly with just one click</p>
        </div>

        <div 
          className={`p-6 rounded-lg shadow-md border text-center ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-600 text-white' 
              : 'bg-white border-gray-200 text-black'
          }`}
          data-aos="fade-up" 
          data-aos-delay="350"
        >
          <div className={`p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4 ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">Fun Filters</h3>
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Choose from various filters and effects</p>
        </div>

        <div 
          className={`p-6 rounded-lg shadow-md border text-center ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-600 text-white' 
              : 'bg-white border-gray-200 text-black'
          }`}
          data-aos="fade-up" 
          data-aos-delay="400"
        >
          <div className={`p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4 ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">Privacy First</h3>
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Your photos never leave your device</p>
        </div>
      </div>

      <div 
        className={`mt-8 text-center text-sm mb-8 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}
        data-aos="fade-up" 
        data-aos-delay="500"
        data-aos-anchor-placement="top-bottom"
      >
        <p>No personal data collected • Works directly in your browser</p>
      </div>
    </div>
  )
}

export default Home