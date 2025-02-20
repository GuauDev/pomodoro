import clsx from "clsx";
import { useState } from "react";

export const SettingsComponentSwitch = ({
  title,
  state,
  colorMode,
}: {
  title: string;
  colorMode: "light" | "dark";
  state: "focus" | "short break" | "long break";
}) => {
  const [isOn, setIsOn] = useState(false);
  return (
    <div className="flex items-center justify-between py-[20px]">
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

      <button
        onClick={() => setIsOn(!isOn)}
        className={clsx(
          `flex h-[20px] w-[34px] cursor-pointer items-center rounded-full p-[2px] transition duration-300`,
          {
            "bg-white-alpha-200": !isOn && colorMode === "dark",
            "bg-white-alpha-900": isOn && colorMode === "dark",
            "bg-black-alpha-200": !isOn && colorMode === "light",
            "bg-black-alpha-900": isOn && colorMode === "light",
          },
        )}
      >
        <div
          className={clsx(
            `flex h-[16px] w-[16px] transform rounded-full bg-black duration-300`,
            {
              "translate-x-[14px]": isOn,
            },
            {
              "bg-red-950": state === "focus" && colorMode === "dark",
              "bg-green-950": state === "short break" && colorMode === "dark",
              "bg-blue-950": state === "long break" && colorMode === "dark",
              "bg-red-50": state === "focus" && colorMode === "light",
              "bg-green-50": state === "short break" && colorMode === "light",
              "bg-blue-50": state === "long break" && colorMode === "light",
            },
          )}
        />
      </button>
    </div>
  );
};
