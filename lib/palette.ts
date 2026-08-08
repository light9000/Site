// The four signature colors pulled from the artwork that set the site's
// visual identity. Categories are assigned one of these on a stable
// rotation, so "infantil" is always the same color everywhere on the site,
// even as new categories get added later.
export const PALETTE = [
  { name: "terracotta", hex: "#b23a1d" },
  { name: "teal", hex: "#17685a" },
  { name: "amber", hex: "#d9a441" },
  { name: "maroon", hex: "#7a2320" },
] as const;

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function colorForCategory(category: string) {
  const index = hashString(category.toLowerCase().trim()) % PALETTE.length;
  return PALETTE[index];
}
