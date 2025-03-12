import { motion } from "framer-motion";
import "../App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import VolumeOn from "../assets/icons/volume-on.svg";
import VolumeOff from "../assets/icons/volume-off.svg";
const colors = ["#aab7ff", "#89a2ff", "#6b5fd3", "#ccd9ff"];
const emberColors = ["#ff9966", "#ff5e62", "#ffcc99"];
const particles = Array.from({ length: 50 });
const embers = Array.from({ length: 20 });

export default function Home() {
  const [audioStarted, setAudioStarted] = useState(false);
  const [stars, setStars] = useState([]);
  const [audioMuted, setAudioMuted] = useState(false);
  const [fireCrackle, setFireCrackle] = useState(null);
  const [mysticalHum, setMysticalHum] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setAudioStarted(true);
  }, []);

  useEffect(() => {
    if (audioStarted) {
      if (stars.length === 0) {
        setStars(
          Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            startX: Math.random() * 100,
            startY: Math.random() * 100,
            size: Math.random() * 5 + 2,
            duration: Math.random() * 6 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
          }))
        );
      }

      const fireCrackleAudio = new Audio("public/sounds/fire_crackle.mp3");
      fireCrackleAudio.loop = true;
      fireCrackleAudio.volume = audioMuted ? 0 : 0.3;
      fireCrackleAudio.play().catch(error => console.error("Error playing fire crackle:", error));
      setFireCrackle(fireCrackleAudio);

      const mysticalHumAudio = new Audio("public/sounds/mystical_hum.mp3");
      mysticalHumAudio.loop = true;
      mysticalHumAudio.volume = audioMuted ? 0 : 0.2;
      mysticalHumAudio.play().catch(error => console.error("Error playing mystical hum:", error));
      setMysticalHum(mysticalHumAudio);
    }

    return () => {
      if (fireCrackle) {
        fireCrackle.pause();
        fireCrackle.currentTime = 0;
      }
      if (mysticalHum) {
        mysticalHum.pause();
        mysticalHum.currentTime = 0;
      }
    };
  }, [audioStarted, audioMuted]);

  useEffect(() => {
    if (fireCrackle) {
      fireCrackle.volume = audioMuted ? 0 : 0.3;
    }
    if (mysticalHum) {
      mysticalHum.volume = audioMuted ? 0 : 0.2;
    }
  }, [audioMuted, fireCrackle, mysticalHum]);

  return (
    <div className="blue-flame">
      <>
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {particles.map((_, i) => {
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;
          const size = Math.random() * 5 + 2;
          const duration = Math.random() * 6 + 3;
          const color = colors[Math.floor(Math.random() * colors.length)];

          return (
            <motion.div
              key={"particle-" + i}
              className="particle"
              style={{
                left: `${startX}%`,
                top: `${startY}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
              }}
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                y: ["0%", "-150%"],
                x: [`${startX}%`, `${startX + (Math.random() * 4 - 2)}%`],
              }}
              transition={{ duration: duration, repeat: Infinity, ease: "easeInOut" }}
            />
          );
        })}

        {embers.map((_, i) => {
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;
          const size = Math.random() * 3 + 1;
          const duration = Math.random() * 4 + 2;
          const color = emberColors[Math.floor(Math.random() * emberColors.length)];

          return (
            <motion.div
              key={"ember-" + i}
              className="ember"
              style={{
                left: `${startX}%`,
                top: `${startY}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
              }}
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: [0.4, 0.7, 0.4],
                y: ["0%", "-100%"],
                x: [`${startX}%`, `${startX + (Math.random() * 6 - 3)}%`],
              }}
              transition={{ duration: duration, repeat: Infinity, ease: "easeInOut" }}
            />
          );
        })}

        <main className="relative z-10 center-content">
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-white title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            What would you level up today?
          </motion.h1>
          <button className="audio-button" onClick={() => setAudioMuted(!audioMuted)}>
            <img src={audioMuted ? VolumeOff : VolumeOn} alt="Volume Icon" className="w-8 h-8" />
          </button>

          <div className="flex gap-4">
            <button
              className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-xl shadow-md hover:bg-blue-500 transition duration-300"
              onClick={() => navigate("/signup")}
            >
              Start
            </button>
          </div>
        </main>
      </>
    </div>
  );
}
