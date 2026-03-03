export default function App() {
  return (
    <div className="fade-in">
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
        {/* Dark overlay */}
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
            {/* Instagram SVG */}
          </a>
        </div>
      </div>
    </div>
  );
}
