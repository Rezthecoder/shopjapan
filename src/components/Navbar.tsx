import { ShoppingCart, Menu, Search, Heart, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Handle Home link click
   * Scrolls to top if already on homepage, otherwise navigates to homepage
   */
  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsMenuOpen(false);

    if (location.pathname === '/') {
      // If already on home page, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to home page
      navigate('/');
      // Scroll to top after navigation
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  const handleFaqClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (location.pathname === '/') {
      // If already on home page, scroll to FAQ
      const faqSection = document.getElementById('faq');
      if (faqSection) {
        faqSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // Navigate to home page first, then scroll after navigation
      navigate('/');
      // Wait for page to render, then scroll
      const checkForElement = () => {
        const faqSection = document.getElementById('faq');
        if (faqSection) {
          faqSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        } else {
          // If element not found yet, try again after a short delay
          setTimeout(checkForElement, 50);
        }
      };
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        setTimeout(checkForElement, 100);
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-4xl font-black bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-yellow-400 dark:via-yellow-300 dark:to-yellow-500 bg-clip-text text-transparent hover:from-amber-700 hover:via-amber-600 hover:to-yellow-700 dark:hover:from-yellow-300 dark:hover:via-yellow-200 dark:hover:to-yellow-400 transition-all duration-300 tracking-tight drop-shadow-lg" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900 }}>
            KARU
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              onClick={handleHomeClick}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {t("nav.home")}
            </Link>
            <Link to="/products" className="text-sm font-medium hover:text-primary transition-colors">
              {t("nav.collection")}
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              {t("nav.about")}
            </Link>
            <a
              href="#faq"
              onClick={handleFaqClick}
              className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
            >
              {t("nav.faq")}
            </a>
          </div>

          <div className="flex items-center gap-4">
            <LanguageToggle />
            <ThemeToggle />
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-in slide-in-from-top">
            <Link
              to="/"
              onClick={handleHomeClick}
              className="block text-sm font-medium hover:text-primary transition-colors"
            >
              {t("nav.home")}
            </Link>
            <Link
              to="/products"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.collection")}
            </Link>
            <Link
              to="/about"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.about")}
            </Link>
            <a
              href="#faq"
              onClick={(e) => {
                handleFaqClick(e);
                setIsMenuOpen(false);
              }}
              className="block text-sm font-medium hover:text-primary transition-colors cursor-pointer"
            >
              {t("nav.faq")}
            </a>
            <Link
              to="/wishlist"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Wishlist
            </Link>
            <Link
              to="/my-orders"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              My Orders
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
