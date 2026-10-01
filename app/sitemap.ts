import { MetadataRoute } from "next";
import { SITE_URL, SITEMAP_LAST_MODIFIED } from "../lib/seo";

const locales = ["de", "en"] as const;

// Rechtsseiten sind noindex und gehören nicht in die Sitemap.
const routes = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/leistungen", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/projekte", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/projekte/zaira-beauty", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/ueber-mich", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/kontakt", priority: 0.7, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(SITEMAP_LAST_MODIFIED);
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${SITE_URL}/${locale}${route.path}`,
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    }
  }

  return entries;
}
