import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BrandWerkX – Webdesign aus Geretsried";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#fff",
          fontFamily: "Inter, Segoe UI, Arial, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            color: "#00ffe7",
            marginBottom: 28,
            letterSpacing: -3,
          }}
        >
          BrandWerkX
        </div>
        <div style={{ fontSize: 44, fontWeight: 600, opacity: 0.92 }}>
          Websites für Handwerker & kleine Unternehmen
        </div>
        <div style={{ fontSize: 30, fontWeight: 500, opacity: 0.6, marginTop: 24 }}>
          Webdesign aus Geretsried · ab 490 €
        </div>
      </div>
    ),
    size
  );
}
