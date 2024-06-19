import React, { type FC, type ReactNode } from "react";

interface IIFormGroup {
  label?: string;
  children: ReactNode;
}

const FormGroup: FC<IIFormGroup> = ({ label, children }) => {
  return (
    <div className="flex gap-2 items-baseline">
      {!!label && <label className="text-[14px]">Podaj wartość p</label>}
      {children}
      
    </div>
  );
};

export default FormGroup;
