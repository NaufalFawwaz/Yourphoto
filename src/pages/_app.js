import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from '@/context/ThemeContext';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <div className="bg-primary min-h-screen flex flex-col dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default MyApp;