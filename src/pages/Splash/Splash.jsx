import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../constants/routes";
import TeddyRive from "../../components/ui/TeddyRive";

const PASSWORD = "1208";

const QUOTES = [
  "Certified food goblin, 24/7 🍿",
  "Nurse-in-training, professional overthinker 🩺",
  "Shopping cart permanently full, no regrets 🛍️",
  "My favourite person 🩷",
  "Creative brain, softest heart 🎨",
  "Alwayss a Faticharrr✨",
  "Home is wherever you're making a mess and laughing 🏡",
  "The bestest, most caring, most loving person I know 🫶",
  "Toooo much 'ID', still doable 🫶",
];

const BALLOON_COLORS = [
  "#FF8FAB",
  "#C2E0FF",
  "#F3AFFF",
  "#FFF3B0",
  "#C8F4DE",
  "#E5D4FF",
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const Balloon = ({ color, side, quote }) => (
  <motion.div
    initial={{ y: 0, opacity: 0, scale: 0.85 }}
    animate={{ y: -320, opacity: [0, 1, 1, 1, 0], scale: 1 }}
    transition={{
      duration: 4.6,
      ease: "easeOut",
      times: [0, 0.1, 0.5, 0.85, 1],
    }}
    className="pointer-events-none absolute bottom-[8%] flex flex-col items-center"
    style={{ [side]: "20%" , zIndex: 100 }}
  >
    <div
      className="mb-2 max-w-[140px] rounded-2xl px-3 py-2 text-center text-[12px] leading-snug shadow-lg"
      style={{
        background: "#FFFBF7",
        color: "#8a4a5c",
        border: "1.5px solid #FFD4E1",
        fontFamily: "'Quicksand', sans-serif",
        fontWeight: 600,
      }}
    >
      {quote}
    </div>
    <svg width="32" height="42" viewBox="0 0 34 44">
      <ellipse cx="17" cy="17" rx="16" ry="17" fill={color} />
      <ellipse cx="12" cy="11" rx="4" ry="6" fill="#fff" opacity="0.35" />
      <path d="M17 34 L14 40 L20 40 Z" fill={color} />
      <line x1="17" y1="40" x2="17" y2="44" stroke={color} strokeWidth="1" />
    </svg>
  </motion.div>
);

const StickyNote = ({ text, color, rotate, style }) => (
  <div
    className="absolute select-none rounded-sm px-3 py-3 text-center text-[15px] shadow-md"
    style={{
      background: color,
      transform: `rotate(${rotate}deg)`,
      fontFamily: "'Caveat', cursive",
      fontWeight: 700,
      color: "#5c4433",
      width: 170,
      height: 120,
      fontSize: 24,
      ...style,
    }}
  >
    <div
      className="absolute -top-2 left-1/2 h-4 w-8 -translate-x-1/2 opacity-70"
      style={{
        background: "rgba(255,255,255,0.55)",
        transform: "rotate(-3deg)",
      }}
    />
    {text}
  </div>
);

const Splash = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const teddyRef = useRef(null);

  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [showHintPopup, setShowHintPopup] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [popups, setPopups] = useState([]);
  const [pool, setPool] = useState(() => shuffle(QUOTES));
  const idRef = useRef(0);
  const sideRef = useRef(0);

  const canShowHint = errorCount > 2;

  // Bear covers its eyes while she's mid-entry, uncovers once empty or complete.
  useEffect(() => {
    teddyRef.current?.setChecking(password.length > 0 && password.length < 4);
  }, [password]);

  const addPopup = () => {
    const id = idRef.current++;
    let nextPool = pool;
    if (nextPool.length === 0) nextPool = shuffle(QUOTES);
    const quote = nextPool[0];
    nextPool = nextPool.slice(1);
    setPool(nextPool);

    const color =
      BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)];
    const side = sideRef.current % 2 === 0 ? "left" : "right";
    sideRef.current++;

    setPopups((p) => [...p, { id, quote, color, side }]);
    setTimeout(() => {
      setPopups((p) => p.filter((x) => x.id !== id));
    }, 4800);
  };

  const handleEnter = () => {
    setShowIntro(true);
    setTimeout(() => {
      videoRef.current?.play();
    }, 200);
  };

  const handleHint = () => {
    if (!canShowHint) return;

    setShowHintPopup(true);
    setTimeout(() => {
      setShowHintPopup(false);
    }, 2200);
  };

  const handleDigit = (d) => {
    if (password.length >= 4) return;
    const next = password + d;

    teddyRef.current?.setNumLook(Number(d));

    if (next !== PASSWORD.slice(0, next.length)) {
      setError(true);
      setErrorCount((count) => count + 1);
      teddyRef.current?.fireFail();
      setTimeout(() => {
        setError(false);
        setPassword("");
      }, 450);
      return;
    }

    setPassword(next);
    addPopup();
    teddyRef.current?.raiseHands();

    if (next.length === 4) {
      teddyRef.current?.fireSuccess();
      setTimeout(handleEnter, 1100);
    }
  };

  const handleDelete = () => setPassword((p) => p.slice(0, -1));

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      if (/^[0-9]$/.test(key)) {
        event.preventDefault();
        handleDigit(key);
      } else if (key === "Backspace") {
        event.preventDefault();
        handleDelete();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [password]);

  const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <div className="fixed inset-0 overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Quicksand:wght@400;500;600;700&display=swap');
        .caveat { font-family: 'Caveat', cursive; }
        .quicksand { font-family: 'Quicksand', sans-serif; }
      `}</style>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, #FFF0F5 0%, #FFE3EC 55%, #FFD6E5 100%)",
        }}
      />

      <AnimatePresence>
        {popups.map((p) => (
          <Balloon key={p.id} color={p.color} side={p.side} quote={p.quote} />
        ))}
      </AnimatePresence>

      {showHintPopup && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          className="absolute left-1/2 top-24 z-20 -translate-x-1/2 rounded-3xl border border-pink-100 bg-white/95 px-5 py-3 text-center text-sm font-semibold text-[#8a4a68] shadow-2xl"
        >
          Hint: It's a date when this queen was born! dd/mm 🫶
        </motion.div>
      )}

      <AnimatePresence>
        {!showIntro && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 flex h-screen w-screen items-center justify-center"
          >
            <StickyNote
              text="Certified vibe curator, no applications open 🎀"
              color="#FFF3B0"
              rotate={-8}
              style={{ top: "18%", left: "8%", height: 180 }}
            />
            <StickyNote
              text="World's most talented yapper n napper 😴"
              color="#C8F4DE"
              rotate={7}
              style={{ bottom: "16%", left: "6%" }}
            />
            <StickyNote
              text="Toooo much 'ID' , stillll doable 😘😆"
              color="#E5D4FF"
              rotate={-6}
              style={{ top: "16%", right: "7%" }}
            />

            <div
              className="quicksand absolute select-none rounded-sm px-5 py-4 text-left text-[14px] leading-6 shadow-md"
              style={{
                bottom: "8%",
                right: "6%",
                width: 260,
                background: "#FFFBF7",
                color: "#8a5a68",
                transform: "rotate(3deg)",
                border: "1.5px solid #FFD4E1",
              }}
            >
              <div
                className="absolute -top-2 left-1/2 h-4 w-10 -translate-x-1/2 opacity-70"
                style={{
                  background: "rgba(255,255,255,0.6)",
                  transform: "rotate(-2deg)",
                }}
              />
              You're the most caring person, biggest shopaholic, pani-puri
              goblin and professional sleeper I know. And I know you're way too
              obsessed with movies — so obviously had to make one starring you,
              Fatichar 🎬🩷 Enter the easiest 4 digit password you know.
            </div>

            {/* teddy + card as one stacked unit, teddy sits as a badge on the top edge */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative z-20 mb-[-52px]">
                <TeddyRive ref={teddyRef} size={200} />
              </div>

              <motion.div
                animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                className="relative z-10 w-100 rounded-3xl border-2 pb-8 pt-16 text-center shadow-2xl"
                style={{
                  background:
                    "linear-gradient(180deg, #FFFBF7 0%, #FFF3F7 100%)",
                  borderColor: error ? "#FF6F91" : "#FFD4E1",
                  boxShadow: "0 24px 60px rgba(255,143,171,0.25)",
                  paddingLeft: 32,
                  paddingRight: 32,
                }}
              >
                <div
                  className="caveat mb-1 text-5xl"
                  style={{ color: "#FF6F91" }}
                >
                  Heyy Chetta
                </div>
                <div
                  className="quicksand mb-2 inline-block rounded-full px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.15em]"
                  style={{ background: "#FFE3EC", color: "#D6547A" }}
                >
                  a little something, just for you 💌
                </div>
                <div
                  className="mb-0 text-[10px] leading-snug"
                  style={{ color: "#8a5a68" }}
                >
                  Hope these are some better stickers/notes than the ones I make
                  <div>Enter the correct buttons & watch the balloons</div>
                </div>

                <div className="mb-2 flex justify-center gap-3">
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} style={{ fontSize: 18 }}>
                      {i < password.length ? "🐻" : "🤍"}
                    </span>
                  ))}
                </div>
                <div className="flex justify-center mt-2">
                  <div className="mx-auto grid w-[250px] grid-cols-3 gap-3">
                    {digits.map((d) => (
                      <button
                        key={d}
                        onClick={() => handleDigit(d)}
                        className="quicksand h-[68px] rounded-2xl text-xl font-bold transition-all active:scale-95"
                        style={{
                          background: "#FFF0F5",
                          border: "1.5px solid #FFD4E1",
                          color: "#B5476A",
                        }}
                      >
                        {d}
                      </button>
                    ))}
                    <button
                      onClick={handleDelete}
                      className="flex h-[68px] items-center justify-center rounded-2xl transition-all active:scale-95"
                      style={{
                        background: "#FFF0F5",
                        border: "1.5px solid #FFD4E1",
                      }}
                    >
                      <span style={{ color: "#c98a9d" }}>⌫</span>
                    </button>
                    <button
                      onClick={() => handleDigit("0")}
                      className="quicksand h-[68px] rounded-2xl text-xl font-bold transition-all active:scale-95"
                      style={{
                        background: "#FFF0F5",
                        border: "1.5px solid #FFD4E1",
                        color: "#B5476A",
                      }}
                    >
                      0
                    </button>
                    <button
                      disabled={!canShowHint}
                      onClick={handleHint}
                      className="flex h-[68px] items-center justify-center rounded-2xl"
                      style={{
                        background: canShowHint ? "#FFE3EC" : "#E8327B",
                        color: canShowHint ? "#64585B" : "#87757E",
                        cursor: canShowHint ? "pointer" : "not-allowed",
                        border: canShowHint ? "1.5px solid #CF3362" : "1.5px solid #F6CDDE",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 20,
                        }}
                      >
                        🐾<div>Clue</div>
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showIntro && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-10"
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            controls={false}
            playsInline
            onEnded={() => navigate(ROUTES.PROFILE)}
          >
            <source src={`${import.meta.env.BASE_URL}intro/netflix-intro.mp4`} type="video/mp4" />
          </video>
        </motion.div>
      )}
    </div>
  );
};

export default Splash;
