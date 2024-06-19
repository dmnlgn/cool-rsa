import { MathJax, MathJaxContext } from "better-react-mathjax";
import React, { useEffect, type FC } from "react";
import { powerMod } from "@/utils/powerMod";

interface IDashboardEncrypt {
  mValue: number;
  eValue: number;
  nValue: number;
  setCResult: (data: number) => void;
}

const DashboardEncrypt: FC<IDashboardEncrypt> = ({
  mValue,
  eValue,
  nValue,
  setCResult,
}) => {
  const encryptC = Number(powerMod(mValue, eValue, nValue));

  useEffect(() => {
    setCResult(encryptC);
  }, [encryptC]);

  return (
    <div>
      <div className="flex flex-col gap-2 items-baseline mt-2">
        <div className="mt-1">
          <MathJaxContext>
            <MathJax className="text-[14px]">{`\\(M = ${mValue}\\)`}</MathJax>
            <MathJax className="text-[14px] mt-1">{`\\(C = m^e \\: (mod\\: \\varphi(n))\\)`}</MathJax>
            <MathJax className="text-[14px] mt-1">{`\\(C = ${mValue}^{${eValue}} \\: (mod\\: ${nValue})\\)`}</MathJax>
            <MathJax className="text-[14px] mt-1">{`\\(C = ${encryptC}\\)`}</MathJax>
          </MathJaxContext>
        </div>
      </div>
      <div className="flex flex-col items-baseline mt-2">
        <label className="text-[14px]">Zaszyfrowana wiadomość</label>
        <div className="w-full flex-1 mt-1">
          <input
            className="w-full flex-1 border border-solid rounded-[5px] border-cGray100 px-[5px] py-[2px] text-[14px] focus-visible:outline-none"
            disabled={true}
            value={encryptC ?? 0}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardEncrypt;
