import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { products } from "@/data/products";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-fashion.jpg";

const Index = () => {
  const { t, language } = useLanguage();

  // Prioritize jewelry items first to encourage purchases
  const jewelryProducts = products.filter(p => p.category === "Jewelry");
  const otherProducts = products.filter(p => p.category !== "Jewelry");
  // Show up to 4 jewelry items, fill remaining slots with other products if needed
  const featuredProducts = jewelryProducts.length >= 4
    ? jewelryProducts.slice(0, 4)
    : [...jewelryProducts, ...otherProducts.slice(0, 4 - jewelryProducts.length)];

  const handleFaqClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const faqSection = document.getElementById('faq');
    if (faqSection) {
      faqSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950 dark:via-pink-950 dark:to-blue-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Luxury Jewelry Collection"
            className="w-full h-full object-cover brightness-110 saturate-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center z-10">
          <div className="max-w-2xl">
            <h1 className={`font-bold text-white mb-6 leading-tight drop-shadow-lg ${language === "ja" ? "text-4xl md:text-6xl" : "text-5xl md:text-7xl"
              }`}>
              {t("index.hero.title1")}
              <span className="block text-yellow-200">{t("index.hero.title2")}</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl drop-shadow-md">
              {t("index.hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button variant="secondary" size="lg" className="group bg-yellow-400 hover:bg-yellow-500 text-black font-semibold shadow-xl hover:shadow-2xl transition-all">
                  {t("index.hero.cta1")}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="outline" size="lg" className="border-2 border-white/80 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
                  {t("index.hero.cta2")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-r from-cyan-100 to-teal-100 dark:from-cyan-900 dark:to-teal-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("index.featured.title")}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("index.featured.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/products">
              <Button variant="outline" size="lg">
                {t("index.featured.cta")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("index.categories.title")}</h2>
            <p className="text-muted-foreground text-lg">{t("index.categories.subtitle")}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "index.categories.outerwear", image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&auto=format&fit=crop" },
              { name: "index.categories.dresses", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop" },
              { name: "index.categories.tops", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop" },
              { name: "index.categories.accessories", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop" }
            ].map((category) => (
              <Link key={category.name} to="/products">
                <div className="group relative aspect-square rounded-lg overflow-hidden bg-muted hover:shadow-lg transition-all duration-300">
                  <img
                    src={category.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-primary/20 group-hover:from-primary/90 group-hover:to-primary/30 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-xl font-semibold">{t(category.name)}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{t("index.about.title")}</h2>
              <p className="text-muted-foreground text-lg mb-4">
                {t("index.about.text1")}
              </p>
              <p className="text-muted-foreground text-lg mb-6">
                {t("index.about.text2")}
              </p>
              <Link to="/products">
                <Button variant="secondary" size="lg">
                  {t("index.about.cta")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="aspect-square rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=90"
                alt="Stylish Female Dress Collection"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("index.faq.title")}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("index.faq.subtitle")}
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {[
                { q: "index.faq.q1", a: "index.faq.a1" },
                { q: "index.faq.q2", a: "index.faq.a2" },
                { q: "index.faq.q3", a: "index.faq.a3" },
                { q: "index.faq.q4", a: "index.faq.a4" },
              ].map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card rounded-lg border border-border overflow-hidden"
                >
                  <AccordionTrigger className="text-xl font-semibold text-foreground hover:no-underline px-6 py-4">
                    {t(faq.q)}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed px-6 pb-4">
                    {t(faq.a)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">{t("footer.brand")}</h3>
              <p className="text-white/70 leading-relaxed">
                {t("footer.tagline")}
              </p>
            </div>

            {/* Shop Column */}
            <div>
              <h4 className="font-semibold mb-4 text-white text-lg">{t("footer.shop.heading")}</h4>
              <ul className="space-y-3 text-white/70">
                <li><Link to="/products" className="hover:text-white transition-colors">{t("footer.shop.clothing")}</Link></li>
                <li><Link to="/products" className="hover:text-white transition-colors">{t("footer.shop.jewelry")}</Link></li>
                <li><Link to="/products" className="hover:text-white transition-colors">{t("footer.shop.collections")}</Link></li>
                <li><Link to="/products" className="hover:text-white transition-colors">{t("footer.shop.newArrivals")}</Link></li>
              </ul>
            </div>

            {/* Customer Care Column */}
            <div>
              <h4 className="font-semibold mb-4 text-white text-lg">{t("footer.customerCare.heading")}</h4>
              <ul className="space-y-3 text-white/70">
                <li><Link to="/about" className="hover:text-white transition-colors">{t("footer.customerCare.contactUs")}</Link></li>
                <li>
                  <a
                    href="#faq"
                    onClick={handleFaqClick}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {t("footer.customerCare.faq")}
                  </a>
                </li>
              </ul>
            </div>

            {/* Connect Column */}
            <div>
              <h4 className="font-semibold mb-4 text-white text-lg">{t("footer.connect.heading")}</h4>
              <p className="text-white/70 mb-4 italic">
                {t("footer.connect.tagline")}
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              {t("footer.copyright")}
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/products" className="text-white/60 hover:text-white transition-colors">
                {t("footer.privacy")}
              </Link>
              <Link to="/products" className="text-white/60 hover:text-white transition-colors">
                {t("footer.terms")}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
