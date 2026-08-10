import { motion } from "framer-motion";

const SmileyFace = () => (
  <svg viewBox="0 0 100 100" className="h-14 w-14 md:h-16 md:w-16">
    <circle cx="35" cy="40" r="6" fill="#fff" />
    <circle cx="65" cy="40" r="6" fill="#fff" />
    <path
      d="M30 60 Q50 78 70 60"
      stroke="#fff"
      strokeWidth="6"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const KidsBadge = () => (
  <div
    className="flex h-full w-full items-center justify-center"
    style={{
      background:
        "linear-gradient(90deg, #2E7D32 0%, #F5A623 30%, #E91E63 65%, #6C63FF 100%)",
    }}
  >
    <span
      className="rounded-md bg-white px-3 py-1 text-2xl font-extrabold italic tracking-tight md:text-3xl"
      style={{ color: "#E50914" }}
    >
      kids
    </span>
  </div>
);

const ProfileCard = ({ profile, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onClick={onClick}
      className="group flex cursor-pointer flex-col items-center"
    >
      <div className="h-36 w-36 overflow-hidden rounded-md border-4 border-transparent shadow-lg transition-all duration-300 group-hover:border-white md:h-40 md:w-40">
        {profile.image ? (
          <img
            src={profile.image}
            alt={profile.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.parentElement.style.background =
                "linear-gradient(135deg, #333 0%, #1a1a1a 100%)";
            }}
          />
        ) : profile.kids ? (
          <KidsBadge />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              background: `linear-gradient(180deg, ${
                profile.color || "#8c8c8c"
              } 0%, ${profile.color || "#8c8c8c"}cc 100%)`,
            }}
          >
            <SmileyFace />
          </div>
        )}
      </div>

      <h2 className="mt-4 text-center text-xl font-medium tracking-wide text-gray-400 transition-colors duration-300 group-hover:text-white md:text-2xl">
        {profile.name}
      </h2>
    </motion.div>
  );
};

export default ProfileCard;
