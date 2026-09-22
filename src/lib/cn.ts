/**
 * Minimal className combiner. Filters falsy values and joins with spaces.
 * Avoids an extra dependency for a project that doesn't need conditional
 * class merging beyond this.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
