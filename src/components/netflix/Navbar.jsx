import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, ChevronDown } from "lucide-react";
import ROUTES from "../../constants/routes";

const NAV_LINKS = ["Home", "TV Shows", "Movies", "New & Popular", "My List"];

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#141414]"
          : "bg-gradient-to-b from-black via-black/60 to-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4 md:px-14 md:py-5">
        <div className="flex items-center gap-10">
          <img
            src={`${import.meta.env.BASE_URL}logos/netflix-nav-logo.svg`}
            alt="Netflix"
            className="w-24 md:w-28"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />

          <div className="hidden gap-6 text-sm md:flex">
            {NAV_LINKS.map((link, i) => (
              <span
                key={link}
                className={`cursor-pointer transition-colors hover:text-gray-300 ${
                  i === 0 ? "font-semibold text-white" : "text-gray-200"
                }`}
              >
                {link}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-5 md:gap-6">
          <Search className="h-5 w-5 cursor-pointer transition hover:text-gray-300" />
          <Bell className="h-5 w-5 cursor-pointer transition hover:text-gray-300" />

          <div
            className="relative flex cursor-pointer items-center gap-1"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <img
              src={`${import.meta.env.BASE_URL}intro/shailiprofile.jpg`}
              alt="Profile"
              className="w-9 rounded"
              onError={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, #E50914 0%, #8a0710 100%)";
              }}
            />
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                menuOpen ? "rotate-180" : ""
              }`}
            />

            {menuOpen && (
              <div className="absolute right-0 top-full w-44 rounded-sm border border-white/10 bg-[#141414]/95 py-2 text-sm shadow-xl">
                <div className="px-4 py-2 text-gray-300 hover:text-white">
                  Manage Profiles
                </div>
                <div className="px-4 py-2 text-gray-300 hover:text-white">
                  Account
                </div>
                <hr className="my-1 border-white/10" />
                <button
                  type="button"
                  onClick={() => navigate(ROUTES.PROFILE)}
                  className="w-full text-left px-4 py-2 text-gray-300 hover:text-white"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;