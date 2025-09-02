import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import assets from '@/assets';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTheme } from '@/context/ThemeContext';

const layoutOptions = [
  {
    id: 1,
    title: 'Layout A',
    tagline: 'Size 6 x 4 Strip',
    imageUrl: assets.layout1,
    pageUrl: '/photo/1',
    posts: '(4 Pose)'
  },
  {
    id: 2,
    title: 'Layout B',
    tagline: 'Size 6 x 3 Strip',
    imageUrl: assets.layout2,
    pageUrl: '/photo/2',
    posts: '(3 Pose)'
  },
  {
    id: 3,
    title: 'Layout C',
    tagline: 'Size 6 x 4 Strip',
    imageUrl: assets.layout3,
    pageUrl: '/photo/3',
    posts: '(4 Pose)'
  },
  {
    id: 4,
    title: 'Layout D',
    tagline: 'Size 6 x 3 Strip',
    imageUrl: assets.layout4,
    pageUrl: '/photo/4',
    posts: '(3 Pose)'
  }
];

const LayoutPage = () => {
  const { isDarkMode } = useTheme();
  const aosInitialized = useRef(false);

  useEffect(() => {
    if (!aosInitialized.current) {
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        mirror: false,
        offset: 50
      });
      aosInitialized.current = true;
    }

    const timer = setTimeout(() => {
      AOS.refresh();
    }, 0);
    
    return () => clearTimeout(timer);
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 to-gray-100'
    }`}>
      <Head>
        <title>Choose Layout - Photobooth</title>
        <meta name="description" content="Choose your photobooth layout" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12 w-full">
        <div 
          className="text-center mb-2"
          data-aos="fade-down"
          data-aos-delay="100"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold uppercase">choose your layout</h2>
        </div>
        <p 
          className={`text-center mb-6 sm:mb-8 md:mb-12 text-xs sm:text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
          data-aos="fade-down"
          data-aos-delay="200"
        >
          NOTE: you have 3 seconds for each shot
        </p>
        <div className="flex justify-center w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full max-w-7xl px-2 sm:px-4">
            {layoutOptions.map((layout, index) => (
              <Link
                key={layout.id}
                href={`/photo?layout=${layout.id}`}
                className="block w-full"
              >
                <div 
                  className={`border shadow-sm hover:shadow-md transition-all duration-300 rounded overflow-hidden h-full flex flex-col transform hover:-translate-y-1 w-full ${
                    isDarkMode 
                      ? 'border-gray-700 bg-gray-800 hover:shadow-gray-700' 
                      : 'border-gray-300 bg-white hover:shadow-gray-400'
                  }`}
                  data-aos="flip-up"
                  data-aos-delay={300 + (index * 100)}
                  data-aos-easing="ease-out-back"
                >
                  <div className={`flex-1 flex items-center justify-center overflow-hidden min-h-[200px] sm:min-h-[250px] md:min-h-[300px] w-full ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <img
                      src={layout.imageUrl}
                      alt={layout.title}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="p-2 sm:p-3 text-center">
                    <h3 className="text-sm sm:text-base font-bold uppercase mb-1">{layout.title}</h3>
                    <p className={`text-xs sm:text-xs font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {layout.tagline}
                    </p>
                    <p className={`text-xs mt-1 ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      {layout.posts}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="h-6 sm:h-8 md:h-12"></div>
      </main>
    </div>
  );
};

export default LayoutPage;