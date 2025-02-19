import { useState } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "../../assets/icons";
import clsx from "clsx";

export function SettingsComponentNumber({
  title,
  colorMode,
  state,
}: {
  title: string;
  colorMode: "light" | "dark";
  state: "focus" | "short break" | "long break";
}) {
  const [value, setValue] = useState("25");
  const min = 0;
  const max = 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value.replace(/[^0-9]/g, "");
    if (newValue === "") newValue = "0";
    setValue(Math.min(Math.max(Number(newValue), min), max).toString());
  };

  return (
    <div className="flex items-center justify-between py-[12px]">
      <p
        className={clsx("text-text-regular font-text-regular", {
          "text-red-900": colorMode === "light" && state === "focus",
          "text-green-900": colorMode === "light" && state === "short break",
          "text-blue-900": colorMode === "light" && state === "long break",
          "text-red-50": colorMode === "dark" && state === "focus",
          "text-green-50": colorMode === "dark" && state === "short break",
          "text-blue-50": colorMode === "dark" && state === "long break",
        })}
      >
        {title}
      </p>
      <div
        className={clsx(
          "flex h-[40px] w-[96px] items-center rounded-[8px] border",
          {
            "border-white-alpha-100": colorMode === "dark",
            "border-black-alpha-100": colorMode === "light",
          },
        )}
      >
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className={clsx(
            "text-text-regular font-text-regular h-[40px] w-[65px] text-center outline-none",
            {
              "text-red-900 placeholder:text-red-900":
                colorMode === "light" && state === "focus",
              "text-green-900 placeholder:text-green-900":
                colorMode === "light" && state === "short break",
              "text-blue-900 placeholder:text-blue-900":
                colorMode === "light" && state === "long break",
              "text-red-50 placeholder:text-red-50":
                colorMode === "dark" && state === "focus",
              "text-green-50 placeholder:text-green-50":
                colorMode === "dark" && state === "short break",
              "text-blue-50 placeholder:text-blue-50":
                colorMode === "dark" && state === "long break",
            },
          )}
        />
        <div
          className={clsx("flex h-[38px] w-[29px] flex-col border-l", {
            "border-white-alpha-100 text-red-50":
              colorMode === "dark" && state === "focus",
            "border-white-alpha-100 text-green-50":
              colorMode === "dark" && state === "short break",
            "border-white-alpha-100 text-blue-50":
              colorMode === "dark" && state === "long break",
            "border-black-alpha-100 text-red-900":
              colorMode === "light" && state === "focus",
            "border-black-alpha-100 text-green-900":
              colorMode === "light" && state === "short break",
            "border-black-alpha-100 text-blue-900":
              colorMode === "light" && state === "long break",
          })}
        >
          <button
            onClick={() =>
              setValue((prev) => String(Math.min(Number(prev) + 1, max)))
            }
            className={clsx(
              "flex h-[20px] w-[28px] items-center justify-center border-b focus:outline-0",
              {
                "border-white-alpha-100": colorMode === "dark",
                "border-black-alpha-100": colorMode === "light",
              },
            )}
          >
            <ArrowUpIcon />
          </button>
          <button
            onClick={() =>
              setValue((prev) => String(Math.max(Number(prev) - 1, min)))
            }
            className="flex h-[20px] w-[29px] items-center justify-center focus:outline-0"
          >
            <ArrowDownIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
