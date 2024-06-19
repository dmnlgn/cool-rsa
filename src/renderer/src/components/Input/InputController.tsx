import classNames from "classnames";
import React, { type ElementType, type FC } from "react";

import {
  type Control,
  Controller,
  type FieldValues,
  type UseFormRegister,
} from "react-hook-form";

interface IInputController {
  control: Control<FieldValues>;
  name: string;
  placeholder?: string;
  error: boolean;
  type?: ElementType;
  maxLength?: number;
  inputType?: string;
  register: UseFormRegister<any>;
}

const InputController: FC<IInputController> = ({
  control,
  name,
  placeholder,
  error,
  type = "input",
  maxLength,
  register,
  inputType,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
        switch (type) {
          case "input":
          default: {
            return (
              <input
                className={classNames(
                  "w-full flex-1 border border-solid rounded-[5px] border-cGray100 px-[5px] py-[2px] text-[14px] focus-visible:outline-none",
                  {
                    "border-red-600": !!error,
                  }
                )}
                placeholder={placeholder}
                aria-label={name}
                aria-describedby={name}
                value={value ?? ""}
                onChange={(event) => {
                  if (inputType === "number") {
                    if (
                      Number(event?.target?.value) ||
                      event?.target?.value === ""
                    ) {
                      onChange(event);
                    }
                  } else {
                    onChange(event);
                  }
                }}
                aria-invalid={error}
                maxLength={maxLength}
                {...(register && {
                  ref: register(name).ref,
                })}
                type={inputType ?? "text"}
              />
            );
          }
        }
      }}
    />
  );
};

export default InputController;
