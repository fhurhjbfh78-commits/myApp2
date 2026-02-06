import { Layout } from "@/components/Layout";
import { useTranslation } from "@/hooks/use-app-context";
import { Search } from "lucide-react";
import { useState } from "react";
import { products } from "@/lib/data";
import { motion } from "framer-motion";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { language } = useTranslation();

  const filteredProducts = searchTerm
    ? products.filter(
        (p) =>
          p.nameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.descriptionAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.descriptionEn.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {language === "ar" ? "البحث عن المنتجات" : "Search Products"}
        </h1>

        <div className="relative">
          <Search className="absolute right-4 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={language === "ar" ? "ابحثي عن منتج..." : "Search for a product..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {searchTerm && filteredProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 gap-4"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white rounded-xl overflow-hidden shadow"
              >
                <div className="h-40 bg-gray-200 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.nameAr}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-800 line-clamp-2">
                    {language === "ar" ? product.nameAr : product.nameEn}
                  </p>
                  <p className="font-bold text-primary mt-2">
                    {product.price.toLocaleString()} {language === "ar" ? "د.ع" : "IQD"}
                  </p>
                  <button className="w-full bg-primary text-white py-2 rounded-lg text-sm font-bold mt-2 hover:bg-opacity-90 transition">
                    {language === "ar" ? "أضف للسلة" : "Add to Cart"}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : searchTerm ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-600 text-lg font-medium">
              {language === "ar" ? "لم نجد نتائج للبحث" : "No results found"}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <div className="text-6xl mb-4">🔎</div>
            <p className="text-gray-600 text-lg font-medium">
              {language === "ar" ? "ابدئي البحث عن المنتجات" : "Start searching for products"}
            </p>
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
}
