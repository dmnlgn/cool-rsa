import { MathJax, MathJaxContext } from "better-react-mathjax";
import React, { useEffect, type FC } from "react";
import { powerMod } from "@/utils/powerMod";

interface IDashboardEncrypt {
  cResult: number;
  dValue: number;
  nValue: number;
}

const DashboardDecrypt: FC<IDashboardEncrypt> = ({
  cResult,
  dValue,
  nValue,
}) => {
  console.log("dValue", dValue);

  const decryptC = Number(powerMod(cResult, dValue, nValue));

  return (
    <div>
      <div className="flex flex-col gap-2 items-baseline mt-2">
        <div className="mt-1">
          <MathJaxContext>
            <MathJax className="text-[14px]">{`\\(C = ${cResult}\\)`}</MathJax>
            <MathJax className="text-[14px] mt-1">{`\\(M = c^d \\: (mod\\: \\varphi(n))\\)`}</MathJax>
            <MathJax className="text-[14px] mt-1">{`\\(M = ${cResult}^{${dValue}} \\: (mod\\: ${nValue})\\)`}</MathJax>
            <MathJax className="text-[14px] mt-1">{`\\(M = ${decryptC}\\)`}</MathJax>
          </MathJaxContext>
        </div>
      </div>
      <div className="flex gap-2 items-baseline mt-2">
        <label className="text-[14px]">Wartość M</label>
        <div className="w-full flex-1">
          <input
            className="w-full flex-1 border border-solid rounded-[5px] border-cGray100 px-[5px] py-[2px] text-[14px] focus-visible:outline-none"
            disabled={true}
            value={decryptC ?? 0}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardDecrypt;
