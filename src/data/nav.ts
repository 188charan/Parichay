/**
 * Navigation map for the progress rail. Rather than list every section id
 * (too dense), the rail exposes the major acts. Each entry points at the id of
 * the section that opens that act. Deep case studies and projects live on
 * their own pages, so the rail links to the index sections that open them
 * (Production, Projects).
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
  { id: "impact", label: "Impact" },
  { id: "systems-optimize", label: "Optimize" },
  { id: "evolution", label: "Evolution" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Craft" },
  { id: "macro", label: "Photography" },
  { id: "treks", label: "Treks" },
  { id: "contact", label: "Contact" },
];
