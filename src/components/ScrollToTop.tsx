import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * ScrollToTop Component
 * 
 * A floating button that appears on the left side of the screen when the user scrolls down.
 * Clicking it smoothly scrolls the page back to the top.
 */
const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    /**
     * Toggle visibility of the scroll-to-top button based on scroll position
     * Button appears when user scrolls down more than 300px
     */
    useEffect(() => {
        const toggleVisibility = () => {
            // Show button when user scrolls down more than 300px
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        // Listen for scroll events
        window.addEventListener("scroll", toggleVisibility);

        // Check initial scroll position
        toggleVisibility();

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    /**
     * Scroll to top of the page smoothly
     */
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // Don't render if not visible
    if (!isVisible) {
        return null;
    }

    return (
        <Button
            onClick={scrollToTop}
            className="fixed left-6 bottom-6 z-50 h-12 w-12 rounded-full shadow-lg bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-yellow-400 dark:via-yellow-300 dark:to-yellow-500 hover:from-amber-700 hover:via-amber-600 hover:to-yellow-700 dark:hover:from-yellow-300 dark:hover:via-yellow-200 dark:hover:to-yellow-400 transition-all duration-300 hover:scale-110"
            aria-label="Scroll to top"
        >
            <ArrowUp className="h-5 w-5 text-white" />
        </Button>
    );
};

export default ScrollToTop;

