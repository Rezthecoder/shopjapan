import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import heroImage from "@/assets/hero-fashion.jpg";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
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
              タイムレススタイル
              <span className="block text-secondary">モダンエレガンス</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
              モダンなワードローブのために厳選されたファッションエッセンシャル。高品質な職人技と現代的なスタイルが融合。
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button variant="secondary" size="lg" className="group">
                  コレクションを見る
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="outline" size="lg">
                  もっと詳しく
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">注目の商品</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              最新コレクションから厳選されたアイテム
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
                すべての商品を見る
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">カテゴリー別に探す</h2>
            <p className="text-muted-foreground text-lg">コレクションを探索</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "アウター", image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&auto=format&fit=crop" },
              { name: "ドレス", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop" },
              { name: "トップス", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop" },
              { name: "アクセサリー", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop" }
            ].map((category) => (
              <Link key={category.name} to="/products">
                <div className="group relative aspect-square rounded-lg overflow-hidden bg-muted hover:shadow-lg transition-all duration-300">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-primary/20 group-hover:from-primary/90 group-hover:to-primary/30 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-xl font-semibold">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">私たちのストーリー</h2>
              <p className="text-muted-foreground text-lg mb-4">
                タイムレスなスタイルと高品質な職人技の原則に基づいて設立されたLUXEは、時代を超えて愛される厳選されたファッションエッセンシャルをお届けします。
              </p>
              <p className="text-muted-foreground text-lg mb-6">
                コレクションの各アイテムは慎重に選ばれ、最高級の素材と完璧なデザインをお約束します。
              </p>
              <Link to="/products">
                <Button variant="secondary" size="lg">
                  コレクションを探索
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
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">LUXE</h3>
              <p className="text-primary-foreground/80">
                モダンな個人のためのタイムレスなファッションをキュレーション。
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">クイックリンク</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><Link to="/products" className="hover:text-primary-foreground transition-colors">ショップ</Link></li>
                <li><Link to="/products" className="hover:text-primary-foreground transition-colors">アバウト</Link></li>
                <li><Link to="/products" className="hover:text-primary-foreground transition-colors">お問い合わせ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">お問い合わせ</h4>
              <p className="text-primary-foreground/80">
                hello@luxe.com<br />
                +1 (555) 123-4567
              </p>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60 text-sm">
            © 2024 LUXE. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
