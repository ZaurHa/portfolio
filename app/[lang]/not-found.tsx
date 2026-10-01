import NotFoundView from "../../components/v3/NotFoundView";

export const metadata = { title: "404 – Seite nicht gefunden", robots: { index: false, follow: true } };

export default function NotFound() {
  return <NotFoundView />;
}
