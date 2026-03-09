import { useState, useRef, useEffect } from "react";

export default function App() {

const [entered, setEntered] = useState(false);

const audioRef = useRef(null);
const fadeRef = useRef(null);

const fadeAudio = (targetVolume, duration) => {

  const audio = audioRef.current;
  if (!audio) return;

  if (fadeRef.current) cancelAnimationFrame(fadeRef.current);

  const startVolume = audio.volume;
  const startTime = performance.now();

  const animate = (time) => {

    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const curved = progress * progress;

    audio.volume =
      startVolume + (targetVolume - startVolume) * curved;

    if (progress < 1) {
      fadeRef.current = requestAnimationFrame(animate);
    }

  };

  fadeRef.current = requestAnimationFrame(animate);

};


const handleEnter = () => {

  const audio = audioRef.current;
  if (!audio) return;

  setEntered(true);

  audio.volume = 0;

  setTimeout(() => {

    audio.play().catch(() => {});
    fadeAudio(0.18, 6000);

  }, 1600);

};


useEffect(() => {

const handleVisibility = () => {

  if (!entered) return;

  const audio = audioRef.current;
  if (!audio) return;

  if (document.hidden) {

    fadeAudio(0, 2000);

    setTimeout(() => {
      audio.pause();
    }, 2000);

  } else {

    audio.play().catch(()=>{});
    fadeAudio(0.18, 6000);

  }

};

  const handlePageHide = () => {

    if (!entered) return;

    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.volume = 0;

  };

  const handlePageShow = () => {

    if (!entered) return;

    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(()=>{});
    }

    fadeAudio(0.18, 6000);

  };

  document.addEventListener("visibilitychange", handleVisibility);
  window.addEventListener("blur", handleVisibility);
  window.addEventListener("pagehide", handlePageHide);
  window.addEventListener("pageshow", handlePageShow);

  return () => {

    document.removeEventListener("visibilitychange", handleVisibility);
    window.removeEventListener("blur", handleVisibility);
    window.removeEventListener("pagehide", handlePageHide);
    window.removeEventListener("pageshow", handlePageShow);

  };

}, [entered]);


return (

<>
<audio ref={audioRef} src="/ambient.mp3" loop />

{!entered ? (

<div className="center-screen">

<button
className="enter-button"
onClick={handleEnter}
>
ENTER
</button>

</div>

) : (

<div
className="page drifting-bg"
style={{ backgroundImage: "url('/snake.jpeg')" }}
>

<div className="black-fade"></div>

<div className="overlay"></div>

<div className="vignette"></div>

<div className="content">

<h1 className="title">
MEDICAL GRADE MUSIC
</h1>

<p>
No cure. Coming Soon.
</p>

<a
href="https://www.instagram.com/medical_grade_music/"
target="_blank"
rel="noopener noreferrer"
className="instagram"
>

<svg
xmlns="http://www.w3.org/2000/svg"
width="32"
height="32"
viewBox="0 0 24 24"
fill="white"
>
<path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5C18.007 4 20 5.993 20 7.75v8.5C20 18.007 18.007 20 16.25 20h-8.5C5.993 20 4 18.007 4 16.25v-8.5C4 5.993 5.993 4 7.75 4zm8.75 1.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/>
</svg>

</a>

</div>

</div>

)}

</>

);

}
