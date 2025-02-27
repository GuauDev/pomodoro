import clsx from "clsx";
import { useRunningStore, useSettingsStore } from "../../lib/store";

export const ShortcutsComponent = ({
  shortcut,
  title,
}: {
  shortcut: string[];
  title: string;
}) => {
  const { state } = useRunningStore();
  const { darkMode } = useSettingsStore();
  return (
    <div className="flex items-center justify-between py-[15px]">
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
      <div className="text-text-small flex gap-[2px] leading-[1.2] opacity-[50%]">
        <p
          className={clsx("rounded-[4px] border border-red-50 px-[4px]", {
            "border-red-50": state === "focus" && darkMode === true,
            "border-green-50": state === "short break" && darkMode === true,
            "border-blue-50": state === "long break" && darkMode === true,
            "border-red-900": state === "focus" && darkMode === false,
            "border-green-900": state === "short break" && darkMode === false,
            "border-blue-900": state === "long break" && darkMode === false,
          })}
        >
          {shortcut[0]}
        </p>
        {shortcut[1] && "+"}
        {shortcut[1] && (
          <p
            className={clsx("rounded-[4px] border border-red-50 px-[4px]", {
              "border-red-50": state === "focus" && darkMode === true,
              "border-green-50": state === "short break" && darkMode === true,
              "border-blue-50": state === "long break" && darkMode === true,
              "border-red-900": state === "focus" && darkMode === false,
              "border-green-900": state === "short break" && darkMode === false,
              "border-blue-900": state === "long break" && darkMode === false,
            })}
          >
            {shortcut[1]}
          </p>
        )}
      </div>
    </div>
  );
};
