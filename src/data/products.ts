import type { Product } from '../store/cartStore';
import { getProductImage } from '../utils/svgAssets';

export const categories = [
  'All',
  'Electronics',
  'Fashion',
  'Home & Living',
  'Fitness & Wellness'
];

const rawProducts: Product[] = [
  {
    id: 'prod-1',
    title: 'NovaSound Pro Wireless Headphones',
    price: 1899,
    originalPrice: 2999,
    discount: 36,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    category: 'Electronics',
    rating: 4.8,
    reviewCount: 1240,
    description: 'Experience studio-grade sound quality with active noise cancellation, 60 hours of play time, and ultra-comfortable ear cushions.',
    specs: {
      'Driver Size': '40mm Dynamic',
      'Connectivity': 'Bluetooth 5.3 / Wired',
      'Battery Life': 'Up to 60 Hours',
      'Charging Time': 'Quick Charge (10 mins = 5 hrs)',
      'Noise Cancellation': 'Active ANC'
    },
    isDeal: true
  },
  {
    id: 'prod-2',
    title: 'AuraSync Smartwatch Series X',
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
    category: 'Electronics',
    rating: 4.6,
    reviewCount: 852,
    description: 'Track your health metrics and stay connected with the AuraSync watch featuring an AMOLED screen, heart rate monitoring, and built-in GPS.',
    specs: {
      'Display': '1.43" AMOLED',
      'Water Resistance': '5ATM (up to 50m)',
      'Battery Life': 'Up to 14 Days',
      'Sensors': 'SpO2, Heart Rate, Accelerometer, GPS',
      'Compatibility': 'iOS & Android'
    },
    isDeal: true
  },
  {
    id: 'prod-3',
    title: 'ApexCore Wireless Mechanical Keyboard',
    price: 1899,
    originalPrice: 2799,
    discount: 32,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80',
    category: 'Electronics',
    rating: 4.9,
    reviewCount: 312,
    description: 'A premium mechanical keyboard with tactile switches, customizable RGB backlighting, and dual-mode wireless connectivity.',
    specs: {
      'Switches': 'Linear Red Switches',
      'Keycaps': 'Double-shot PBT',
      'Connectivity': '2.4GHz / Bluetooth / USB-C',
      'Backlight': '16.8M Color RGB',
      'Battery': '4000mAh Rechargeable'
    }
  },
  {
    id: 'prod-13',
    title: 'AuraLink Dual-Band Wi-Fi Extender',
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80',
    category: 'Electronics',
    rating: 4.7,
    reviewCount: 189,
    description: 'Eliminate Wi-Fi dead zones in your house. Features dual-band transmission speeds up to 1200 Mbps and secure one-button setup.',
    specs: {
      'Standard': 'Wi-Fi 5 (802.11ac)',
      'Bands': 'Dual-Band (5 GHz / 2.4 GHz)',
      'Coverage': 'Up to 1,500 sq ft',
      'Ethernet Ports': '1x Fast Ethernet LAN'
    }
  },
  {
    id: 'prod-14',
    title: 'NovaCam Clip-on Vlog Camera',
    price: 1799,
    originalPrice: 2499,
    discount: 28,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80',
    category: 'Electronics',
    rating: 4.5,
    reviewCount: 245,
    description: 'Capture sharp videos on the go. Super compact clip-on vlog camera with 1080p recording, wide-angle lens, and built-in microphone.',
    specs: {
      'Video Resolution': '1080p @ 30fps',
      'Photo Resolution': '12 Megapixels',
      'Mount Type': 'Heavy-duty Spring Clip',
      'Battery Life': 'Up to 90 mins recording'
    }
  },
  {
    id: 'prod-4',
    title: 'Vanguard Tech Fleece Hoodie',
    price: 1499,
    originalPrice: 2199,
    discount: 31,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80',
    category: 'Fashion',
    rating: 4.5,
    reviewCount: 410,
    description: 'A modern lightweight fleece windcheater. Features dynamic weather-resistant coatings, warm double-brushed lining, and hidden security pockets.',
    specs: {
      'Material': 'Double-brushed Tech Fleece',
      'Lining': '100% Breathable Mesh',
      'Closure': 'YKK Zippers',
      'Pockets': '2 Hand Pockets, 1 Chest Sleeve'
    },
    isDeal: true
  },
  {
    id: 'prod-5',
    title: 'SwiftStride Running Mesh Shoes',
    price: 1699,
    originalPrice: 2499,
    discount: 32,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    category: 'Fashion',
    rating: 4.7,
    reviewCount: 938,
    description: 'Elevate your daily jogs. Features ultra-breathable engineered mesh upper layers and responsive shock-absorption foam midsoles.',
    specs: {
      'Weight': '230g (Size 9)',
      'Midsole': 'Shock-Absorbing EVA Foam',
      'Upper': 'Engineered Seamless Mesh',
      'Outsole': 'High-grip Carbon Rubber'
    }
  },
  {
    id: 'prod-6',
    title: 'MetroCraft Waterproof Backpack',
    price: 1299,
    originalPrice: 1899,
    discount: 31,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    category: 'Fashion',
    rating: 4.4,
    reviewCount: 247,
    description: 'Your sleek daily commuter companion. Crafted from waterproof coated canvas, featuring a dedicated TSA-friendly padded laptop pocket.',
    specs: {
      'Capacity': '20 Liters',
      'Material': 'Waterproof Coated Canvas',
      'Laptop Fit': 'Up to 15.6" Laptops',
      'Dimensions': '45cm x 30cm x 12cm'
    }
  },
  {
    id: 'prod-15',
    title: 'ApexDry Hooded Windcheater',
    price: 1399,
    originalPrice: 1999,
    discount: 30,
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=600&q=80',
    category: 'Fashion',
    rating: 4.6,
    reviewCount: 172,
    description: 'Ultra-lightweight windproof shell. Features adjustable drawstring hoodies and highly reflective detailing for early morning visibility.',
    specs: {
      'Material': '100% Ripstop Polyester',
      'Weight': '150g (Size M)',
      'Reflectivity': 'Reflective chest logos',
      'Packability': 'Self-stow pouch pocket'
    }
  },
  {
    id: 'prod-16',
    title: 'Polaris Polarized Sunglasses',
    price: 899,
    originalPrice: 1399,
    discount: 35,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80',
    category: 'Fashion',
    rating: 4.3,
    reviewCount: 304,
    description: 'Classic frames featuring polarized HD lenses that filter 100% of UVA/UVB rays and protect eyes from bright reflections.',
    specs: {
      'Frame Material': 'Polycarbonate Composite',
      'Lens Technology': 'Polarized HD Poly',
      'UV Protection': 'UV400 Shield',
      'Fit': 'Standard Medium size'
    }
  },
  {
    id: 'prod-7',
    title: 'BaristaPro Handheld Milk Frother',
    price: 699,
    originalPrice: 999,
    discount: 30,
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=600&q=80',
    category: 'Home & Living',
    rating: 4.8,
    reviewCount: 156,
    description: 'Create rich, creamy microfoam in seconds. Built-in rechargeable lithium battery, three speed settings, and double stainless steel whisk heads.',
    specs: {
      'Battery': '1200mAh USB Rechargeable',
      'Speed settings': '3 Speed Levels',
      'Whisks': '2 Stainless Steel Whisks',
      'Charge Time': 'Around 2.5 Hours'
    },
    isDeal: true
  },
  {
    id: 'prod-8',
    title: 'Ergoflex Memory Foam Seat Cushion',
    price: 999,
    originalPrice: 1499,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&q=80',
    category: 'Home & Living',
    rating: 4.7,
    reviewCount: 712,
    description: 'Re-engineer your office seating. Relieve tailbone strain with premium orthopedic memory foam inserts and washable cooling covers.',
    specs: {
      'Material': '100% Orthopedic Memory Foam',
      'Cover': 'Removable & Machine Washable Mesh',
      'Design': 'U-shaped coccyx relief contour',
      'Slip-resistance': 'Non-slip rubber bottom'
    }
  },
  {
    id: 'prod-9',
    title: 'AuraGlow Sunset Projection Lamp',
    price: 599,
    originalPrice: 899,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80',
    category: 'Home & Living',
    rating: 4.3,
    reviewCount: 148,
    description: 'Cast beautiful sunset gradients onto your walls. USB powered with 360-degree adjustable neck rotations.',
    specs: {
      'Light Source': '5W LED COB Lens',
      'Rotation': '360 degree neck pivot',
      'Power': '5V USB Plug-and-play',
      'Control': 'In-line switch cable'
    }
  },
  {
    id: 'prod-17',
    title: 'NovaLoom Premium Boho Throw Blanket',
    price: 1199,
    originalPrice: 1799,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=600&q=80',
    category: 'Home & Living',
    rating: 4.5,
    reviewCount: 92,
    description: 'Bring soft textures and warmth to your beds or sofas. Crafted with fine tassel lines and cozy patterns.',
    specs: {
      'Dimensions': '130cm x 170cm',
      'Material': 'Skin-friendly Acrylic fibers',
      'Weight': '600g',
      'Wash Care': 'Machine wash cold on gentle'
    }
  },
  {
    id: 'prod-18',
    title: 'AeroPurify Mini USB Air Purifier',
    price: 1099,
    originalPrice: 1599,
    discount: 31,
    image: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=600&q=80',
    category: 'Home & Living',
    rating: 4.6,
    reviewCount: 141,
    description: 'Compact personal air filter for desks and cars. Features active carbon layers to remove dust particles and odors.',
    specs: {
      'CADR Rate': '60 m³/h',
      'Coverage': 'Up to 100 sq ft',
      'Noise Level': 'Quiet 25dB mode',
      'Power Source': 'Type-C USB Powered'
    }
  },
  {
    id: 'prod-10',
    title: 'FlexGrip Natural Cork Yoga Mat',
    price: 1299,
    originalPrice: 1799,
    discount: 27,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80',
    category: 'Fitness & Wellness',
    rating: 4.6,
    reviewCount: 319,
    description: 'Organic cork top layer for slide protection during intense sessions. Soft natural tree-rubber backing for stability.',
    specs: {
      'Dimensions': '180cm x 61cm',
      'Thickness': '4.5mm Cushioning',
      'Weight': '1.8kg',
      'Material': 'Organic Cork & Natural Rubber'
    }
  },
  {
    id: 'prod-11',
    title: 'HydroCell Metal Protein Shaker',
    price: 499,
    originalPrice: 799,
    discount: 37,
    image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=600&q=80',
    category: 'Fitness & Wellness',
    rating: 4.5,
    reviewCount: 582,
    description: 'Double-walled insulated steel shaker keeps shakes ice cold. Anti-leak cap triggers secure closure.',
    specs: {
      'Capacity': '600ml',
      'Material': 'Food-grade Stainless Steel',
      'Insulation': 'Keeps cold up to 12 Hours',
      'Whisk': 'Stainless steel wire ball'
    }
  },
  {
    id: 'prod-12',
    title: 'AuraRevive Skin Glow Drops',
    price: 799,
    originalPrice: 1199,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
    category: 'Fitness & Wellness',
    rating: 4.7,
    reviewCount: 1104,
    description: 'Deep skin hydration serum with 2% pure hyaluronic acid and botanical extracts to restore skin brightness.',
    specs: {
      'Volume': '30ml',
      'Key Extracts': 'Hyaluronic Acid, B5, Aloe Vera',
      'Skin Type': 'All Skin Types (Tested)',
      'Cruelty Free': 'Yes'
    }
  },
  {
    id: 'prod-19',
    title: 'NovaFit Digital Body Fat Scale',
    price: 1499,
    originalPrice: 2199,
    discount: 31,
    image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600&q=80',
    category: 'Fitness & Wellness',
    rating: 4.4,
    reviewCount: 198,
    description: 'Smart weight analyzer syncing key body composition data (BMI, fat %, muscle) directly to your smartphone apps.',
    specs: {
      'Platform': 'Tempered Glass Top',
      'Sensors': '4 G-Sensors',
      'Max Weight': '150kg capacity',
      'Connection': 'Bluetooth App Sync'
    }
  },
  {
    id: 'prod-20',
    title: 'ApexMassage Pocket Muscle Massager',
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80',
    category: 'Fitness & Wellness',
    rating: 4.8,
    reviewCount: 231,
    description: 'Ultra-portable percussive therapy massager for muscle relief. Features 4 speed settings and interchangeable heads.',
    specs: {
      'Speeds': '4 Speed Settings',
      'Frequency': 'Up to 2800 percussions/min',
      'Battery': '2000mAh (Up to 4 hrs)',
      'Massage Heads': '4 Unique Heads'
    }
  }
];

export const products: Product[] = rawProducts.map(p => ({
  ...p,
  image: p.image || getProductImage(p.id)
}));

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}
