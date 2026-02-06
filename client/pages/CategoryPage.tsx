import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { useTranslation } from "@/hooks/use-app-context";
import { categories, products } from "@/lib/data";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function CategoryPage() {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("featured");
  const [showSort, setShowSort] = useState(false);
  const { language } = useTranslation();

  const categoryId = searchParams.get("cat");
  const selectedCategory = categories.find((c) => c.id === categoryId);

  let filteredProducts = categoryId
    ? products.filter((p) => p.category === categoryId)
    : products;

  // Apply sorting
  if (sortBy === "price-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "newest") {
    filteredProducts = [...filteredProducts].filter((p) => p.isNew);
  } else if (sortBy === "bestseller") {
    filteredProducts = [...filteredProducts]
      .sort((a, b) => (b.purchaseCount || 0) - (a.purchaseCount || 0));
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">
              {selectedCategory?.icon || "🛍️"}
            </span>
            <h1 className="text-3xl font-bold text-gray-900">
              {selectedCategory
                ? language === "ar"
                  ? selectedCategory.nameAr
                  : selectedCategory.nameEn
                : language === "ar"
                  ? "جميع المنتجات"
                  : "All Products"}
            </h1>
          </div>
          <p className="text-gray-500">
            {language === "ar"
              ? `${filteredProducts.length} منتج`
              : `${filteredProducts.length} products`}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex gap-2 pb-4 border-b border-gray-200">
          <div className="relative">
            <button
              onClick={() => setShowSort(!showSort)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              {language === "ar" ? "ترتيب" : "Sort"}
              <ChevronDown className="w-4 h-4" />
            </button>
            {showSort && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-48">
                {[
                  { value: "featured", label: language === "ar" ? "المميز" : "Featured" },
                  { value: "newest", label: language === "ar" ? "الأحدث" : "Newest" },
                  { value: "bestseller", label: language === "ar" ? "الأكثر مبيعاً" : "Bestseller" },
                  { value: "price-low", label: language === "ar" ? "السعر: الأقل أولاً" : "Price: Low to High" },
                  { value: "price-high", label: language === "ar" ? "السعر: الأعلى أولاً" : "Price: High to Low" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setShowSort(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition ${
                      sortBy === option.value ? "bg-primary/10 text-primary font-medium" : ""
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.05 }}
            className="grid grid-cols-2 gap-4"
          >
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
              >
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.nameAr}
                    className="w-full h-full object-cover hover:scale-110 transition duration-300"
                  />
                  {product.discount && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                      -{product.discount}%
                    </div>
                  )}
                  {product.isNew && (
                    <div className="absolute top-3 left-3 bg-secondary text-primary px-2 py-1 rounded-lg text-xs font-bold">
                      {language === "ar" ? "جديد" : "New"}
                    </div>
                  )}
                  {product.isBestseller && (
                    <div className="absolute bottom-3 left-3 bg-primary text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                      🔥 {language === "ar" ? "الأكثر مبيعاً" : "Bestseller"}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium text-gray-800 line-clamp-2 mb-2">
                    {language === "ar" ? product.nameAr : product.nameEn}
                  </p>
                  <p className="text-xs text-gray-500 line-clamp-1 mb-3">
                    {language === "ar" ? product.descriptionAr : product.descriptionEn}
                  </p>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex gap-2 items-center">
                      <span className="font-bold text-primary text-lg">
                        {product.price.toLocaleString()}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-gray-400 line-through">
                          {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  {product.purchaseCount && (
                    <p className="text-xs text-gray-500 mb-3">
                      {language === "ar"
                        ? `${product.purchaseCount} مشتري`
                        : `${product.purchaseCount} sold`}
                    </p>
                  )}
                  <button className="w-full bg-primary text-white py-2.5 rounded-lg text-sm font-bold hover:bg-opacity-90 transition">
                    {language === "ar" ? "أضف للسلة" : "Add to Cart"}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-600 text-lg font-medium">
              {language === "ar" ? "لم نجد منتجات" : "No products found"}
            </p>
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
}
