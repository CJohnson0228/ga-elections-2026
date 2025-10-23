import { useOutlet, useLocation } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import { cloneElement } from 'react';

import Header from './Header';
import Footer from './Footer';

// Root layout component
function RootLayout() {
    const location = useLocation();
    const outlet = useOutlet();
  
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-14">
          <AnimatePresence mode="wait" initial={false}>
            {outlet && cloneElement(outlet, { key: location.pathname })}
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    );
  }

  export default RootLayout