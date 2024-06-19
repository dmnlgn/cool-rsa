export const isPrime = (num: number) => {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
    if (num % i === 0) return false;
  }
  return num > 1;
};

// export const isPrime = (num: number) => {
//   if (!num) {
//     return false;
//   }
//   const bigNum = BigInt(num);

//   if (bigNum <= BigInt(1)) return false;
//   if (bigNum === BigInt(2)) return true;
//   if (bigNum % BigInt(2) === BigInt(0)) return false;

//   const sqrt = sqrtBigInt(bigNum);

//   for (let i = BigInt(3); i <= sqrt; i += BigInt(2)) {
//     if (bigNum % i === BigInt(0)) return false;
//   }

//   return true;
// };

// function sqrtBigInt(value) {
//   if (value < 0n) {
//     throw "square root of negative numbers is not supported";
//   }

//   if (value < 2n) {
//     return value;
//   }

//   function newtonIteration(n, x0) {
//     const x1 = (n / x0 + x0) >> 1n;
//     if (x0 === x1 || x0 === x1 - 1n) {
//       return x0;
//     }
//     return newtonIteration(n, x1);
//   }

//   return newtonIteration(value, 1n);
// }
