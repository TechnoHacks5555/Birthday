const FullscreenLayout = ({ children }) => {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(ellipse 120% 80% at 50% 0%, #1f1f1f 0%, #141414 55%, #0a0a0a 100%)",
      }}
    >
      {/* faint top vignette, like the real profile-select screen */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 100%)" }}
      />
      {children}
    </div>
  );
};

export default FullscreenLayout;