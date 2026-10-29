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
  tagline:
    "Full Stack Developer building production fintech systems, AI workflows, and infrastructure that scale beyond the prototype.",
  intro:
    "Full Stack Developer building scalable fintech platforms, AI-powered systems, and production-grade engineering solutions.",
  experienceYears: "2+",
  /**
   * Avatar sticker shown in the Contact section. Drop your image at this path
   * (public/assets/avatar/charan.png). Until it exists, a styled placeholder
   * with your initials is shown automatically.
   */
  avatar: "/assets/avatar/charan.png",
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
    { label: "GitHub", key: "github", href: "https://github.com/188charan?tab=repositories" },
    { label: "LinkedIn", key: "linkedin", href: "https://www.linkedin.com/in/charan-nn-84b41624b/" },
    { label: "LeetCode", key: "leetcode", href: "https://leetcode.com/u/user0715lK/" },
    // Resume is served from /public and opens in a new tab (view + download).
    { label: "Resume", key: "resume", href: "/assets/resume/charan-nn-resume.pdf" },
  ],
} as const;

export type ContactLink = (typeof contact.links)[number];
