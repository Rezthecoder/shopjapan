/**
 * Products Page
 * 
 * Displays all products with filtering, searching, and sorting capabilities.
 * 
 * Features:
 * - Search by product name, category, or description
 * - Filter by category
 * - Filter by price range
 * - Sort by price (low to high, high to low) or name (A to Z)
 * - Language-aware category display
 */

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Products = () => {
  const { language } = useLanguage();

  // Filter and sort state
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("default");
  const [priceRange, setPriceRange] = useState<string>("all");

  // Get unique categories from products
  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

  /**
   * Get localized category name based on current language
   * @param {string} category - Category name in English
   * @returns {string} Localized category name
   */
  const getCategoryDisplay = (category: string) => {
    if (category === "All") return language === "ja" ? "すべて" : "All";
    // Find first product with this category to get Japanese translation
    const product = products.find(p => p.category === category);
    return language === "ja" && product ? product.categoryJa : category;
  };

  /**
   * Filter and sort products based on current filters
   * Uses useMemo to recalculate only when filters change
   */
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Step 1: Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Step 2: Filter by search query (searches name, category, and description)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query)
      );
    }

    // Step 3: Filter by price range (converts USD to JPY)
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      filtered = filtered.filter(p => {
        const price = p.price * 150; // Convert USD to JPY
        if (max === undefined) return price >= min; // "Above" range
        return price >= min && price <= max; // Range with both min and max
      });
    }

    // Step 4: Sort products
    if (sortBy === "price-low") {
      // Sort by price: lowest first
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      // Sort by price: highest first
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      // Sort alphabetically by name
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    // "default" keeps original order

    return filtered;
  }, [selectedCategory, searchQuery, sortBy, priceRange]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">コレクション</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            タイムレスなスタイルのために作られた、プレミアムファッションエッセンシャルの厳選セレクションをご覧ください。
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card p-6 rounded-lg border border-border mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    size="sm"
                  >
                    {getCategoryDisplay(category)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="text-sm font-medium mb-2 block">Price Range</label>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="All Prices" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="0-10000">Under ¥10,000</SelectItem>
                  <SelectItem value="10000-25000">¥10,000 - ¥25,000</SelectItem>
                  <SelectItem value="25000-50000">¥25,000 - ¥50,000</SelectItem>
                  <SelectItem value="50000-">Above ¥50,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort */}
            <div>
              <label className="text-sm font-medium mb-2 block">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Default" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {(searchQuery || selectedCategory !== "All" || priceRange !== "all" || sortBy !== "default") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setPriceRange("all");
                setSortBy("default");
              }}
            >
              Clear All Filters
            </Button>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {searchQuery
                ? "No products found matching your search."
                : "このカテゴリーに商品が見つかりませんでした。"}
            </p>
          </div>
        )}

        {filteredProducts.length > 0 && (
          <p className="text-sm text-muted-foreground mb-4">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        )}
      </main>
    </div>
  );
};

export default Products;
