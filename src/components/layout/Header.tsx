import { Link, useLocation } from "react-router";
import { useState } from "react";
import Container from "../ui/Container";
import { TextAlignJustify, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/categories/georgia-executive", label: "Georgia Executive" },
    { to: "/categories/state-legislature", label: "State Legislature" },
    {
      to: "/categories/federal-legislature",
      label: "Federal Legislature",
    },
    { to: "/news", label: "News" },
    { to: "/about", label: "About" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary-700 to-primary-600 overflow-hidden">
      {/* Patriotic stripes - simple red and white */}
      <div className="absolute inset-y-0 left-0 flex pointer-events-none">
        {/* Red stripe */}
        <div className="h-full w-3 sm:w-4 bg-red-600/70"></div>

        {/* White stripe */}
        <div className="h-full w-3 sm:w-4 bg-white/90"></div>
      </div>

      <Container className="relative">
        <nav className="flex items-center justify-between h-14 relative">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow p-0.5">
                {/* Georgia State Seal */}
                <img
                  src="/Seal_of_Georgia.svg"
                  alt="Georgia State Seal"
                  className="w-full h-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-display font-bold text-sm sm:text-base leading-tight">
                  Georgia Elections 2026
                </span>
                <span className="text-primary-100 text-xs font-medium">
                  Houston County SD-18/20/26 & HD-134/143/146/147/148
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 text-sm text-white/90 hover:text-white font-medium transition-all duration-200 relative ${
                  isActive(link.to) ? "text-white" : ""
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-white rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X /> : <TextAlignJustify />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all duration-200 relative ${
                    isActive(link.to) ? "text-white bg-white/10" : ""
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                  {isActive(link.to) && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
