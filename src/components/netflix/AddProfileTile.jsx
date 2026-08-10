import { motion } from "framer-motion";

const AddProfileTile = ({ onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onClick={onClick}
      className="group flex cursor-pointer flex-col items-center"
    >
      <div className="flex h-36 w-36 items-center justify-center rounded-full bg-[#2b2b2b] text-gray-400 transition-all duration-300 group-hover:bg-[#3a3a3a] group-hover:text-white md:h-40 md:w-40">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </div>

      <h2 className="mt-4 text-center text-xl font-medium tracking-wide text-gray-400 transition-colors duration-300 group-hover:text-white md:text-2xl">
        Add Profile
      </h2>
    </motion.div>
  );
};

export default AddProfileTile;