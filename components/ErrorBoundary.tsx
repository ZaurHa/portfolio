"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  label?: string;
}

interface State {
  hasError: boolean;
  message: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    // In production, replace this with a proper error reporting service (e.g. Sentry)
    if (process.env.NODE_ENV === "development") {
      console.error(`[ErrorBoundary:${this.props.label ?? "unknown"}]`, error, info.componentStack);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 200,
            background: "#0a0a0a",
            border: "1px solid #1a1a1a",
            borderRadius: 12,
            padding: 24,
            textAlign: "center",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div>
            <div style={{ fontSize: 28, marginBottom: 12 }}>⚠️</div>
            <p style={{ color: "#666", fontSize: 14, margin: "0 0 8px" }}>
              {this.props.label
                ? `„${this.props.label}" konnte nicht geladen werden.`
                : "Ein Fehler ist aufgetreten."}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, message: "" })}
              style={{
                marginTop: 12,
                background: "#111",
                border: "1px solid #333",
                borderRadius: 8,
                padding: "7px 18px",
                color: "#aaa",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Nochmal versuchen
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
