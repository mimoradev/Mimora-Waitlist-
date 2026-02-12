import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import WaitlistSlider from './WaitlistSlider';

function Navbar() {
    const [isSliderOpen, setIsSliderOpen] = useState(false);

    const openSlider = useCallback(() => setIsSliderOpen(true), []);
    const closeSlider = useCallback(() => setIsSliderOpen(false), []);

    // Smooth scroll handler for navigation links
    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <>
            <nav className="sticky top-0 left-0 right-0 z-50 bg-white" style={{ height: '64px' }}>
                <div className="max-w-[1440px] mx-auto h-full flex items-center justify-between px-6 md:px-10">
                    {/* Logo */}
                    <a href="/" className="flex items-center">
                        <img
                            src="/info/common/logo.png"
                            alt="Mimora"
                            style={{ height: '28px', width: 'auto' }}
                            className="object-contain"
                        />
                    </a>

                    {/* Right side: Nav Links + Join */}
                    <div className="flex items-center gap-3 md:gap-6">
                        {/* Desktop Nav Links */}
                        <div className="hidden md:flex items-center gap-6">
                            <a
                                href="#services"
                                onClick={(e) => handleSmoothScroll(e, 'services')}
                                className="text-[14px] font-medium text-[#2B2B2B] hover:text-[#1E1E1E] transition-colors"
                            >
                                Services
                            </a>
                            <a
                                href="#contact"
                                onClick={(e) => handleSmoothScroll(e, 'contact')}
                                className="text-[14px] font-medium text-[#2B2B2B] hover:text-[#1E1E1E] transition-colors"
                            >
                                Contact us
                            </a>
                        </div>

                        {/* Join Button - Always Visible */}
                        <motion.button
                            onClick={openSlider}
                            className="flex items-center justify-center bg-[#E84A7F] text-white text-[13px] font-semibold rounded-full cursor-pointer"
                            style={{
                                height: '36px',
                                paddingLeft: '18px',
                                paddingRight: '18px',
                                boxShadow: '0 2px 8px rgba(232,74,127,0.25)'
                            }}
                            whileHover={{ scale: 1.05, boxShadow: '0 4px 16px rgba(232,74,127,0.35)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Join
                        </motion.button>
                    </div>
                </div>
            </nav>

            {/* Waitlist Slider */}
            <WaitlistSlider isOpen={isSliderOpen} onClose={closeSlider} />
        </>
    );
}

export default Navbar;

