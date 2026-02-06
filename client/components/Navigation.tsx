import { Link, useLocation } from "react-router-dom";
import { Heart, Home, Search, User, ShoppingCart, Menu } from "lucide-react";
import { useTranslation } from "@/hooks/use-app-context";
import { useState } from "react";

export function Navigation() {
  const location = useLocation();
  const { language, t } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    {
      path: "/",
      icon: Home,
      labelAr: "الرئيسية",
      labelEn: "Home",
    },
    {
      path: "/search",
      icon: Search,
      labelAr: "البحث",
      labelEn: "Search",
    },
    {
      path: "/favorites",
      icon: Heart,
      labelAr: "المفضلة",
      labelEn: "Favorites",
    },
    {
      path: "/account",
      icon: User,
      labelAr: "الحساب",
      labelEn: "Account",
    },
  ];

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center text-xl font-bold">
              💎
            </div>
            <div>
              <div className="font-bold text-primary">Cosmetic Note</div>
              <div className="text-xs text-gray-500">كوزمتك نوت</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <ShoppingCart className="w-5 h-5 text-primary" />
            </button>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex-1 py-3 flex flex-col items-center justify-center gap-1 transition ${
                    active
                      ? "text-primary"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">
                    {language === "ar" ? item.labelAr : item.labelEn}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Menu Dropdown */}
      {showMenu && (
        <div className="fixed inset-0 z-30 bg-black/20" onClick={() => setShowMenu(false)}>
          <div
            className="absolute top-12 right-4 bg-white rounded-lg shadow-lg p-4 w-48"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition font-medium">
                {language === "ar" ? "تسجيل الدخول" : "Sign In"}
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition">
                {language === "ar" ? "لغة / Language" : "Language / لغة"}
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition">
                {language === "ar" ? "تواصل معنا" : "Contact Us"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
