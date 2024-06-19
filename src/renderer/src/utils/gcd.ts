export const GCD = (a: number, b: number) => {
  if (!a || typeof a !== "number" || !b || typeof b !== "number") {
    return -1;
  }

  const smaller = Math.min(a, b);
  let hcf = 1;

  for (let i = 1; i <= smaller; i++) {
    if (a % i === 0 && b % i === 0) {
      hcf = i;
    }
  }

  return hcf;
};
