/**
 * Navigation map for the progress rail. Rather than list all 21 section ids
 * (too dense), the rail exposes the major acts. Each entry points at the id of
 * the section that opens that act.
 */

export interface NavItem {
  id: string;
  label: string;
}

export const navItems: NavItem[] = [
  { id: "hero", label: "Intro" },
  { id: "what-i-do", label: "Thesis" },
  { id: "journey", label: "Journey" },
  { id: "spense", label: "Production" },
  { id: "db-optimization", label: "Storage" },
  { id: "impact", label: "Impact" },
  { id: "evolution", label: "Evolution" },
  { id: "ai", label: "AI Systems" },
  { id: "aadhaar", label: "Projects" },
  { id: "skills", label: "Craft" },
  { id: "contact", label: "Contact" },
];
