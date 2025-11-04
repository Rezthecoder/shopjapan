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
    name: "Designer Leather Loafers",
    price: 285.00,
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&auto=format&fit=crop",
    category: "Footwear",
    description: "Handcrafted Italian leather loafers with premium finish. Perfect for sophisticated gentlemen.",
    features: ["Italian leather", "Hand-stitched", "Cushioned footbed", "Rubber sole"],
    sizes: ["7", "8", "9", "10", "11", "12"]
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
    name: "Men's Tailored Tuxedo Jacket",
    price: 495.00,
    image: "https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=800&auto=format&fit=crop",
    category: "Outerwear",
    description: "Exquisite tuxedo jacket with peak lapels and satin detailing. Perfect for black-tie events.",
    features: ["Wool blend", "Satin lapels", "Tailored fit", "Dry clean only"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 23,
    name: "Gold Chain Necklace",
    price: 89.00,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop",
    category: "Jewelry",
    description: "Elegant gold chain necklace with delicate links. Perfect for layering or wearing alone.",
    features: ["18k gold plated", "Adjustable length", "Hypoallergenic", "Comes with gift box"],
    sizes: ["One Size"]
  },
  {
    id: 24,
    name: "Pearl Drop Earrings",
    price: 125.00,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop",
    category: "Jewelry",
    description: "Classic pearl drop earrings with sterling silver posts. Timeless elegance for any occasion.",
    features: ["Genuine pearls", "Sterling silver", "Secure backing", "Gift packaging"],
    sizes: ["One Size"]
  },
  {
    id: 25,
    name: "Diamond Tennis Bracelet",
    price: 295.00,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&auto=format&fit=crop",
    category: "Jewelry",
    description: "Stunning tennis bracelet featuring cubic zirconia stones. Sparkles with every movement.",
    features: ["Cubic zirconia", "Adjustable clasp", "Rhodium plated", "Water resistant"],
    sizes: ["One Size"]
  },
  {
    id: 26,
    name: "Rose Gold Ring Set",
    price: 155.00,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop",
    category: "Jewelry",
    description: "Beautiful set of three stackable rings in rose gold. Mix and match for endless styles.",
    features: ["Rose gold plated", "Set of 3 rings", "Various sizes", "Stackable design"],
    sizes: ["5", "6", "7", "8", "9"]
  },
  {
    id: 27,
    name: "Statement Crystal Brooch",
    price: 78.00,
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&auto=format&fit=crop",
    category: "Jewelry",
    description: "Vintage-inspired crystal brooch that adds glamour to any outfit. Can also be worn as a hair accessory.",
    features: ["Austrian crystals", "Gold tone finish", "Multiple wear options", "Secure pin back"],
    sizes: ["One Size"]
  },
  {
    id: 28,
    name: "Minimalist Bangle Set",
    price: 68.00,
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&auto=format&fit=crop",
    category: "Jewelry",
    description: "Set of minimalist bangles in mixed metals. Perfect for everyday wear or special occasions.",
    features: ["Set of 4 bangles", "Mixed metals", "Slip-on design", "Scratch resistant"],
    sizes: ["One Size"]
  },
  {
    id: 29,
    name: "Men's Cashmere Overcoat",
    price: 685.00,
    image: "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800&auto=format&fit=crop",
    category: "Outerwear",
    description: "Luxurious cashmere overcoat with classic double-breasted design. Ultimate sophistication for winter.",
    features: ["100% cashmere", "Double-breasted", "Fully lined", "Dry clean only"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 30,
    name: "Tailored Blazer Dress",
    price: 245.00,
    image: "https://images.unsplash.com/photo-1612722432474-b971cdcea546?w=800&auto=format&fit=crop",
    category: "Dresses",
    description: "Sophisticated blazer dress with structured shoulders. Modern and chic for professional settings.",
    features: ["Double-breasted", "Tailored fit", "Belt included", "Machine washable"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 31,
    name: "Satin Slip Midi Dress",
    price: 195.00,
    image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&auto=format&fit=crop",
    category: "Dresses",
    description: "Luxurious satin slip dress with elegant drape. Versatile for day to night styling.",
    features: ["Satin finish", "Adjustable straps", "Cowl neckline", "Hand wash"],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 32,
    name: "Bohemian Maxi Dress",
    price: 168.00,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&auto=format&fit=crop",
    category: "Dresses",
    description: "Flowing bohemian maxi dress with intricate detailing. Perfect for summer occasions.",
    features: ["Flowy fabric", "Embroidered details", "Elastic waist", "Machine washable"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 33,
    name: "Men's Slim-Fit Dress Shirt",
    price: 145.00,
    image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800&auto=format&fit=crop",
    category: "Tops",
    description: "Premium Italian cotton dress shirt with French cuffs. Refined elegance for the modern gentleman.",
    features: ["Italian cotton", "French cuffs", "Slim fit", "Machine washable"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 34,
    name: "Men's Velvet Dinner Jacket",
    price: 525.00,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop",
    category: "Outerwear",
    description: "Opulent velvet dinner jacket in deep burgundy. Make a statement at any formal occasion.",
    features: ["Velvet fabric", "Shawl collar", "Satin lining", "Dry clean only"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 35,
    name: "Men's Pleated Dress Trousers",
    price: 195.00,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop",
    category: "Bottoms",
    description: "Classic pleated dress trousers with elegant drape. Essential formal wear for discerning gentlemen.",
    features: ["Wool blend", "Pleated front", "Adjustable waist", "Dry clean recommended"],
    sizes: ["30", "32", "34", "36", "38", "40"]
  },
];
