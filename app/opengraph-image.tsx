import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#fff",
          fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#06b6d4",
            marginBottom: 32,
            letterSpacing: -2,
          }}
        >
          Zaur's Portfolio
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 500,
            color: "#fff",
            opacity: 0.85,
            letterSpacing: 0,
          }}
        >
          Webentwicklung & Projekte
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

export default function OpenGraphImage() {
  return (
    <div>
      {/* Platzhalter für OpenGraph Image */}
      <h1>OpenGraph Image</h1>
    </div>
  );
} 