import React, { useEffect, useRef } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTheme } from '@/context/ThemeContext';

const About = () => {
  const { isDarkMode } = useTheme();
  const aosInitialized = useRef(false);

  useEffect(() => {
    if (!aosInitialized.current) {
      AOS.init({
        duration: 900,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
      aosInitialized.current = true;
    }
    
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 0);
    
    return () => clearTimeout(timer);
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 md:p-8 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 to-gray-100'
    }`}>
      <div className={`max-w-4xl backdrop-blur-lg shadow-2xl rounded-3xl p-8 md:p-12 text-center overflow-hidden relative border ${
        isDarkMode 
          ? 'bg-gray-800/95 border-gray-700 text-white' 
          : 'bg-white/95 border-gray-200 text-black'
      }`}>
        <div 
          className={`absolute -top-12 -left-12 w-24 h-24 rounded-full opacity-40 ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}
          data-aos="fade-down-right"
          data-aos-delay="200"
        ></div>
        <div 
          className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full opacity-40 ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
          }`}
          data-aos="fade-up-left"
          data-aos-delay="300"
        ></div>
        <div 
          className={`absolute top-1/3 -right-8 w-16 h-16 rounded-full opacity-30 ${
            isDarkMode ? 'bg-gray-600' : 'bg-gray-400'
          }`}
          data-aos="zoom-in"
          data-aos-delay="400"
        ></div>
        
        <div className="relative z-10">
          <div 
            className="flex justify-center mb-6"
            data-aos="fade-down"
            data-aos-delay="100"
          >
            <div className={`p-3 rounded-full shadow-lg border ${
              isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-black border-gray-300'
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          
          <h1 
            className={`text-4xl md:text-5xl font-bold mb-6 font-display tracking-tight ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            About <span>YourPhoto</span>
          </h1>
          
          <p 
            className={`text-lg leading-relaxed mb-6 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Welcome to <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>YourPhoto</span> – your
            ultimate photobooth experience!  
            We believe that every smile, laugh, and silly moment deserves to be
            captured and treasured forever. Whether it's with friends, family, or
            colleagues, YourPhoto turns simple snapshots into unforgettable
            memories.
          </p>

          <div 
            className="my-8 flex justify-center"
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            <div className={`w-24 h-1 rounded-full ${
              isDarkMode ? 'bg-gradient-to-r from-gray-500 to-gray-700' : 'bg-gradient-to-r from-gray-400 to-gray-600'
            }`}></div>
          </div>

          <p 
            className={`text-lg leading-relaxed mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
            data-aos="fade-up"
            data-aos-delay="500"
          >
            With our playful themes, fun stickers, and high-quality prints,
            YourPhoto brings joy to every event. From birthdays and weddings to
            casual hangouts, we're here to make sure you leave with a pocket full
            of memories.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div 
              className={`p-4 rounded-lg shadow-md border hover:shadow-lg transition-shadow ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Fun Themes</h3>
              <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Various themes for every occasion</p>
            </div>
            
            <div 
              className={`p-4 rounded-lg shadow-md border hover:shadow-lg transition-shadow ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Creative Stickers</h3>
              <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Enhance your photos with fun elements</p>
            </div>
            
            <div 
              className={`p-4 rounded-lg shadow-md border hover:shadow-lg transition-shadow ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>High Quality</h3>
              <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Premium prints that last</p>
            </div>
          </div>

          <div 
            className={`mt-8 py-4 rounded-lg shadow-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-black'
            }`}
            data-aos="zoom-in"
            data-aos-delay="500"
          >
            <p className={`text-xl font-semibold tracking-wide ${
              isDarkMode ? 'text-white' : 'text-white'
            }`}>
              SNAP • SMILE • REPEAT
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;