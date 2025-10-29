export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  features: string[];
  sizes?: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Classic Oversized Blazer",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop",
    category: "Outerwear",
    description: "Timeless oversized blazer crafted from premium wool blend. Perfect for layering over any outfit.",
    features: ["Premium wool blend", "Fully lined", "Structured shoulders", "Two front pockets"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 2,
    name: "Silk Relaxed Shirt",
    price: 125.00,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop",
    category: "Tops",
    description: "Luxurious silk shirt with a relaxed fit. Effortlessly elegant for any occasion.",
    features: ["100% silk", "Mother-of-pearl buttons", "Relaxed fit", "Dry clean only"],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 3,
    name: "High-Waisted Wide Leg Trousers",
    price: 145.00,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&auto=format&fit=crop",
    category: "Bottoms",
    description: "Sophisticated wide-leg trousers with a flattering high waist. Tailored for the modern wardrobe.",
    features: ["Premium stretch fabric", "High-rise waist", "Side zip closure", "Machine washable"],
    sizes: ["24", "26", "28", "30", "32"]
  },
  {
    id: 4,
    name: "Cashmere V-Neck Sweater",
    price: 295.00,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop",
    category: "Knitwear",
    description: "Ultra-soft cashmere sweater with a classic V-neck. A wardrobe essential for any season.",
    features: ["100% cashmere", "Ribbed trim", "Regular fit", "Hand wash recommended"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 5,
    name: "Leather Ankle Boots",
    price: 325.00,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop",
    category: "Footwear",
    description: "Handcrafted leather ankle boots with a sleek silhouette. Versatile enough for day or night.",
    features: ["Genuine leather", "Cushioned insole", "Block heel", "Side zip closure"],
    sizes: ["36", "37", "38", "39", "40", "41"]
  },
  {
    id: 6,
    name: "Linen Midi Dress",
    price: 165.00,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop",
    category: "Dresses",
    description: "Breezy linen midi dress with a relaxed fit. Perfect for warm weather styling.",
    features: ["100% linen", "Adjustable straps", "Side pockets", "Machine washable"],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 7,
    name: "Structured Crossbody Bag",
    price: 195.00,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop",
    category: "Accessories",
    description: "Minimalist crossbody bag with a structured silhouette. Crafted from premium vegan leather.",
    features: ["Vegan leather", "Adjustable strap", "Interior pockets", "Gold hardware"],
    sizes: ["One Size"]
  },
  {
    id: 8,
    name: "Organic Cotton T-Shirt",
    price: 48.00,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop",
    category: "Tops",
    description: "Essential crew neck t-shirt made from soft organic cotton. A sustainable everyday staple.",
    features: ["100% organic cotton", "Crew neck", "Regular fit", "Machine washable"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 9,
    name: "Wool Blend Coat",
    price: 395.00,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&auto=format&fit=crop",
    category: "Outerwear",
    description: "Elegant wool blend coat with a timeless silhouette. Investment piece for cold weather.",
    features: ["Wool blend", "Double-breasted", "Fully lined", "Notched lapels"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 10,
    name: "Denim Straight Leg Jeans",
    price: 135.00,
    image: "https://images.unsplash.com/photo-1542272454315-7326c4d1e7f9?w=800&auto=format&fit=crop",
    category: "Bottoms",
    description: "Classic straight leg jeans in premium denim. Versatile fit that flatters every body type.",
    features: ["Premium denim", "High-rise waist", "5-pocket styling", "Machine washable"],
    sizes: ["24", "26", "28", "30", "32", "34"]
  },
  {
    id: 11,
    name: "Silk Slip Dress",
    price: 215.00,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&auto=format&fit=crop",
    category: "Dresses",
    description: "Luxurious silk slip dress with delicate straps. Effortlessly elegant for evening wear.",
    features: ["100% silk", "Adjustable straps", "Bias cut", "Dry clean only"],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 12,
    name: "Leather Crossbody Belt",
    price: 85.00,
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583c2?w=800&auto=format&fit=crop",
    category: "Accessories",
    description: "Handcrafted leather belt with a minimalist buckle. Completes any outfit with sophistication.",
    features: ["Genuine leather", "Brass buckle", "Adjustable fit", "Made in Italy"],
    sizes: ["S", "M", "L"]
  }
];
