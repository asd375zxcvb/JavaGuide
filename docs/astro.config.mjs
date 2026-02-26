// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import remarkRewriteMdLinks from "./src/plugins/remark-rewrite-md-links.mjs";

const site = process.env.ASTRO_SITE ?? "http://localhost:4321";
const base = process.env.ASTRO_BASE ?? "/";

// https://astro.build/config
export default defineConfig({
  site,
  base,
  markdown: {
    remarkPlugins: [remarkRewriteMdLinks],
  },
  integrations: [
    starlight({
      title: "JavaGuide",
      description: "JavaGuide documentation powered by Astro Starlight.",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/Snailclimb/JavaGuide",
        },
      ],
      markdown: {
        processedDirs: ["."],
      },
      sidebar: [
        {
          label: "Home",
          slug: "index",
        },
        {
          label: "JavaGuide",
          autogenerate: { directory: "javaguide" },
        },
        {
          label: "Interview Preparation",
          autogenerate: { directory: "interview-preparation" },
        },
        {
          label: "Java",
          autogenerate: { directory: "java" },
        },
        {
          label: "CS Basics",
          autogenerate: { directory: "cs-basics" },
        },
        {
          label: "Database",
          autogenerate: { directory: "database" },
        },
        {
          label: "Tools",
          autogenerate: { directory: "tools" },
        },
        {
          label: "System Design",
          autogenerate: { directory: "system-design" },
        },
        {
          label: "Distributed System",
          autogenerate: { directory: "distributed-system" },
        },
        {
          label: "High Performance",
          autogenerate: { directory: "high-performance" },
        },
        {
          label: "High Availability",
          autogenerate: { directory: "high-availability" },
        },
        {
          label: "Books",
          autogenerate: { directory: "books" },
        },
        {
          label: "About The Author",
          autogenerate: { directory: "about-the-author" },
        },
        {
          label: "Open Source Project",
          autogenerate: { directory: "open-source-project" },
        },
        {
          label: "High Quality Articles",
          autogenerate: { directory: "high-quality-technical-articles" },
        },
        {
          label: "Zhuanlan",
          autogenerate: { directory: "zhuanlan" },
        },
      ],
    }),
  ],
});
