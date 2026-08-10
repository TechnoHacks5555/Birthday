import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const LINK_COLUMNS = [
  [
    "Snack Recommendations",
    "Nap Schedule Support",
    "Shopping Cart Helpline",
    "Movie Night Committee",
  ],
  [
    "Nursing Shift Survival Guide",
    "Emotional Support (24/7)",
    "Vibe Check Requests",
    "Travel Planning Desk",
  ],
  [
    "Birthday FAQs",
    "Inside Jokes Archive",
    "Pandaa Appreciation Society",
    "Certified Fatichar HQ",
  ],
  [
    "Terms of Adoration",
    "Privacy (we already know everything)",
    "Corporate Info",
    "Contact the Director",
  ],
];

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-[#141414] px-6 pb-10 pt-14 text-gray-400 md:px-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex gap-5">
          <FaFacebookF className="h-6 w-6 cursor-pointer transition hover:text-white" />
          <FaInstagram className="h-6 w-6 cursor-pointer transition hover:text-white" />
          <FaTwitter className="h-6 w-6 cursor-pointer transition hover:text-white" />
          <FaYoutube className="h-6 w-6 cursor-pointer transition hover:text-white" />
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-4">
          {LINK_COLUMNS.map((col, i) => (
            <ul key={i} className="space-y-3">
              {col.map((link) => (
                <li
                  key={link}
                  className="cursor-pointer underline-offset-2 hover:text-white hover:underline"
                >
                  {link}
                </li>
              ))}
            </ul>
          ))}
        </div>

        <button className="mt-8 rounded border border-gray-600 px-3 py-1.5 text-sm text-gray-400 transition hover:text-white">
          🌐 English (Shaili Edition)
        </button>

        <div className="mt-10 space-y-2 border-t border-gray-800 pt-6 text-xs leading-5 text-gray-500">
          <p>
            A Netflix Original, cast of one, made entirely out of how much
            you're loved.
          </p>
          <p>© 2026 Made with love and joy by PARTH. All rights reserved, and all the love too.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;