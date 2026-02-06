import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, Zap } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useTranslation } from "@/hooks/use-app-context";
import { categories, products } from "@/lib/data";

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);
  const { t, language } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-primary to-secondary z-50">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center shadow-2xl"
          >
            <span className="text-6xl">💎</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 text-white text-3xl font-bold"
          >
            Cosmetic Note
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-2 text-white/80 text-lg"
          >
            كوزمتك نوت
          </motion.p>
        </motion.div>
      </div>
    );
  }

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const bestsellerProducts = products.filter((p) => p.isBestseller).slice(0, 4);

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        {/* Hero Banner */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative h-48 rounded-2xl overflow-hidden bg-gradient-to-r from-primary to-secondary text-white"
        >
          <div className="absolute inset-0 flex flex-col justify-center px-6 py-8">
            <h2 className="text-3xl font-bold mb-2">
              {language === "ar" ? "أجمل مستحضرات التجميل" : "Premium Beauty Products"}
            </h2>
            <p className="text-sm text-white/90 mb-4">
              {language === "ar"
                ? "اكتشفي أفضل العروض والمنتجات الحصرية"
                : "Discover exclusive deals and premium products"}
            </p>
            <button className="bg-secondary text-primary font-bold py-2 px-4 rounded-lg w-fit hover:opacity-90 transition">
              {language === "ar" ? "تسوقي الآن" : "Shop Now"}
            </button>
          </div>
          <div className="absolute top-0 right-0 opacity-10 text-9xl">💐</div>
        </motion.div>

        {/* Categories Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-gray-900">
            {language === "ar" ? "التصنيفات" : "Categories"}
          </h3>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-3 gap-3"
          >
            {categories.map((category, idx) => (
              <motion.div
                key={category.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
              >
                <Link to={`/categories?cat=${category.id}`}>
                  <div className="relative h-32 rounded-xl overflow-hidden bg-gray-200 hover:shadow-lg transition">
                    <img
                      src={category.image}
                      alt={category.nameAr}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-end justify-center pb-3">
                      <div className="text-center">
                        <div className="text-2xl mb-1">{category.icon}</div>
                        <p className="text-white text-sm font-medium">
                          {language === "ar" ? category.nameAr : category.nameEn}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Featured Products */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-900">
              {language === "ar" ? "المنتجات المميزة" : "Featured Products"}
            </h3>
            <Star className="w-6 h-6 text-secondary fill-secondary" />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {featuredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
              >
                <div className="relative h-40 bg-gray-200 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.nameAr}
                    className="w-full h-full object-cover hover:scale-110 transition duration-300"
                  />
                  {product.discount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                      -{product.discount}%
                    </div>
                  )}
                  {product.isNew && (
                    <div className="absolute top-2 left-2 bg-secondary text-primary px-2 py-1 rounded-lg text-xs font-bold">
                      {language === "ar" ? "جديد" : "New"}
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-800 line-clamp-2">
                    {language === "ar" ? product.nameAr : product.nameEn}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex gap-2 items-center">
                      <span className="font-bold text-primary">
                        {product.price.toLocaleString()} {language === "ar" ? "د.ع" : "IQD"}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-gray-400 line-through">
                          {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <button className="mt-3 w-full bg-primary text-white py-2 rounded-lg text-sm font-bold hover:bg-opacity-90 transition">
                    {language === "ar" ? "أضف للسلة" : "Add to Cart"}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bestsellers Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-900">
              {language === "ar" ? "الأكثر مبيعاً" : "Bestsellers"}
            </h3>
            <Zap className="w-6 h-6 text-secondary fill-secondary" />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {bestsellerProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
              >
                <div className="relative h-40 bg-gray-200 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.nameAr}
                    className="w-full h-full object-cover hover:scale-110 transition duration-300"
                  />
                  {product.purchaseCount && (
                    <div className="absolute bottom-2 right-2 bg-primary/90 text-white px-2 py-1 rounded-lg text-xs font-bold">
                      🔥 {product.purchaseCount}+ {language === "ar" ? "مشتري" : "sold"}
                    </div>
                  )}
                  {product.discount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                      -{product.discount}%
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-800 line-clamp-2">
                    {language === "ar" ? product.nameAr : product.nameEn}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex gap-2 items-center">
                      <span className="font-bold text-primary">
                        {product.price.toLocaleString()} {language === "ar" ? "د.ع" : "IQD"}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-gray-400 line-through">
                          {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <button className="mt-3 w-full bg-primary text-white py-2 rounded-lg text-sm font-bold hover:bg-opacity-90 transition">
                    {language === "ar" ? "أضف للسلة" : "Add to Cart"}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center pb-8"
        >
          <Link
            to="/categories"
            className="bg-secondary text-primary font-bold py-3 px-12 rounded-full hover:shadow-lg transition hover:scale-105 inline-block"
          >
            {language === "ar" ? "تصفح جميع المنتجات" : "View All Products"}
          </Link>
        </motion.div>
      </motion.div>
    </Layout>
  );
}
