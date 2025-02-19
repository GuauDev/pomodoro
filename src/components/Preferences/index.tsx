import clsx from "clsx";
import { XIcon } from "../../assets/icons";
import { SettingsComponentSwitch } from "../SettingsComponentSwitch";
import { SettingsComponentNumber } from "../SettingsComponentNumber";

export default function PreferencesModal({
  colorMode,
  state,
}: {
  colorMode: "light" | "dark";
  state: "focus" | "short break" | "long break";
}) {
  return (
    <div
      className={clsx(
        "absolute flex h-[610px] w-[448px] flex-col rounded-[24px] p-[24px] shadow-[0px_1px_6px_rgba(0,0,0,0.039),_0px_5.5px_16px_rgba(0,0,0,0.19)]",
        {
          "bg-red-50": colorMode === "light" && state === "focus",
          "bg-green-50": colorMode === "light" && state === "short break",
          "bg-blue-50": colorMode === "light" && state === "long break",
          "bg-red-950 text-red-50": colorMode === "dark" && state === "focus",
          "bg-green-950": colorMode === "dark" && state === "short break",
          "bg-blue-950": colorMode === "dark" && state === "long break",
        },
      )}
    >
      <div className="mt-[1px] mb-[25px] flex items-center justify-between">
        <h2
          className={clsx("font-heading-h1 text-heading-h1 text-2xl", {
            "text-red-900": colorMode === "light" && state === "focus",
            "text-green-900": colorMode === "light" && state === "short break",
            "text-blue-900": colorMode === "light" && state === "long break",
            "text-red-50": colorMode === "dark" && state === "focus",
            "text-green-50": colorMode === "dark" && state === "short break",
            "text-blue-50": colorMode === "dark" && state === "long break",
          })}
        >
          Settings
        </h2>
        <button>
          <span
            className={clsx("block h-[18px] w-[18px]", {
              "text-red-900": colorMode === "light" && state === "focus",
              "text-green-900":
                colorMode === "light" && state === "short break",
              "text-blue-900": colorMode === "light" && state === "long break",
              "text-red-50": colorMode === "dark" && state === "focus",
              "text-green-50": colorMode === "dark" && state === "short break",
              "text-blue-50": colorMode === "dark" && state === "long break",
            })}
          >
            <XIcon />
          </span>
        </button>
      </div>
      <SettingsComponentSwitch
        title="Dark mode"
        colorMode={colorMode}
        state={state}
      />
      <SettingsComponentNumber
        title="Focus length"
        colorMode={colorMode}
        state={state}
      />
      <SettingsComponentNumber
        title="Pomodoros until long break"
        colorMode={colorMode}
        state={state}
      />
      <SettingsComponentNumber
        title="Short break length"
        colorMode={colorMode}
        state={state}
      />
      <SettingsComponentNumber
        title="Long break length"
        colorMode={colorMode}
        state={state}
      />
      <SettingsComponentSwitch
        title="Auto resume timer"
        colorMode={colorMode}
        state={state}
      />
      <SettingsComponentSwitch
        title="Sound"
        colorMode={colorMode}
        state={state}
      />

      <SettingsComponentSwitch
        title="Notifications"
        colorMode={colorMode}
        state={state}
      />
    </div>
  );
}
