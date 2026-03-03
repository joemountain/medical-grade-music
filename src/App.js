export default function App() {
  return (
    <div
      style={{
        backgroundImage: "url('/snake.jpeg')",
        backgroundSize: "60%",
        backgroundPosition: "center top",
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
      {/* Dark overlay so text is readable but snake still visible */}
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

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <h1
          style={{
            fontSize: "48px",
            marginBottom: "10px",
            letterSpacing: "3px",
          }}
        >
          MEDICAL GRADE MUSIC
        </h1>

        <p style={{ fontSize: "20px", marginBottom: "30px" }}>
          No cure. Coming Soon.
        </p>

        <a
          href="https://www.instagram.com/medical_grade_music/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: "30px",
            display: "inline-block",
          }}
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
  );
}
