// // const multiplyValues = (multipliers: [], values: []) => {
// //   //   const result = {};

// //   if (!multipliers.length || !values.length) {
// //     return [];
// //   }

// //   let result = 0;
// //   // Iterate through multipliers array
// //   multipliers.forEach((multiplierObj, index) => {
// //     // Extract key and multiplier value
// //     const [key, multiplier] = Object.entries(multiplierObj)[0];
// //     const valueObj = values.find((valueObj) => valueObj[key]);

// //     if (valueObj) {
// //       console.log("---------------------------");
// //       console.log("valueObj[key]", valueObj[key]);
// //       console.log("multiplier", multiplier);
// //       result = result + valueObj[key] * multiplier;
// //     }

// //     // values.forEach((valuesObj, valIndex) => {
// //     //   const [valuesKey, valuesMultiplier] = Object.entries(valuesObj)[valIndex];

// //     //   console.log("valuesKey", valuesKey);
// //     //   console.log("valuesMultiplier", valuesMultiplier);
// //     // });

// //     // Find the corresponding value in values array
// //   });

// //   return result;
// // };

// // export const powerMod = (base: number, exponent: number, modulus: number) => {
// //   if (modulus === 1) return 0;
// //   const result = 1;

// //   let preExponent = 1;
// //   const preValues = [];
// //   const preModResult = [];

// //   const fractModulos = [];

// //   let currentModulos = base ** preExponent % modulus;
// //   for (let i = 0; i < exponent; i++) {
// //     currentModulos = currentModulos ** preExponent % modulus;

// //     if (Number.isNaN(currentModulos)) {
// //       break;
// //     }

// //     if (currentModulos === 0) {
// //       continue;
// //     }

// //     preModResult.push(preExponent);
// //     preValues.push(currentModulos);

// //     fractModulos.push({
// //       [preExponent]: currentModulos,
// //     });

// //     // if (currentModulos <= 1) {
// //     //   break;
// //     // }

// //     preExponent *= 2;
// //   }

// //   const test = [];
// //   let newExponent = exponent;
// //   let newExponentModulo = 1;
// //   for (let j = preModResult.length - 1; j >= 0; j--) {
// //     const currentPreMod = preModResult[j];

// //     if (currentPreMod > newExponent) {
// //       continue;
// //     }

// //     newExponentModulo = newExponent % currentPreMod;
// //     newExponent = newExponent / currentPreMod;

// //     if (Math.ceil(newExponent) < 1) {
// //       continue;
// //     }

// //     if (newExponent === 0) {
// //       continue;
// //     }

// //     test.push({
// //       [currentPreMod]: Math.floor(newExponent),
// //     });
// //     newExponent = newExponentModulo;
// //   }

// //   //   for (const element of test) {
// //   //     const elementKey = Object.keys(element);
// //   //     console.log("elementKey", elementKey);
// //   //     // console.log("value", value);
// //   //   }

// //   const multipliedValues: number = multiplyValues(test, fractModulos);

// //   if (multipliedValues) {
// //     const XD = multipliedValues % modulus;

// //     console.log("XD", XD);
// //   }

// //   console.log("XDDDDDDDDDDDDDDDDD multipliedValues", multipliedValues);
// //   console.log("test", test);
// //   console.log("preModResult", preModResult);
// //   console.log("preValues", preValues);
// //   console.log("fractModulos", fractModulos);

// //   //   while (exponent > 0) {
// //   //     if (exponent % 2 === 1) result = (result * base) % modulus;
// //   //     exponent = exponent >> 1;
// //   //     base = (base * base) % modulus;
// //   //   }

// //   //   console.log(preValues); // Wyświetlenie wartości pośrednich
// //   return result;
// // };

// const multiplyValues = (multipliers, values) => {
//   if (!multipliers.length || !values.length) {
//     return [];
//   }

//   let result = 0;
//   // Iterate through multipliers array
//   multipliers.forEach((multiplierObj, index) => {
//     // Extract key and multiplier value
//     const [key, multiplier] = Object.entries(multiplierObj)[0];
//     const valueObj = values.find((valueObj) => valueObj[key]);

//     if (valueObj) {
//       console.log("---------------------------");
//       console.log("valueObj[key]", valueObj[key]);
//       console.log("multiplier", multiplier);
//       result = result + valueObj[key] * multiplier;
//     }
//   });

//   return result;
// };

// const powerMod = (base, exponent, modulus) => {
//   if (modulus === 1) return 0;
//   let result = 1;
//   base = base % modulus;

//   while (exponent > 0) {
//     if (exponent % 2 === 1) {
//       result = (result * base) % modulus;
//     }
//     exponent = Math.floor(exponent / 2);
//     base = (base * base) % modulus;
//   }

//   return result;
// };

export const powerMod = (base: number, exponent: number, modulus: number) => {
  //   if (modulus === 1) return 0;
  //   let result = 1;
  //   base = base % modulus;

  //   while (exponent > 0) {
  //     if (exponent % 2 === 1) {
  //       result = (result * base) % modulus;
  //     }
  //     exponent = Math.floor(exponent / 2);
  //     base = (base * base) % modulus;
  //   }

  //   return result;
  // Convert inputs to BigInt
  if (base && exponent && modulus) {
    base = BigInt(base);
    exponent = BigInt(exponent);
    modulus = BigInt(modulus);

    if (modulus === BigInt(1)) return BigInt(0);
    let result = BigInt(1);
    base = base % modulus;

    while (exponent > 0) {
      if (exponent % BigInt(2) === BigInt(1)) {
        result = (result * base) % modulus;
      }
      exponent = exponent / BigInt(2);
      base = (base * base) % modulus;
    }

    return result;
  }
  return 0;
};
