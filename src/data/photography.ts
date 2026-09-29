/**
 * Macro photography passion — capturing insects up close.
 *
 * Drop your photos in public/assets/macro/ and list them below (filename +
 * short caption). Any entry whose image is missing shows a clean placeholder
 * tile automatically, so the gallery looks intentional before photos are added.
 *
 * Suggested filenames: macro-01.jpg, macro-02.jpg, … (any web image format).
 */

export const photography = {
  eyebrow: "Beyond the code",
  heading: ["MACRO", "WORLDS"],
  supporting:
    "Off the keyboard, I photograph the miniature world — insects, up close. Patience, precision, and a sharp eye for detail, the same instincts I bring to systems.",
  count: 100,
  countLabel: "insects captured",
  note: "A hobby in patience: waiting for the moment, nailing the focus, respecting the subject.",
} as const;

export interface MacroShot {
  /** File in public/assets/macro/ — e.g. "macro-01.jpg". */
  src: string;
  /** Short caption / subject. */
  caption: string;
}

/**
 * Replace/extend with your real photos. Leave `src` pointing at the intended
 * filename even before you upload — the placeholder handles missing files.
 */
export const macroShots: MacroShot[] = [
  { src: "/assets/macro/macro-01.jpeg", caption: "Blowfly" },
  { src: "/assets/macro/macro-02.jpeg", caption: "Robber fly" },
  { src: "/assets/macro/macro-03.jpeg", caption: "Caterpillar" },
  { src: "/assets/macro/macro-04.jpeg", caption: "Long-legged fly" },
  { src: "/assets/macro/macro-05.jpeg", caption: "Assassin bug" },
  { src: "/assets/macro/macro-06.jpeg", caption: "Jumping spider" },
  { src: "/assets/macro/macro-07.jpeg", caption: "Grass yellow butterfly" },
  { src: "/assets/macro/macro-08.jpeg", caption: "Earwig" },
];
