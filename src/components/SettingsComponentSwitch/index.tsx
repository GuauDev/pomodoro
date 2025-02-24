import clsx from "clsx";
import { useRunningStore, useSettingsStore } from "../../lib/store";

export const SettingsComponentSwitch = ({
  title,
  isOn,
  setIsOn,
}: {
  title: string;
  isOn: boolean;
  setIsOn: (value: boolean) => void;
}) => {
  const { state } = useRunningStore();
  const { darkMode } = useSettingsStore();
  return (
    <div className="flex items-center justify-between py-[20px]">
      <p
        className={clsx("text-text-regular font-text-regular", {
          "text-red-900": darkMode === false && state === "focus",
          "text-green-900": darkMode === false && state === "short break",
          "text-blue-900": darkMode === false && state === "long break",
          "text-red-50": darkMode === true && state === "focus",
          "text-green-50": darkMode === true && state === "short break",
          "text-blue-50": darkMode === true && state === "long break",
        })}
      >
        {title}
      </p>

      <button
        onClick={() => setIsOn(!isOn)}
        className={clsx(
          `flex h-[20px] w-[34px] cursor-pointer items-center rounded-full p-[2px] transition duration-300`,
          {
            "bg-white-alpha-200": !isOn && darkMode === true,
            "bg-white-alpha-900": isOn && darkMode === true,
            "bg-black-alpha-200": !isOn && darkMode === false,
            "bg-black-alpha-900": isOn && darkMode === false,
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
              "bg-red-950": state === "focus" && darkMode === true,
              "bg-green-950": state === "short break" && darkMode === true,
              "bg-blue-950": state === "long break" && darkMode === true,
              "bg-red-50": state === "focus" && darkMode === false,
              "bg-green-50": state === "short break" && darkMode === false,
              "bg-blue-50": state === "long break" && darkMode === false,
            },
          )}
        />
      </button>
    </div>
  );
};
