import { Outlet, Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Layout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "홈" },
    { path: "/about", label: "소개" },
    { path: "/experience", label: "경력" },
    { path: "/projects", label: "프로젝트" },
    { path: "/skills", label: "역량" },
    { path: "/contact", label: "연락처" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="text-xl font-bold text-gray-900">
              Portfolio
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md transition-colors ${
                    isActive(item.path)
                      ? "text-blue-600 font-medium"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <nav className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md transition-colors ${
                    isActive(item.path)
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              © 2026 이승진. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm mb-2">
              서비스 기획자 포트폴리오
            </p>
            <p className="text-gray-400 text-xs">
              이 사이트는 AI와의 협업(바이브 코딩)으로 만들어졌습니다
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
