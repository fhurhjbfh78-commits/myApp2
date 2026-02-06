export interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  image: string;
  category: string;
  originalPrice: number;
  price: number;
  discount?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestseller?: boolean;
  purchaseCount?: number;
}

export interface Category {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: "makeup",
    nameAr: "المكياج",
    nameEn: "Makeup",
    icon: "🎨",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=400&fit=crop",
  },
  {
    id: "skincare",
    nameAr: "العناية بالبشرة",
    nameEn: "Skincare",
    icon: "🧴",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
  },
  {
    id: "perfume",
    nameAr: "العطور",
    nameEn: "Perfumes",
    icon: "💐",
    image: "https://images.unsplash.com/photo-1544638331-e26879cd4d9b?w=400&h=400&fit=crop",
  },
  {
    id: "haircare",
    nameAr: "العناية بالشعر",
    nameEn: "Hair Care",
    icon: "💇‍♀️",
    image: "https://images.unsplash.com/photo-1564422311192-612f6dc7d4c0?w=400&h=400&fit=crop",
  },
  {
    id: "bodycare",
    nameAr: "العناية بالجسم",
    nameEn: "Body Care",
    icon: "🧖‍♀️",
    image: "https://images.unsplash.com/photo-1556228858-8af40e4b0dc0?w=400&h=400&fit=crop",
  },
  {
    id: "tools",
    nameAr: "أدوات التجميل",
    nameEn: "Beauty Tools",
    icon: "🖌️",
    image: "https://images.unsplash.com/photo-1522310503521-57eabf4b37cc?w=400&h=400&fit=crop",
  },
];

export const products: Product[] = [
  {
    id: "1",
    nameAr: "أساس الوجه بريميوم",
    nameEn: "Premium Face Foundation",
    descriptionAr: "أساس سائل عالي الجودة يوفر تغطية كاملة وتثبيت طويل الأمد",
    descriptionEn: "High-quality liquid foundation with full coverage and long-lasting wear",
    image: "https://images.unsplash.com/photo-1508177143336-4604dc8138f0?w=300&h=300&fit=crop",
    category: "makeup",
    originalPrice: 45000,
    price: 33750,
    discount: 25,
    isFeatured: true,
    isBestseller: true,
    purchaseCount: 250,
  },
  {
    id: "2",
    nameAr: "مصل العناية بالبشرة",
    nameEn: "Skin Care Serum",
    descriptionAr: "مصل مركز يحتوي على فيتامينات ومعادن طبيعية",
    descriptionEn: "Concentrated serum with natural vitamins and minerals",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop",
    category: "skincare",
    originalPrice: 55000,
    price: 44000,
    discount: 20,
    isNew: true,
    purchaseCount: 180,
  },
  {
    id: "3",
    nameAr: "عطر الياسمين الفاخر",
    nameEn: "Jasmine Luxury Perfume",
    descriptionAr: "عطر بنسبة عالية من زيت العطر الأصلي",
    descriptionEn: "Perfume with high concentration of original fragrance oil",
    image: "https://images.unsplash.com/photo-1544638331-e26879cd4d9b?w=300&h=300&fit=crop",
    category: "perfume",
    originalPrice: 75000,
    price: 60000,
    discount: 20,
    isFeatured: true,
    purchaseCount: 150,
  },
  {
    id: "4",
    nameAr: "شامبو العناية العميقة",
    nameEn: "Deep Care Shampoo",
    descriptionAr: "شامبو مرطب يغذي الشعر من الجذور",
    descriptionEn: "Moisturizing shampoo that nourishes hair from roots",
    image: "https://images.unsplash.com/photo-1564422311192-612f6dc7d4c0?w=300&h=300&fit=crop",
    category: "haircare",
    originalPrice: 28000,
    price: 22400,
    discount: 20,
    isBestseller: true,
    purchaseCount: 320,
  },
  {
    id: "5",
    nameAr: "كريم الجسم المرطب",
    nameEn: "Body Moisturizing Cream",
    descriptionAr: "كريم غني بالزبدة الطبيعية والزيوت العطرية",
    descriptionEn: "Rich cream with natural butters and essential oils",
    image: "https://images.unsplash.com/photo-1556228858-8af40e4b0dc0?w=300&h=300&fit=crop",
    category: "bodycare",
    originalPrice: 38000,
    price: 30400,
    discount: 20,
    purchaseCount: 200,
  },
  {
    id: "6",
    nameAr: "مجموعة فرش المكياج",
    nameEn: "Makeup Brush Set",
    descriptionAr: "مجموعة احترافية من فرش المكياج الطبيعية",
    descriptionEn: "Professional set of natural makeup brushes",
    image: "https://images.unsplash.com/photo-1522310503521-57eabf4b37cc?w=300&h=300&fit=crop",
    category: "tools",
    originalPrice: 85000,
    price: 63750,
    discount: 25,
    isNew: true,
    isFeatured: true,
    purchaseCount: 120,
  },
  {
    id: "7",
    nameAr: "أحمر الشفاه الفاخر",
    nameEn: "Luxury Lipstick",
    descriptionAr: "أحمر شفاه طويل البقاء بألوان زاهية",
    descriptionEn: "Long-lasting lipstick with vibrant colors",
    image: "https://images.unsplash.com/photo-1596289519410-ba4a8b6e6fe8?w=300&h=300&fit=crop",
    category: "makeup",
    originalPrice: 35000,
    price: 28000,
    discount: 20,
    isBestseller: true,
    purchaseCount: 280,
  },
  {
    id: "8",
    nameAr: "قناع الوجه المنعش",
    nameEn: "Refreshing Face Mask",
    descriptionAr: "قناع ينظف ويشد مسام البشرة",
    descriptionEn: "Mask that cleanses and tightens pores",
    image: "https://images.unsplash.com/photo-1596462502278-af3f32a90b54?w=300&h=300&fit=crop",
    category: "skincare",
    originalPrice: 42000,
    price: 33600,
    discount: 20,
    isNew: true,
    purchaseCount: 95,
  },
  {
    id: "9",
    nameAr: "ظل العيون المعدني",
    nameEn: "Metallic Eyeshadow",
    descriptionAr: "ظل عيون براق بألوان فاخرة",
    descriptionEn: "Shimmering eyeshadow with luxurious colors",
    image: "https://images.unsplash.com/photo-1580612176707-37ac75ecd625?w=300&h=300&fit=crop",
    category: "makeup",
    originalPrice: 32000,
    price: 25600,
    discount: 20,
    isFeatured: true,
    purchaseCount: 165,
  },
  {
    id: "10",
    nameAr: "زيت الشعر الطبيعي",
    nameEn: "Natural Hair Oil",
    descriptionAr: "زيت طبيعي 100% لتغذية الشعر",
    descriptionEn: "100% natural oil for hair nourishment",
    image: "https://images.unsplash.com/photo-1599599810694-b3b5ef2ff4d0?w=300&h=300&fit=crop",
    category: "haircare",
    originalPrice: 48000,
    price: 38400,
    discount: 20,
    isBestseller: true,
    purchaseCount: 210,
  },
];
