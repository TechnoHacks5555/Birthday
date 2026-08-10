import { useEffect, useRef } from "react";
import { X } from "lucide-react";

const VideoPlayerModal = ({ movie, onClose }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!movie) return;

    const el = videoRef.current;

    // Ask the browser for true OS-level fullscreen. If it's blocked (some
    // browsers require the request to happen synchronously inside the
    // click that opened this), the modal still covers the whole viewport
    // via CSS, so it looks and behaves the same either way.
    if (el?.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    }

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    const onFsChange = () => {
      if (!document.fullscreenElement) onClose();
    };

    window.addEventListener("keydown", onKey);
    document.addEventListener("fullscreenchange", onFsChange);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("fullscreenchange", onFsChange);
    };
  }, [movie, onClose]);

  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black">
      <button
        onClick={() => {
          if (document.fullscreenElement) document.exitFullscreen?.();
          onClose();
        }}
        className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
      >
        <X className="h-6 w-6" />
      </button>

      {/* movie.video can be a local path ("/videos/clip.mp4") or a full
          Cloudinary URL — both are just strings to the <video> tag, no
          extra handling needed either way. */}
      <video
        ref={videoRef}
        src={movie.video}
        autoPlay
        controls
        className="h-full w-full object-contain"
        onEnded={onClose}
      />
    </div>
  );
};

export default VideoPlayerModal;
