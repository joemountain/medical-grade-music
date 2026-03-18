import { useState, useRef, useEffect } from "react";

export default function App() {

  const [soundOn, setSoundOn] = useState(false);

  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const gainNodeRef = useRef(null);

  // 🔑 Safely reset gain before any new fade
  const resetGain = (context, gainNode) => {
    gainNode.gain.cancelScheduledValues(context.currentTime);
    gainNode.gain.setValueAtTime(gainNode.gain.value, context.currentTime);
  };

  const toggleSound = () => {

    const audio = audioRef.current;
    if (!audio) return;

    // 🔧 Initialise audio context once
    if (!audioContextRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const context = new AudioContext();

      const source = context.createMediaElementSource(audio);
      const gainNode = context.createGain();

      source.connect(gainNode);
      gainNode.connect(context.destination);

      audioContextRef.current = context;
      gainNodeRef.current = gainNode;
    }

    const context = audioContextRef.current;
    const gainNode = gainNodeRef.current;

    context.resume();

    // 🔑 Always reset before any new action
    resetGain(context, gainNode);

    if (!soundOn) {

      audio.play().catch(() => {});

      // 🎧 Fade in (6 seconds)
      gainNode.gain.setValueAtTime(0, context.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.18, context.currentTime + 6);

      setSoundOn(true);

    } else {

      // 🎧 Fade out (4 seconds)
      gainNode.gain.setValueAtTime(gainNode.gain.value, context.currentTime);
      gainNode.gain.linearRampToValueAtTime(0, context.currentTime + 4);

      setTimeout(() => {
        audio.pause();
      }, 4000);

      setSoundOn(false);

    }

  };

  useEffect(() => {

    const handleHide = () => {

      if (!soundOn) return;

      const context = audioContextRef.current;
      const gainNode = gainNodeRef.current;

      if (!context || !gainNode) return;

      resetGain(context, gainNode);

      // Fade out quickly when tab hidden
      gainNode.gain.linearRampToValueAtTime(0, context.currentTime + 1);

    };

    const handleShow = () => {

      if (!soundOn) return;

      const context = audioContextRef.current;
      const gainNode = gainNodeRef.current;

      if (!context || !gainNode) return;

      resetGain(context, gainNode);

      // Fade back in
      gainNode.gain.setValueAtTime(0, context.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.18, context.currentTime + 3);

    };

    const visibilityHandler = () => {
      if (document.hidden) {
        handleHide();
      } else {
        handleShow();
      }
    };

    document.addEventListener("visibilitychange", visibilityHandler);
    window.addEventListener("pagehide", handleHide);
    window.addEventListener("pageshow", handleShow);

    return () => {
      document.removeEventListener("visibilitychange", visibilityHandler);
      window.removeEventListener("pagehide", handleHide);
      window.removeEventListener("pageshow", handleShow);
    };

  }, [soundOn]);

  return (

    <>
      <audio ref={audioRef} src="/ambient.mp3" loop preload="auto" />

      <div className="page">

        <div
          className="snake-fill"
          style={{ backgroundImage: "url('/snake.jpg')" }}
        ></div>

        <img
          className="snake-main"
          src="/snake.jpg"
          alt=""
        />

        <div className="overlay"></div>
        <div className="vignette"></div>

        <div className="content">

          <h1 className="title">
            MEDICAL GRADE MUSIC
          </h1>

          <p>
            No cure. Coming Soon.
          </p>

          <div className="audio-controls">

            <button
              className="play-button"
              onClick={toggleSound}
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >

                <circle cx="12" cy="12" r="10"></circle>

                {!soundOn ? (
                  <polygon points="10,8 16,12 10,16"></polygon>
                ) : (
                  <>
                    <line x1="10" y1="8" x2="10" y2="16"></line>
                    <line x1="14" y1="8" x2="14" y2="16"></line>
                  </>
                )}

              </svg>

            </button>

            <a
              href="https://www.instagram.com/medical_grade_music/"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram"
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5C18.007 4 20 5.993 20 7.75v8.5C20 18.007 18.007 20 16.25 20h-8.5C5.993 20 4 18.007 4 16.25v-8.5C4 5.993 5.993 4 7.75 4zm8.75 1.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/>
              </svg>

            </a>

          </div>

        </div>

      </div>
    </>

  );

}
