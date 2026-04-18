import { MetadataRoute } from "next";

const BASE_URL = "https://brandwerkx.de";
const locales = ["de", "en"] as const;

const routes = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/leistungen", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/projekte", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/projekte/zaira-beauty", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/ueber-mich", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/kontakt", priority: 0.7, changeFrequency: "yearly" as const },
  { path: "/impressum", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/datenschutz", priority: 0.2, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${BASE_URL}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    }
  }

  return entries;
}
