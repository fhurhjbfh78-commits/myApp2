import { Layout } from "@/components/Layout";
import { useTranslation } from "@/hooks/use-app-context";
import { motion } from "framer-motion";
import { User, LogOut, Settings, Clock } from "lucide-react";

export default function AccountPage() {
  const { language, setLanguage } = useTranslation();

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <User className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-gray-900">
            {language === "ar" ? "حسابي" : "My Account"}
          </h1>
        </div>

        {/* User Info Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-xl p-6 shadow"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl">
              👤
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {language === "ar" ? "ضيفة" : "Guest"}
              </h2>
              <p className="text-sm text-gray-500">
                {language === "ar" ? "تسجيل دخول مطلوب" : "Sign in required"}
              </p>
            </div>
          </div>
          <button className="w-full bg-primary text-white py-2.5 rounded-lg font-bold hover:bg-opacity-90 transition">
            {language === "ar" ? "تسجيل الدخول" : "Sign In"}
          </button>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <button className="w-full bg-white rounded-xl p-4 shadow flex items-center justify-between hover:shadow-lg transition">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-medium text-gray-800">
                {language === "ar" ? "الطلبات" : "Orders"}
              </span>
            </div>
            <span className="text-gray-400">→</span>
          </button>

          <button className="w-full bg-white rounded-xl p-4 shadow flex items-center justify-between hover:shadow-lg transition">
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-secondary" />
              <span className="font-medium text-gray-800">
                {language === "ar" ? "الإعدادات" : "Settings"}
              </span>
            </div>
            <span className="text-gray-400">→</span>
          </button>

          <button
            onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
            className="w-full bg-white rounded-xl p-4 shadow flex items-center justify-between hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌐</span>
              <span className="font-medium text-gray-800">
                {language === "ar" ? "اللغة: العربية" : "Language: English"}
              </span>
            </div>
            <span className="text-gray-400">→</span>
          </button>
        </motion.div>

        {/* Logout Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full bg-red-50 border-2 border-red-200 rounded-xl p-4 text-red-600 font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition"
        >
          <LogOut className="w-5 h-5" />
          {language === "ar" ? "تسجيل الخروج" : "Sign Out"}
        </motion.button>
      </motion.div>
    </Layout>
  );
}
