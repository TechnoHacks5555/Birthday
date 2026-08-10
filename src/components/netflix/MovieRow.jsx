import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";

const MovieRow = ({ title, movies, onInfo, onPlay }) => {
  const scrollRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  const scrollBy = (amount) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section
      className="group relative mt-5 px-6 md:mt-5 md:px-16"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <h2 className="mb-4 text-xl font-semibold md:mb-5 md:text-3xl">
        {title}
      </h2>

      <div className="relative">
        {/* edge fades so cards don't just hard-cut at the container edge */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r from-[#141414] to-transparent md:w-16" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-[#141414] to-transparent md:w-16" />

        {hovering && (
          <>
            <button
              onClick={() => scrollBy(-800)}
              className="absolute left-0 top-0 z-20 flex h-full w-10 items-center justify-center bg-black/40 text-white opacity-0 transition-opacity duration-200 hover:bg-black/60 group-hover:opacity-100 md:w-14"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              onClick={() => scrollBy(800)}
              className="absolute right-0 top-0 z-20 flex h-full w-10 items-center justify-center bg-black/40 text-white opacity-0 transition-opacity duration-200 hover:bg-black/60 group-hover:opacity-100 md:w-14"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          </>
        )}

        {/*
          grid-auto-flow: column + percentage auto-cols gives ~2.3 tiles on
          mobile and ~4.5-5 tiles on desktop, with a sliver of the next tile
          peeking in — same trick the real site uses.
          Generous vertical padding here (not on the section) so the
          hover-expanded card has room to grow without getting clipped by
          this element's horizontal scroll container.
        */}

        <div
          ref={scrollRef}
          className="
    scrollbar-hide
    grid
    grid-flow-col
    auto-cols-[62%]
    gap-3
    overflow-x-scroll
    overflow-y-hidden
    pb-24
    pt-3
    sm:auto-cols-[45%]
    md:auto-cols-[32%]
    md:gap-4
    md:pb-28
    lg:auto-cols-[25%]
    xl:auto-cols-[22%]
  "
        >
          {movies.map((movie, index) => (
            <MovieCard
              key={`${movie.title}-${index}`}
              movie={movie}
              onInfo={onInfo}
              onPlay={onPlay}
              isFirst={index === 0}
              isLast={index === movies.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieRow;
