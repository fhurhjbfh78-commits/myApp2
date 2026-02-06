import { Layout } from "@/components/Layout";
import { useTranslation } from "@/hooks/use-app-context";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function FavoritesPage() {
  const { language } = useTranslation();

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <Heart className="w-8 h-8 text-primary fill-primary" />
          <h1 className="text-3xl font-bold text-gray-900">
            {language === "ar" ? "المفضلة" : "Favorites"}
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16"
        >
          <div className="text-6xl mb-4">💕</div>
          <p className="text-gray-600 text-lg font-medium mb-2">
            {language === "ar" ? "قائمة المفضلة فارغة" : "Your favorites are empty"}
          </p>
          <p className="text-gray-500 text-sm">
            {language === "ar"
              ? "أضيفي منتجاتك المفضلة لعرضها هنا"
              : "Add products to your favorites to see them here"}
          </p>
        </motion.div>
      </motion.div>
    </Layout>
  );
}
