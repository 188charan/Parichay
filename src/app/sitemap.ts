import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/profile";
import { systemDetails, projectDetails } from "@/data/detailPages";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const detailRoutes: MetadataRoute.Sitemap = [
    ...systemDetails.map((d) => ({
      url: `${siteUrl}/systems/${d.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...projectDetails.map((d) => ({
      url: `${siteUrl}/projects/${d.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...detailRoutes,
  ];
}
