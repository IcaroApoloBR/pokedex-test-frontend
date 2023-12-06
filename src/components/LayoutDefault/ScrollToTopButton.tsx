import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import { AnimatePresence, motion } from 'framer-motion';

const ScrollToTopButton = () => {
    const [showButton, setShowButton] = useState(false);

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScrollButtonVisibility = () => {
            window.pageYOffset > 1 ? setShowButton(true) : setShowButton(false);
        };

        window.addEventListener('scroll', handleScrollButtonVisibility);
        return () => {
            window.removeEventListener('scroll', handleScrollButtonVisibility);
        };
    }, [])

    return (
        <AnimatePresence>
            {showButton && (
                <motion.button
                    initial={{ opacity: 0, right: -10 }}
                    animate={{ opacity: 1, right: 16 }}
                    exit={{ opacity: 0, right: -10 }}
                    className="fixed bottom-12 right-7 z-50 cursor-pointer p-4 hover:animate-bounce duration-500" onClick={handleScrollToTop}
                >
                    <Icon className="rotate-180" icon="mdi:pokemon-go" color="#CC0000" width="42" height="42" />
                </motion.button>
            )}
        </AnimatePresence>
    )
}

export default ScrollToTopButton