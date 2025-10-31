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
  // {
  //   id: 10,
  //   name: "Men's Tailored Chinos",
  //   price: 98.00,
  //   image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&auto=format&fit=crop",
  //   category: "Bottoms",
  //   description: "Classic tailored chinos with a modern slim fit. Perfect for smart casual occasions.",
  //   features: ["Cotton twill", "Slim fit", "Side pockets", "Machine washable"],
  //   sizes: ["28", "30", "32", "34", "36", "38"]
  // },
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
    name: "Women's Leather Tote Bag",
    price: 245.00,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop",
    category: "Accessories",
    description: "Spacious leather tote bag with elegant design. Perfect for work or everyday use.",
    features: ["Genuine leather", "Multiple compartments", "Adjustable handles", "Laptop sleeve"],
    sizes: ["One Size"]
  },
  {
    id: 13,
    name: "Men's Oxford Button-Down Shirt",
    price: 89.00,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop",
    category: "Tops",
    description: "Timeless oxford shirt in premium cotton. Essential for any gentleman's wardrobe.",
    features: ["100% cotton", "Button-down collar", "Classic fit", "Machine washable"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 14,
    name: "Women's Pleated Midi Skirt",
    price: 125.00,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&auto=format&fit=crop",
    category: "Bottoms",
    description: "Elegant pleated midi skirt with flowing silhouette. Versatile piece for any occasion.",
    features: ["Lightweight fabric", "Elastic waistband", "A-line fit", "Machine washable"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 15,
    name: "Men's Bomber Jacket",
    price: 225.00,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop",
    category: "Outerwear",
    description: "Classic bomber jacket with modern details. Perfect layering piece for transitional weather.",
    features: ["Water-resistant", "Ribbed cuffs", "Zip pockets", "Regular fit"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 16,
    name: "Women's Knit Cardigan",
    price: 155.00,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop",
    category: "Knitwear",
    description: "Cozy knit cardigan with button closure. Soft and comfortable for everyday wear.",
    features: ["Wool blend", "Button front", "Ribbed trim", "Hand wash recommended"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 17,
    name: "Men's Leather Sneakers",
    price: 185.00,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop",
    category: "Footwear",
    description: "Premium leather sneakers with minimalist design. Comfortable and stylish for everyday wear.",
    features: ["Genuine leather", "Cushioned insole", "Rubber sole", "Lace-up closure"],
    sizes: ["7", "8", "9", "10", "11", "12"]
  },
  {
    id: 18,
    name: "Women's Wrap Dress",
    price: 175.00,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop",
    category: "Dresses",
    description: "Flattering wrap dress in flowing fabric. Perfect for both casual and formal occasions.",
    features: ["Polyester blend", "Adjustable tie", "V-neckline", "Machine washable"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 19,
    name: "Men's Wool Scarf",
    price: 68.00,
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&auto=format&fit=crop",
    category: "Accessories",
    description: "Classic wool scarf for cold weather. Soft and warm with timeless style.",
    features: ["100% wool", "Fringed edges", "Versatile styling", "Dry clean only"],
    sizes: ["One Size"]
  },
  {
    id: 20,
    name: "Women's Trench Coat",
    price: 425.00,
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRb1PxR8PYjnt7GD_uahufgyMDFSBvYC_YSXtWcMmxxJuvVCTYcyFAWkqENL4bG6wmXcwVteXBER4Fdk0n2O64pp_LFlrLPRaLrav7iSPGZ3AzGtNE4fSQWNs-ShZ1cRj5ZEVj-Lw&usqp=CAc",
    category: "Outerwear",
    description: "Iconic trench coat with classic details. Essential outerwear for any wardrobe.",
    features: ["Water-resistant", "Belted waist", "Double-breasted", "Notched collar"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 21,
    name: "Rainbow Striped Sweater",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=800&auto=format&fit=crop",
    category: "Knitwear",
    description: "Vibrant rainbow striped sweater that adds a pop of color to any outfit. Made from soft acrylic blend.",
    features: ["Acrylic blend", "Colorful stripes", "Relaxed fit", "Machine washable"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 22,
    name: "Floral Print Summer Dress",
    price: 135.00,
    image: "data:image/webp;base64,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",
    category: "Dresses",
    description: "Beautiful floral print dress perfect for sunny days. Light and breezy fabric keeps you comfortable.",
    features: ["Floral pattern", "Light fabric", "A-line silhouette", "Machine washable"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 23,
    name: "Neon Green Track Jacket",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop",
    category: "Outerwear",
    description: "Bold neon green track jacket for making a statement. Perfect for active lifestyle or casual wear.",
    features: ["Neon green color", "Zip closure", "Side pockets", "Breathable fabric"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 24,
    name: "Pink Sequined Evening Bag",
    price: 165.00,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop",
    category: "Accessories",
    description: "Stunning pink sequined evening bag that sparkles. Perfect accessory for special occasions.",
    features: ["Sequined exterior", "Chain strap", "Compact size", "Interior compartment"],
    sizes: ["One Size"]
  },
  {
    id: 25,
    name: "Blue Denim Oversized Jacket",
    price: 125.00,
    image: "https://pic-cdn-jp.tao-media.co/kf/Sce343dcf613043c0b4f942fddef4308f7.jpg_720x720q75.jpg_.webp",
    category: "Outerwear",
    description: "Classic blue denim jacket with an oversized fit. Timeless and versatile wardrobe staple.",
    features: ["100% cotton denim", "Oversized fit", "Button closure", "Machine washable"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 26,
    name: "Yellow Midi Skirt",
    price: 95.00,
    image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&auto=format&fit=crop",
    category: "Bottoms",
    description: "Bright yellow midi skirt that brings sunshine to your wardrobe. A-line cut is universally flattering.",
    features: ["Vibrant yellow", "A-line silhouette", "Elastic waist", "Machine washable"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 27,
    name: "Orange Corduroy Pants",
    price: 110.00,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&auto=format&fit=crop",
    category: "Bottoms",
    description: "Fun orange corduroy pants with a relaxed fit. Unique texture and bold color combination.",
    features: ["Corduroy fabric", "Relaxed fit", "Side pockets", "Machine washable"],
    sizes: ["28", "30", "32", "34", "36"]
  },
  {
    id: 28,
    name: "Purple Velvet Blazer",
    price: 245.00,
    image: "https://www.gentlemansguru.com/wp-content/uploads/2022/05/Mens-Purple-Velvet-Tuxedo-Jacket-Groom-Wedding-Blazer-from-Gentlemansguru.com_-scaled.jpg",
    category: "Outerwear",
    description: "Luxurious purple velvet blazer that oozes elegance. Perfect for evening events and special occasions.",
    features: ["Velvet fabric", "Notched lapels", "Single-breasted", "Dry clean only"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  // {
  //   id: 29,
  //   name: "Red Silk Cami Top",
  //   price: 78.00,
  //   image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&h=1000",
  //   category: "Tops",
  //   description: "Sensual red silk cami top with adjustable straps. Effortlessly chic for layering or wearing alone.",
  //   features: ["Silk fabric", "Adjustable straps", "Slim fit", "Hand wash only"],
  //   sizes: ["XS", "S", "M", "L"]
  // },
  // {
  //   id: 30,
  //   name: "Multi-Color Knit Beanie",
  //   price: 32.00,
  //   image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&auto=format&fit=crop",
  //   category: "Accessories",
  //   description: "Colorful knitted beanie featuring multiple colors. Keeps you warm and stylish in winter.",
  //   features: ["Acrylic knit", "Multi-color", "Stretchy fit", "Machine washable"],
  //   sizes: ["One Size"]
  // }
];
