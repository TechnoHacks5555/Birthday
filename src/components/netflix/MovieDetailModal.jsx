import { useEffect, useRef, useState } from "react";
import { Play, Plus, ThumbsUp, X, Volume2, VolumeX } from "lucide-react";

const MovieDetailModal = ({ movie, onClose, onPlay }) => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = muted;
    if (!muted) {
      video.play().catch(() => {});
    }
  }, [muted, movie]);

  if (!movie) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="scrollbar-hide relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-md bg-[#181818] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#181818] text-white transition hover:bg-black"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative aspect-video w-full overflow-hidden bg-black">
          {movie.video ? (
            <video
              ref={videoRef}
              src={movie.video}
              poster={movie.image}
              autoPlay
              loop
              muted={muted}
              playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            <img
              src={movie.image}
              alt={movie.title}
              className="h-full w-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />

          {movie.video && (
            <button
              onClick={() => {
                setMuted((current) => !current);
                if (videoRef.current) videoRef.current.muted = !muted;
              }}
              className="absolute bottom-6 right-6 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/40 text-white transition hover:border-white"
            >
              {muted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>
          )}

          <div className="absolute bottom-6 left-6">
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#E50914]">
              Netflix
            </span>
            <h2 className="font-serif text-4xl italic text-white md:text-5xl">
              {movie.title}
            </h2>
          </div>
        </div>

        <div className="px-6 py-5 md:px-8">
          <div className="mb-5 flex items-center gap-3">
            <button
              onClick={() => onPlay(movie)}
              className="flex items-center gap-2 rounded bg-white px-6 py-2.5 font-bold text-black transition hover:bg-white/80"
            >
              <Play className="h-4 w-4 fill-black" /> Play
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-500 text-white transition hover:border-white">
              <Plus className="h-5 w-5" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-500 text-white transition hover:border-white">
              <ThumbsUp className="h-5 w-5" />
            </button>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-300">
            {movie.year && <span>{movie.year}</span>}
            {movie.duration && <span>{movie.duration}</span>}
            <span className="rounded border border-gray-500 px-1.5 text-xs">
              HD
            </span>
            {movie.rating && (
              <span className="rounded border border-gray-500 px-1.5 text-xs">
                {movie.rating}
              </span>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_260px]">
            <p className="text-sm leading-6 text-gray-200 md:text-base">
              {movie.description ||
                "A memory worth replaying, made just for you."}
            </p>

            <div className="space-y-3 text-sm">
              {movie.cast?.length > 0 && (
                <p className="text-gray-400">
                  <span className="text-gray-500">Cast: </span>
                  {movie.cast.join(", ")}
                </p>
              )}
              {movie.genres?.length > 0 && (
                <p className="text-gray-400">
                  <span className="text-gray-500">Genres: </span>
                  {movie.genres.join(", ")}
                </p>
              )}
              {movie.tags?.length > 0 && (
                <p className="text-gray-400">
                  <span className="text-gray-500">This Memory Is: </span>
                  {movie.tags.join(", ")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailModal;
