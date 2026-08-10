import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import FullscreenLayout from "../../components/common/FullscreenLayout";
import ProfileCard from "../../components/netflix/ProfileCard";
import AddProfileTile from "../../components/netflix/AddProfileTile";

import profiles from "../../data/profiles";

import ROUTES from "../../constants/routes";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const Profiles = () => {
  const navigate = useNavigate();

  return (
    <FullscreenLayout>
      {/* TODO: adjust the filename below to match whatever you have in public/logos */}
      <img
        src={`${import.meta.env.BASE_URL}logos/netflix-nav-logo.svg`}
        alt="Netflix"
        className="absolute left-8 top-8 h-7 md:h-8"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex h-screen flex-col items-center justify-center px-6"
      >
        <h1 className="mb-3 text-center text-4xl font-semibold tracking-wide md:text-6xl">
          Who's Watching?
        </h1>
        <p className="mb-14 text-sm text-gray-400 md:text-base">
          Select a profile to continue
        </p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-wrap justify-center gap-10 md:gap-16"
        >
          {profiles.map((profile) => (
            <motion.div key={profile.id} variants={cardVariants}>
              <ProfileCard
                profile={profile}
                onClick={() => navigate(ROUTES.HOME)}
              />
            </motion.div>
          ))}

          <motion.div variants={cardVariants}>
            <AddProfileTile onClick={() => {}} />
          </motion.div>
        </motion.div>

        <button
          className="mt-20 flex items-center gap-2 rounded border border-transparent px-5 py-2 text-sm uppercase tracking-wide text-gray-400 transition-all hover:border-gray-500 hover:text-white md:text-base"
          onClick={() => {}}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Manage Profiles
        </button>
      </motion.div>
    </FullscreenLayout>
  );
};

export default Profiles;