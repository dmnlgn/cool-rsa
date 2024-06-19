export const powerMod = (
  base: number,
  exponent: number,
  modulus: number
): bigint => {
  if (base && exponent && modulus) {
    let baseBigInt: bigint = BigInt(base);
    let exponentBigInt: bigint = BigInt(exponent);
    const modulusBigInt: bigint = BigInt(modulus);

    if (modulusBigInt === BigInt(1)) return BigInt(0);
    let result: bigint = BigInt(1);
    baseBigInt = baseBigInt % modulusBigInt;

    while (exponentBigInt > BigInt(0)) {
      if (exponentBigInt % BigInt(2) === BigInt(1)) {
        result = (result * baseBigInt) % modulusBigInt;
      }
      exponentBigInt = exponentBigInt / BigInt(2);
      baseBigInt = (baseBigInt * baseBigInt) % modulusBigInt;
    }

    return result;
  }
  return BigInt(0);
};
