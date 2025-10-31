import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import heroImage from "@/assets/hero-fashion.jpg";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950 dark:via-pink-950 dark:to-blue-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/40" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              {t("index.hero.title1")}
              <span className="block text-secondary">{t("index.hero.title2")}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
              {t("index.hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button variant="secondary" size="lg" className="group">
                  {t("index.hero.cta1")}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="outline" size="lg">
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
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop"
                alt="About LUXE"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">LUXE</h3>
              <p className="text-white/80">
                {t("footer.description")}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">{t("footer.quickLinks")}</h4>
              <ul className="space-y-2 text-white/80">
                <li><Link to="/products" className="hover:text-white transition-colors">{t("footer.shop")}</Link></li>
                <li><Link to="/products" className="hover:text-white transition-colors">{t("footer.about")}</Link></li>
                <li><Link to="/products" className="hover:text-white transition-colors">{t("footer.contact")}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">{t("footer.contact")}</h4>
              <p className="text-white/80">
                hello@luxe.com<br />
                +1 (555) 123-4567
              </p>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-sm">
            © 2024 LUXE. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
