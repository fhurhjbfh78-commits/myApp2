import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { useTranslation } from "@/hooks/use-app-context";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();
  const { language } = useTranslation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center min-h-[60vh]"
      >
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-8xl mb-6"
        >
          🔍
        </motion.div>
        <h1 className="text-5xl font-bold text-primary mb-2">404</h1>
        <p className="text-2xl text-gray-800 mb-4 font-semibold">
          {language === "ar" ? "الصفحة غير موجودة" : "Page Not Found"}
        </p>
        <p className="text-gray-600 text-lg mb-8 text-center max-w-md">
          {language === "ar"
            ? "عذراً، الصفحة التي تبحثين عنها غير موجودة أو قد تكون انتقلت"
            : "Sorry, the page you're looking for doesn't exist or has been moved"}
        </p>
        <Link
          to="/"
          className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:shadow-lg transition hover:scale-105 inline-block"
        >
          {language === "ar" ? "العودة للرئيسية" : "Return to Home"}
        </Link>
      </motion.div>
    </Layout>
  );
};

export default NotFound;
