/**
 * DSA problem-solving stats. Numbers taken exactly from the spec.
 * No GitHub contribution graph or extra achievements are fabricated.
 */

export const dsa = {
  headline: ["1,200+ PROBLEMS.", "STILL SOLVING."],
  total: "1,200+",
  platforms: [
    {
      id: "leetcode",
      name: "LeetCode",
      total: 368,
      breakdown: [
        { label: "Easy", value: 151 },
        { label: "Medium", value: 198 },
        { label: "Hard", value: 19 },
      ],
      badge: "100-Day Streak Badge",
    },
    {
      id: "gfg",
      name: "GeeksforGeeks",
      total: 844,
      codingScore: 2500,
      breakdown: [],
      badge: null,
    },
  ],
} as const;
