/**
 * Trekking / nature exploration passion.
 *
 * Drop trek poster images in public/assets/treks/ using the `image` filenames
 * below (e.g. kumara-parvatha.jpg). Missing images fall back to a styled
 * placeholder automatically. Only details you provided are used — no invented
 * elevations or stats.
 */

export const treksIntro = {
  eyebrow: "Into the wild",
  heading: ["PEAKS", "OVER PIXELS"],
  supporting:
    "When I'm not shipping systems, I'm on a trail. I've trekked 15+ summits across South India — including its toughest.",
  count: 15,
  countLabel: "peaks trekked",
  bridge: "Every climb is a system: read the terrain, pace the effort, reach the summit.",
} as const;

export interface Trek {
  id: string;
  name: string;
  /** File in public/assets/treks/ (e.g. "kumara-parvatha.jpg"). */
  image: string;
  /** Short descriptor — kept factual to what was shared. */
  note: string;
  /** Marks the flagship / hardest trek for extra visual weight. */
  flagship?: boolean;
  /** Optional tag, e.g. difficulty. */
  tag?: string;
}

export const treks: Trek[] = [
  {
    id: "kumara-parvatha",
    name: "Kumara Parvatha",
    image: "/assets/treks/kumara-parvatha.jpg",
    note: "South India's most difficult trek.",
    tag: "Toughest",
    flagship: true,
  },
  {
    id: "netravathi",
    name: "Netravathi",
    image: "/assets/treks/netravathi.webp",
    note: "Rolling grassland ridges.",
  },
  {
    id: "bandaje",
    name: "Bandaje Falls",
    image: "/assets/treks/bandaje-falls.jpeg",
    note: "Waterfall trail through the Ghats.",
  },
  {
    id: "shivagange",
    name: "Shivagange",
    image: "/assets/treks/shivagange.jpeg",
    note: "Sacred hill climb near Bengaluru.",
  },
];

/** There are more beyond the named ones. */
export const treksMore = "…and many more across the Western Ghats.";
