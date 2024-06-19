// export const extendedGcd = (a: number, b: number) => {
//   const smaller = Math.min(a, b);
//   const greater = Math.max(a, b);

//   let old_r = smaller;
//   let r = greater;
//   let old_s = 1;
//   let s = 0;
//   let old_t = 0;
//   let t = 1;

//   while (r !== 0) {
//     const quotient = Math.floor(old_r / r);
//     [old_r, r] = [r, old_r - quotient * r];
//     [old_s, s] = [s, old_s - quotient * s];
//     [old_t, t] = [t, old_t - quotient * t];
//   }

//   return { gcd: old_r, x: old_s, y: old_t };
// };

export const extendedGcdBigInt = (a: number | bigint, b: number | bigint) => {
  let old_r = BigInt(a);
  let r = BigInt(b);
  let old_s = BigInt(1);
  let s = BigInt(0);
  let old_t = BigInt(0);
  let t = BigInt(1);

  while (r !== BigInt(0)) {
    const quotient = old_r / r;
    [old_r, r] = [r, old_r - quotient * r];
    [old_s, s] = [s, old_s - quotient * s];
    [old_t, t] = [t, old_t - quotient * t];
  }

  return { gcd: old_r, x: old_s, y: old_t };
};

export const modInverseBigInt = (e: number | bigint, phi: number | bigint) => {
  const result = extendedGcdBigInt(e, phi);
  if (result.gcd !== BigInt(1)) {
    throw new Error("e i phi nie są względnie pierwsze");
  }
  console.log("result", result);
  return ((result.x % BigInt(phi)) + BigInt(phi)) % BigInt(phi);
};
