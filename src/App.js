import { useState, useRef, useEffect } from "react";

export default function App() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
const filterRef = useRef(null);

const handleSubmit = (e) => {
  e.preventDefault();

  if (password === "thebeatles2026") {
    if (audioRef.current) {
      const audio = audioRef.current;

      audio.volume = 0;
    if (!audioContextRef.current) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  audioContextRef.current = new AudioContext();

  const source = audioContextRef.current.createMediaElementSource(audio);
  const filter = audioContextRef.current.createBiquadFilter();

  filter.type = "lowpass";
  filter.frequency.value = 400;

  source.connect(filter);
  filter.connect(audioContextRef.current.destination);

  filterRef.current = filter;
}

setTimeout(() => {
  const duration = audio.duration;

  if (!isNaN(duration) && duration > 0) {
    const randomStart = Math.random() * duration;
    audio.currentTime = randomStart;
  }

  audio.play().catch(() => {});
}, 800);

   const targetVolume = 0.18;

const introFadeDuration = 6000;

const steps = 60;

const fadeInStepTime = introFadeDuration / steps;

const volumeStep = targetVolume / steps;

      let currentStep = 0;

      const fadeIn = setInterval(() => {
        if (currentStep < steps) {
          audio.volume = Math.min(audio.volume + volumeStep, targetVolume);
          if (filterRef.current) {
  const progress = currentStep / steps;
filterRef.current.frequency.value = Math.min(
  20000,
  400 * Math.pow(45, progress)
);
}
          currentStep++;
        } else {
          clearInterval(fadeIn);
        }
      }, fadeInStepTime);
    }

    setAuthorized(true);
  }
}; 
  useEffect(() => {
  const handleVisibility = () => {
    const audio = audioRef.current;
    if (!audio) return;

   const targetVolume = 0.18;

const fadeOutDuration = 3000;
const fadeInDuration = 6000;

const steps = 60;

const fadeOutStepTime = fadeOutDuration / steps;
const fadeInStepTime = fadeInDuration / steps;

const volumeStep = targetVolume / steps;
    let currentStep = 0;

 if (document.hidden) {
  const fadeOut = setInterval(() => {
    if (currentStep < steps) {
      audio.volume = Math.max(audio.volume - volumeStep, 0);
      currentStep++;
    } else {
      clearInterval(fadeOut);
    }
  }, fadeOutStepTime);
} else {
  const fadeIn = setInterval(() => {
    if (currentStep < steps) {
      audio.volume = Math.min(audio.volume + volumeStep, targetVolume);
      currentStep++;
    } else {
      clearInterval(fadeIn);
    }
  }, fadeInStepTime);
}
  };

  document.addEventListener("visibilitychange", handleVisibility);

  return () => {
    document.removeEventListener("visibilitychange", handleVisibility);
  };
}, []);

  return (
    <>
      {/* AUDIO ALWAYS EXISTS */}
      <audio ref={audioRef} src="/ambient.mp3" loop />

      {!authorized ? (
        <div
          style={{
            height: "100vh",
            background: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontFamily: "Arial, sans-serif"
          }}
        >
          <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
            <p>Enter Password</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: "10px",
                marginTop: "10px",
                background: "black",
                color: "white",
                border: "1px solid white"
              }}
            />
          </form>
        </div>
      ) : (
        <div className="background-fade">
          <div className="black-fade"></div>

          <div
            style={{
              backgroundImage: "url('/snake.jpeg')",
              backgroundSize: "60%",
              backgroundPosition: "center",
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontFamily: "Arial, sans-serif",
              position: "relative",
              color: "white",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.55)",
              }}
            />

            <div className="content-fade" style={{ position: "relative", zIndex: 2 }}>
              <h1 style={{ fontSize: "48px", letterSpacing: "3px" }}>
                MEDICAL GRADE MUSIC
              </h1>

              <p style={{ fontSize: "20px", marginBottom: "30px" }}>
                No cure. Coming Soon.
              </p>

              <a
                href="https://www.instagram.com/medical_grade_music/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: "30px", display: "inline-block" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5C18.007 4 20 5.993 20 7.75v8.5C20 18.007 18.007 20 16.25 20h-8.5C5.993 20 4 18.007 4 16.25v-8.5C4 5.993 5.993 4 7.75 4zm8.75 1.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
