import { useEffect } from "react";

const Confetti = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    import("canvas-confetti").then((confetti) => {
      confetti.default({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        zIndex: 9999,
      });
    });
  }, []);
  return null;
};

export default Confetti;
