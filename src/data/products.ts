export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  features: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Minimal Ceramic Vase",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&auto=format&fit=crop",
    category: "Home Decor",
    description: "Handcrafted ceramic vase with a minimalist design. Perfect for fresh or dried flowers.",
    features: ["Handmade", "Food-safe glaze", "Dishwasher safe", "Made from sustainable materials"]
  },
  {
    id: 2,
    name: "Organic Cotton Tote",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop",
    category: "Accessories",
    description: "Eco-friendly tote bag made from 100% organic cotton. Spacious and durable for everyday use.",
    features: ["100% organic cotton", "Reinforced handles", "Large capacity", "Machine washable"]
  },
  {
    id: 3,
    name: "Artisan Leather Journal",
    price: 65.00,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop",
    category: "Stationery",
    description: "Premium leather-bound journal with recycled paper pages. Perfect for writing or sketching.",
    features: ["Genuine leather", "Recycled paper", "Lay-flat binding", "Ribbon bookmark"]
  },
  {
    id: 4,
    name: "Modern Desk Lamp",
    price: 125.00,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop",
    category: "Lighting",
    description: "Sleek LED desk lamp with adjustable brightness and color temperature. Energy-efficient design.",
    features: ["LED technology", "Dimmable", "USB charging port", "Touch controls"]
  },
  {
    id: 5,
    name: "Wool Blend Throw Blanket",
    price: 95.00,
    image: "https://images.unsplash.com/photo-1585910073128-a6a7329c5990?w=800&auto=format&fit=crop",
    category: "Home Textiles",
    description: "Cozy throw blanket made from premium wool blend. Adds warmth and style to any space.",
    features: ["Wool blend", "Hypoallergenic", "Machine washable", "Lightweight yet warm"]
  },
  {
    id: 6,
    name: "Bamboo Cutting Board Set",
    price: 58.00,
    image: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&auto=format&fit=crop",
    category: "Kitchen",
    description: "Set of three bamboo cutting boards in different sizes. Sustainable and knife-friendly.",
    features: ["Sustainable bamboo", "Set of 3 sizes", "Hanging holes", "Easy to clean"]
  },
  {
    id: 7,
    name: "Scented Soy Candle",
    price: 32.00,
    image: "https://images.unsplash.com/photo-1602874801006-40e4c2d313ce?w=800&auto=format&fit=crop",
    category: "Home Fragrance",
    description: "Hand-poured soy candle with essential oils. Burns clean with a subtle, relaxing scent.",
    features: ["100% soy wax", "Essential oils", "40-hour burn time", "Reusable glass jar"]
  },
  {
    id: 8,
    name: "Minimalist Wall Clock",
    price: 78.00,
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&auto=format&fit=crop",
    category: "Home Decor",
    description: "Silent wall clock with a clean, modern design. Perfect for any room in your home.",
    features: ["Silent mechanism", "Battery operated", "Easy to install", "Premium materials"]
  }
];
