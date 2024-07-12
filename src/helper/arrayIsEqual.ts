export function arrayIsEqual(
  a: string[] | undefined,
  b: string[] | undefined
): boolean {
  if (!a || !b) return false;
  return a.length === b.length && a.every((el, index) => el === b[index]);
}
