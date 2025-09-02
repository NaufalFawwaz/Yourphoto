import React, { useEffect, useRef } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTheme } from '@/context/ThemeContext';

const PrivacyPolicy = () => {
  const { isDarkMode } = useTheme();
  const aosInitialized = useRef(false);

  useEffect(() => {
    if (!aosInitialized.current) {
      AOS.init({
        duration: 1000,
        easing: 'ease-out-back',
        once: true,
        mirror: false,
        offset: 100
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
      <div className={`max-w-3xl backdrop-blur-lg shadow-xl rounded-3xl p-8 md:p-10 overflow-hidden relative border ${
        isDarkMode 
          ? 'bg-gray-800/95 border-gray-700' 
          : 'bg-white/95 border-gray-200'
      }`}>
        <div 
          className={`absolute -top-8 -left-8 w-16 h-16 rounded-full opacity-30 ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}
          data-aos="fade-down-right"
          data-aos-easing="ease-out-cubic"
          data-aos-delay="200"
        ></div>
        <div 
          className={`absolute -bottom-6 -right-6 w-20 h-20 rounded-full opacity-30 ${
            isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
          }`}
          data-aos="fade-up-left"
          data-aos-easing="ease-out-cubic"
          data-aos-delay="300"
        ></div>
        
        <div className="relative z-10">
          <div 
            className="flex justify-center mb-5"
            data-aos="zoom-in"
            data-aos-easing="ease-out-back"
            data-aos-delay="100"
          >
            <div className={`p-3 rounded-full shadow-md border ${
              isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-black border-gray-300'
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          
          <h1 
            className={`text-3xl md:text-4xl font-bold mb-6 font-display tracking-tight text-center ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
            data-aos="fade-up"
            data-aos-easing="ease-out-cubic"
            data-aos-delay="200"
          >
            Privacy <span className="border-b-3 border-black">First</span>
          </h1>
          
          <div className="space-y-6">
            <div 
              className="text-center mb-2"
              data-aos="fade-down"
              data-aos-easing="ease-out-quad"
              data-aos-delay="300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <p className={`text-lg font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-800'
              }`}>Your Privacy Matters</p>
            </div>

            <div 
              className={`p-6 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-gray-300' 
                  : 'bg-gray-50 border-gray-200 text-gray-700'
              }`}
              data-aos="fade-up"
              data-aos-easing="ease-out-cubic"
              data-aos-delay="400"
            >
              <p className="leading-relaxed text-center">
                At <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>YourPhoto</span>, we believe in complete transparency 
                and respect for your privacy. Our photobooth app is designed with a fundamental principle: 
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}> your data stays with you</span>.
              </p>
            </div>

            <div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
              data-aos="zoom-in"
              data-aos-easing="ease-out-back"
              data-aos-delay="500"
            >
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>No Data Collection</p>
                  <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>We don't collect, store, or share any personal information</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Local Processing Only</p>
                  <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>All photo processing happens locally on your device</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Camera Access Only</p>
                  <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>We only access your camera with your explicit permission</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>No Tracking</p>
                  <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>We don't use analytics or tracking of any kind</p>
                </div>
              </div>
            </div>

            <div 
              className={`p-5 rounded-lg mt-6 border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-gray-300' 
                  : 'bg-gray-100 border-gray-250 text-gray-700'
              }`}
              data-aos="fade-up"
              data-aos-easing="ease-out-quad"
              data-aos-delay="600"
            >
              <p className="leading-relaxed text-center">
                In short: <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Your photos never leave your browser</span>. 
                Once you take pictures with our app, they remain exclusively on your device. 
                No uploads, no cloud storage, no hidden data collection.
              </p>
            </div>

            <div 
              className="text-center mt-6"
              data-aos="fade-down"
              data-aos-easing="ease-out-cubic"
              data-aos-delay="700"
            >
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-500' : 'text-gray-500'
              }`}>
                Have questions about our privacy practices? <br className="hidden sm:inline" />
                <span className={`font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>We're happy to clarify!</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;