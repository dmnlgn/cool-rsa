import { yupResolver } from "@hookform/resolvers/yup";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import React, { useEffect, useState, type FC } from "react";
import { useForm, type Control, type FieldValues } from "react-hook-form";
import type { IRsaData, IRsaFormData } from "@/pages/DashboardPage/types";
import InputController from "@/components/Input/InputController";
import Loader from "@/components/Loader/Loader";
import { schema } from "@/pages/DashboardPage/DashboardForm/formSchema";

import { extendedGcdBigInt, modInverseBigInt } from "@/utils/extendedGcd";
import { GCD } from "@/utils/gcd";

export const calculateDValue = (phi: number, e: number) => {
  let d_value = 0;
  let i = 1;
  console.log("e", e);
  console.log("phi", phi);
  while (true) {
    //d = (k * Ø + 1)/e,
    d_value = (i * phi + 1) / e;
    console.log("index", i);
    console.log("d_value", d_value);
    if (Number.isInteger(d_value) || i > phi) {
      break;
    }

    i++;
  }
};

interface IDashboardForm {
  setRsaData: (data: IRsaData) => void;
}

const DashboardForm: FC<IDashboardForm> = ({ setRsaData }) => {
  const [ePotentialValues, setEPotentialValues] = useState<number[]>([]);
  const [isLoadingPotentialValues, setIsLoadingPotentialValues] =
    useState(false);

  const {
    watch,
    control,
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver<IRsaFormData>(schema),
  });
  const onSubmit = (data: IRsaFormData) => {
    console.log("data.pValue", data.pValue);
    console.log("data.pValue", data.qValue);
    console.log("pValue", pValue);
    console.log("qValue", qValue);

    const phi = (data.pValue - 1) * (data.qValue - 1);
    // const gcd = extendedGcd(~~phi, ~~eValue);
    // const dValue = ((gcd.x % phi) + phi) % phi;

    // const phi = (~~data.pValue - 1) * (~~data.pValue - 1);
    // const gcd = extendedGcdBigInt(~~phi, ~~eValue);

    // console.log("gcd", gcd);

    // const gcdX = Number(gcd.x);
    // const dValue = ((gcdX % phi) + phi) % phi;

    const dValue = modInverseBigInt(eValue, phi);

    // const gcd = extendedGcdBigInt(~~phi, ~~eValue);
    // const gcdX = Number(gcd.x);
    // const dValue = ((gcdX % phi) + phi) % phi;

    setRsaData({
      pValue: Number(data.pValue),
      qValue: Number(data.qValue),
      eValue: Number(data.eValue),
      mValue: Number(data.mValue),
      dValue: Number(dValue),
      nValue: Number(data.pValue * ~~data.qValue),
      phiValue: Number(phi),
    });
  };

  const pValue = ~~watch("pValue");
  const qValue = ~~watch("qValue");
  const eValue = ~~watch("eValue");

  const calculateRelativePrimeNumber = async (phi: number) => {
    setIsLoadingPotentialValues(true);
    try {
      const ePotentialValues = [];
      for (let i = 2; i < phi; i++) {
        if (GCD(phi, i) === 1) {
          ePotentialValues.push(i);
        }
        if (i > 10000) {
          break;
        }
      }
      return ePotentialValues;
    } catch (error) {
      return [];
    } finally {
      setIsLoadingPotentialValues(false);
    }
  };

  useEffect(() => {
    resetField("eValue");
    resetField("mValue");
  }, [pValue, qValue]);

  useEffect(() => {
    const calculateEPotentialValues = async () => {
      const phi = (pValue - 1) * (qValue - 1);
      if (pValue && qValue && !errors.pValue && !errors.qValue) {
        try {
          const result = await calculateRelativePrimeNumber(phi);
          setEPotentialValues(result);
        } catch (error) {
          console.error("Error calculating ePotentialValues:", error);
          setEPotentialValues([]);
        } finally {
          setIsLoadingPotentialValues(false);
        }
      } else {
        setEPotentialValues([]);
        setIsLoadingPotentialValues(false);
      }
    };

    if (pValue && qValue && !errors.pValue && !errors.qValue) {
      setIsLoadingPotentialValues(true);
      setTimeout(() => {
        calculateEPotentialValues();
      }, 500);
    }
  }, [pValue, qValue, errors.pValue, errors.qValue]);

  const renderPreValues = () => {
    if (pValue && qValue && !errors.pValue && !errors.qValue) {
      return (
        <div className="flex flex-col gap-2 items-baseline mt-2">
          <div className="mt-1">
            <MathJaxContext>
              <MathJax className="text-[14px]">{`\\(p = ${pValue}\\)`}</MathJax>
              <MathJax className="text-[14px] mt-1">{`\\(q = ${qValue}\\)`}</MathJax>
            </MathJaxContext>
          </div>
          <div className="mt-1">
            <MathJaxContext>
              <MathJax className="text-[14px] mt-1">{`\\(n = ${pValue} * ${qValue} = ${pValue * qValue}\\)`}</MathJax>
              <MathJax className="text-[14px] mt-1">{`\\(\\varphi(n) = (${pValue} - 1) * (${qValue} - 1) = ${(pValue - 1) * (qValue - 1)}\\)`}</MathJax>
            </MathJaxContext>
          </div>
          <div className="mt-1">
            <MathJaxContext>
              <MathJax className="text-[14px] mt-1">{`\\(NWD(\\varphi(n), e) = 1\\:  \\land\\:  1 < e < \\varphi(n) \\)`}</MathJax>
            </MathJaxContext>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderPotentialValues = () => {
    if (isLoadingPotentialValues) {
      return (
        <div className="justify-center flex mt-2">
          <Loader />
        </div>
      );
    }

    return (
      <>
        <div className="mt-3">
          <p className="text-[14px] font-semibold">
            Potencjalne liczby e (pierwsze {ePotentialValues.length} wyników)
          </p>
          <textarea
            className="mt-1 border border-solid border-cGray100 rounded-[5px] w-full focus-visible:outline-none px-[5px] py-[2px] text-[14px] min-h-[70px] max-h-[200px] overflow-y-auto"
            disabled
            value={ePotentialValues?.join(", ") ?? null}
            rows={4}
          />
        </div>
      </>
    );
  };

  const renderDValue = () => {
    if (
      !errors.eValue &&
      !errors.pValue &&
      !errors.qValue &&
      eValue &&
      pValue &&
      qValue
    ) {
      const phi = (pValue - 1) * (qValue - 1);
      const gcd = extendedGcdBigInt(~~phi, ~~eValue);
      const gcdX = Number(gcd.x);
      const dValue = ((gcdX % phi) + phi) % phi;

      return (
        <div className="flex flex-col gap-2 items-baseline mt-2">
          <div className="mt-1">
            <MathJaxContext>
              <MathJax className="text-[14px]">{`\\(d*e\\: mod\\:\\varphi(n) = 1  \\)`}</MathJax>
              {dValue && (
                <MathJax className="text-[14px] mt-1">{`\\(d = ${dValue} \\)`}</MathJax>
              )}
            </MathJaxContext>
          </div>
        </div>
      );
    }

    return null;
  };

  console.log("errors", errors);

  return (
    <div className="block mt-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-2 items-baseline">
          <label className="text-[14px]">Podaj wartość p</label>
          <div className="w-full flex-1">
            <InputController
              register={register}
              control={control as unknown as Control<FieldValues>}
              name="pValue"
              error={!!errors?.pValue}
              inputType="number"
              maxLength={5}
            />
            {!!errors && errors["pValue"] && (
              <p className="form-label-error">{errors["pValue"].message}</p>
            )}
          </div>
        </div>
        <div className="flex gap-2 items-baseline mt-2">
          <label className="text-[14px]">Podaj wartość q</label>
          <div className="w-full flex-1">
            <InputController
              register={register}
              control={control as unknown as Control<FieldValues>}
              name="qValue"
              error={!!errors?.qValue}
              inputType="number"
              maxLength={5}
            />
            {!!errors && errors["qValue"] && (
              <p className="form-label-error">{errors["qValue"].message}</p>
            )}
          </div>
        </div>
        {renderPreValues()}
        {renderPotentialValues()}
        <div className="flex flex-col items-baseline mt-0">
          <label className="text-[14px]">Podaj wartość e</label>
          <div className="w-full flex-1 mt-1">
            <InputController
              register={register}
              control={control as unknown as Control<FieldValues>}
              name="eValue"
              error={!!errors?.eValue}
              inputType="number"
              maxLength={5}
            />
            {!!errors && errors["eValue"] && (
              <p className="form-label-error">{errors["eValue"].message}</p>
            )}
          </div>
        </div>
        {renderDValue()}
        <div className="flex items-baseline mt-2 flex-col">
          <label className="text-[14px]">{`Wiadomość do zakodowania`}</label>
          <div className="w-full flex-1 mt-1">
            <InputController
              register={register}
              control={control as unknown as Control<FieldValues>}
              name="mValue"
              error={!!errors?.mValue}
              inputType="number"
            />
            {!!errors && errors["mValue"] && (
              <p className="form-label-error">{errors["mValue"].message}</p>
            )}
          </div>
        </div>
        <button className="rsa-button mt-4 bg-cOrange100 text-white transition ease-in-out duration-300 hover:bg-cOrange200">
          Szyfruj/odszyfruj
        </button>
      </form>
    </div>
  );
};

export default DashboardForm;
