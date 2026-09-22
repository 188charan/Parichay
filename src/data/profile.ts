/**
 * Core identity + contact configuration.
 *
 * IMPORTANT: Real contact details are used exactly as provided. Social/profile
 * URLs that were NOT provided are left as empty placeholders below — fill them
 * in and the UI will automatically render the links. Empty entries are hidden.
 */

export const siteUrl = "https://charannn.dev";

export const profile = {
  name: "Charan N N",
  title: "Full Stack Developer",
  positioning: "Fintech × AI × Systems",
  location: "Bengaluru, India",
  tagline: "Building production systems that move data, money, and decisions.",
  intro:
    "Full Stack Developer building scalable fintech platforms, AI-powered systems, and production-grade engineering solutions.",
  experienceYears: "2+",
} as const;

/**
 * Contact + links.
 * `href` values marked as "" are placeholders — add the real URLs later.
 * The contact UI skips any link whose href is empty.
 */
export const contact = {
  email: "charan.nn003@gmail.com",
  phone: "9148728825",
  links: [
    { label: "Email", key: "email", href: "mailto:charan.nn003@gmail.com" },
    // TODO: add real profile URLs — placeholders below are intentionally empty.
    { label: "GitHub", key: "github", href: "" },
    { label: "LinkedIn", key: "linkedin", href: "" },
    { label: "LeetCode", key: "leetcode", href: "" },
    // Place resume.pdf in /public to enable this link.
    { label: "Resume", key: "resume", href: "/resume.pdf" },
  ],
} as const;

export type ContactLink = (typeof contact.links)[number];
