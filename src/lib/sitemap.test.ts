import { describe, expect, it } from "vitest";
import { buildSitemapXml, getSitemapEntries } from "./sitemap";

describe("sitemap", () => {
  it("includes the public home page and excludes non-public routes", () => {
    const entries = getSitemapEntries("https://www.wazeewamazingira.org");

    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({
      loc: "https://www.wazeewamazingira.org/",
      changefreq: "weekly",
      priority: "1.0",
    });
  });

  it("builds a valid sitemap xml document", () => {
    const xml = buildSitemapXml("https://www.wazeewamazingira.org");

    expect(xml).toContain("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
    expect(xml).toContain("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">");
    expect(xml).toContain("<loc>https://www.wazeewamazingira.org/</loc>");
  });
});
