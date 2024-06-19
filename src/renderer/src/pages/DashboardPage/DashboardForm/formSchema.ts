import * as yup from "yup";
import { dictionary } from "@/dictionary/dictionary";
import { GCD } from "@/utils/gcd";
import { isPrime } from "@/utils/isPrime";

declare module "yup" {
  interface NumberSchema {
    isPrime(errorMessage?: string): this;
  }
}

yup.addMethod(yup.number, "isPrime", function (errorMessage) {
  return this.test(`test-card-type`, errorMessage, function (value) {
    const { path, createError } = this;

    return isPrime(value ?? 0) || createError({ path, message: errorMessage });
  });
});

export const schema = yup
  .object({
    pValue: yup
      .number()
      .integer()
      .required(dictionary.rsa.form.typeError)
      .typeError((props) => !props.value && dictionary.rsa.form.typeError)
      .positive(dictionary.rsa.form.errorNumberPositive)
      .isPrime(dictionary.rsa.form.errorNumberPrime)
      .max(9999999999, dictionary.rsa.form.errorNumberAmount10),
    qValue: yup
      .number()
      .integer()
      .required(dictionary.rsa.form.typeError)
      .typeError((props) => !props.value && dictionary.rsa.form.typeError)
      .positive(dictionary.rsa.form.errorNumberPositive)
      .isPrime(dictionary.rsa.form.errorNumberPrime)
      .max(9999999999, dictionary.rsa.form.errorNumberAmount10),
    eValue: yup
      .number()
      .integer()
      .required(dictionary.rsa.form.typeError)
      .typeError((props) => !props.value && dictionary.rsa.form.typeError)
      .positive(dictionary.rsa.form.errorNumberPositive)
      .when(["qValue", "pValue"], ([qValue, pValue], schema, eValue) => {
        if (!qValue || !pValue) {
          return schema.required(dictionary.rsa.form.errorNumberNotFound);
        }

        const eValueYup = ~~eValue.value;
        const phi = (qValue - 1) * (pValue - 1);

        const isRelativePrime = GCD(phi, eValueYup) === 1;

        if (!eValueYup) {
          return schema.test(
            "is-no-data",
            dictionary.rsa.form.typeError,
            () => false
          );
        }

        if (eValueYup >= phi) {
          return schema.test(
            "is-more-than-phi",
            dictionary.rsa.form.errorNumberMoreThanPhi,
            () => false
          );
        }

        if (eValueYup <= 1) {
          return schema.test(
            "is-lower-than-one",
            dictionary.rsa.form.errorNumberLowerThanOne,
            () => false
          );
        }

        if (!isRelativePrime) {
          return schema.test(
            "is-relative-prime",
            dictionary.rsa.form.errorNumberNotRelativePrime,
            () => false
          );
        }

        return schema;
      }),
    mValue: yup
      .number()
      .integer()
      .required(dictionary.rsa.form.typeError)
      .typeError((props) => !props.value && dictionary.rsa.form.typeError)
      .when(["qValue", "pValue"], ([qValue, pValue], schema, mValue) => {
        if (!qValue || !pValue) {
          return schema.required(dictionary.rsa.form.errorNumberNotFound);
        }

        const parsedQValue = ~~qValue;
        const parsedPValue = ~~pValue;
        const parsedMValue = mValue.value;

        const nValue = parsedQValue * parsedPValue;

        if (!parsedMValue) {
          return schema.test(
            "is-no-data",
            dictionary.rsa.form.typeError,
            () => false
          );
        }

        if (parsedMValue >= nValue) {
          return schema.test(
            "is-more-than-n",
            dictionary.rsa.form.errorNumberGreaterThanN + ` (${nValue})`,
            () => false
          );
        }

        if (parsedMValue <= 1) {
          return schema.test(
            "is-lower-than-one",
            dictionary.rsa.form.errorNumberLowerThanOne,
            () => false
          );
        }

        return schema;
      }),
  })
  .required();
