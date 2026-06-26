export type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: ChangeFrequency;
  priority: string;
}

interface PublicPageDefinition {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: string;
}

const PUBLIC_PAGES: PublicPageDefinition[] = [
  {
    path: "/",
    changeFrequency: "weekly",
    priority: "1.0",
  },
];

function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
}

export function getSiteBaseUrl(requestOrUrl?: Request | string): string {
  if (typeof requestOrUrl === "string") {
    return normalizeBaseUrl(new URL(requestOrUrl).origin);
  }

  if (requestOrUrl instanceof Request) {
    return normalizeBaseUrl(new URL(requestOrUrl.url).origin);
  }

  return "https://www.wazeewamazingira.org";
}

export function getSitemapEntries(baseUrl: string): SitemapEntry[] {
  const normalizedBaseUrl = normalizeBaseUrl(baseUrl);
  const lastmod = new Date().toISOString();

  return PUBLIC_PAGES.map(({ path, changeFrequency, priority }) => ({
    loc: new URL(path, `${normalizedBaseUrl}/`).toString(),
    lastmod,
    changefreq: changeFrequency,
    priority,
  }));
}

export function buildSitemapXml(baseUrl: string): string {
  const entries = getSitemapEntries(baseUrl);

  const xmlEntries = entries
    .map(
      (entry) => `  <url>\n    <loc>${entry.loc}</loc>\n    <lastmod>${entry.lastmod}</lastmod>\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlEntries}\n</urlset>\n`;
}
