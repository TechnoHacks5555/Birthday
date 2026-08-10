import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Plus, ThumbsUp, ChevronDown } from "lucide-react";

const MovieCard = ({ movie, onInfo, onPlay, isFirst, isLast }) => {
  const [hovering, setHovering] = useState(false);
  const timeoutRef = useRef(null);

  const handleEnter = () => {
    timeoutRef.current = setTimeout(() => setHovering(true), 400);
  };

  const handleLeave = () => {
    clearTimeout(timeoutRef.current);
    setHovering(false);
  };

  const handlePlayClick = (e) => {
    e.stopPropagation();
    onPlay?.(movie);
  };

  const handleCardClick = () => {
    onInfo?.(movie);
  };

  return (
    <motion.div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      animate={
        hovering
          ? { scale: 1.18, y: -20, zIndex: 30 }
          : { scale: 1, y: 0, zIndex: 1 }
      }
      transition={{ duration: 0.25 }}
      onClick={handleCardClick}
      className="group relative w-full cursor-pointer overflow-visible"
      style={{
        transformOrigin: isFirst
          ? "left center"
          : isLast
          ? "right center"
          : "center center",
      }}
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded shadow-lg">
        {movie.video && (
          <div className="absolute left-3 top-3 z-20 rounded-full bg-black/70 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white shadow-sm">
            Video
          </div>
        )}
        <img
          src={movie.image}
          alt={movie.title}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.parentElement.style.background =
              "linear-gradient(135deg, #333 0%, #1a1a1a 100%)";
          }}
        />

        {typeof movie.progress === "number" && (
          <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-600/70">
            <div
              className="h-full bg-[#E50914]"
              style={{
                width: `${Math.min(100, Math.max(0, movie.progress))}%`,
              }}
            />
          </div>
        )}
      </div>

      {/* Hover Info Panel */}
      <div
        className={`absolute inset-x-0 top-full rounded-b bg-[#181818] px-3 py-3 shadow-xl transition-all duration-200 ${
          hovering
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="mb-2 flex items-center gap-2">
          <button
            onClick={handlePlayClick}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black transition hover:bg-white/80"
          >
            <Play className="h-3.5 w-3.5 fill-black" />
          </button>

          <button
            onClick={(e) => e.stopPropagation()}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-400 text-white transition hover:border-white"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={(e) => e.stopPropagation()}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-400 text-white transition hover:border-white"
          >
            <ThumbsUp className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onInfo?.(movie);
            }}
            className="ml-auto flex h-7 w-7 items-center justify-center rounded-full border border-gray-400 text-white transition hover:border-white"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>

        <p className="mb-1 text-xs font-medium text-gray-100 whitespace-normal">
          {movie.title}
        </p>

        <div className="mb-1 flex flex-wrap items-center gap-2 text-[11px] text-gray-300">
          {movie.rating && <span>{movie.rating}</span>}
          {movie.duration && <span>{movie.duration}</span>}
        </div>

        {movie.tags?.length > 0 && (
          <p className="text-[11px] text-gray-400 whitespace-normal">
            {movie.tags.join(" • ")}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default MovieCard;
