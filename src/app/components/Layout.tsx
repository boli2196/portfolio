import { Outlet, Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { ScrollToTop } from "./ScrollToTop";
import { CursorFollower } from "./CursorFollower";

export function Layout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Reset scrolled state when leaving home
  useEffect(() => {
    if (!isHome) setScrolled(false);
  }, [isHome]);

  const navItems = [
    { path: "/", label: "홈" },
    { path: "/about", label: "소개" },
    { path: "/experience", label: "경력" },
    { path: "/projects", label: "프로젝트" },
    { path: "/skills", label: "역량" },
    { path: "/contact", label: "연락처" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const headerBg = isHome
    ? scrolled
      ? "bg-black/85 backdrop-blur-md border-b border-white/10"
      : "bg-black/30 backdrop-blur-sm border-b border-white/10"
    : "bg-[#0a0a0a] border-b border-white/10";

  return (
    <div className="min-h-screen bg-[#0a0a0a] cursor-none">
      <CursorFollower />
      {/* Header */}
      <header className={`fixed top-0 z-50 w-full transition-all duration-400 ${isHome ? headerBg : "sticky bg-[#0a0a0a] border-b border-white/10"}`}
        style={!isHome ? { position: "sticky" } : {}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 transition-colors"
            >
              <span className="text-sm font-bold tracking-[0.15em] uppercase text-white">Portfolio</span>
              <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.1em] uppercase text-white/60 border border-white/20 px-2 py-0.5 hidden sm:inline-flex">
                <span className="on-air-dot w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                vibe coded
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 text-[13px] font-medium transition-colors ${
                    isActive(item.path)
                      ? "text-white"
                      : "text-white/55 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-white/80 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-black/90">
            <nav className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 text-sm transition-colors ${
                    isActive(item.path) ? "text-white font-medium" : "text-white/55 hover:text-white"
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
      <main className={isHome ? "" : "pt-16"}>
        <ScrollToTop />
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-white/60 mb-4">
              © 2026 이승진. All rights reserved.
            </p>
            <p className="text-white/40 text-sm mb-2">
              서비스 기획자 포트폴리오
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
