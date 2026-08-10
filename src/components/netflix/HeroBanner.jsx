// const HeroBanner = () => {
//   return (
//     <div
//       className="h-[95vh] bg-cover bg-center relative"
//       style={{
//         backgroundImage: "url('/hero/banner.jpg')",
//       }}
//     >
//       <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />

//       <div className="absolute bottom-36 left-16 max-w-xl">
//         <h1 className="text-7xl font-bold mb-6">
//           THE STORY OF
//           <br />
//           SHAILI
//         </h1>

//         <p className="text-lg text-gray-300 mb-8">
//           Every great story deserves its own Netflix Original.
//         </p>

//         <div className="flex gap-5">
//           <button className="bg-white hover:bg-white/80 transition text-black px-8 py-3 rounded flex items-center gap-2 font-bold">
//             ▶ Play
//           </button>

//           <button className="bg-gray-500/70 hover:bg-gray-500 transition px-8 py-3 rounded">
//             ⓘ More Info
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroBanner;

import { motion } from "framer-motion";
import { shailibanner } from "../../data/moviesMapper";

const HeroBanner = ({ onPlay }) => {
  return (
    <div
      className="relative h-[95vh] bg-cover bg-center"
      style={{
        backgroundImage: `url('${import.meta.env.BASE_URL}hero/hero.jpg')`,
      }}
    >
      {/* bottom fade into page bg */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
      {/* left fade for text legibility, like the real hero */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/80 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute bottom-28 left-6 max-w-xl md:bottom-36 md:left-16"
      >
        <span className="mb-4 inline-block rounded-sm bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gray-200">
          🎂 A Birthday Original
        </span>

        <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
          Shaili Is
          <br />
          Shailingg 😉
        </h1>

        <p className="mb-8 text-base text-gray-300 md:text-lg">
          Every great story deserves its own Netflix Original. No matter where
          she is or who she's with, Shaili will always find a way to be... well,
          Shaili.
        </p>

        <div className="flex gap-4 md:gap-5">
          <button
            onClick={() => onPlay?.(shailibanner[0])}
            className="flex items-center gap-2 rounded bg-white px-6 py-3 font-bold text-black transition hover:bg-white/80 md:px-8"
          >
            ▶ Play
          </button>

          <button className="rounded bg-gray-500/70 px-6 py-3 font-semibold transition hover:bg-gray-500 md:px-8">
            ⓘ Scroll Down
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroBanner;
