import clsx from "clsx";
import { XIcon } from "../../assets/icons";
import { SettingsComponentSwitch } from "../SettingsComponentSwitch";
import { SettingsComponentNumber } from "../SettingsComponentNumber";
import { useSettingsStore } from "../../lib/store";

export default function PreferencesModal({
  state,
}: {
  colorMode: "light" | "dark";
  state: "focus" | "short break" | "long break";
}) {
  const {
    darkMode,
    setDarkMode,
    focusLength,
    setFocusLength,
    pomodorosUntilLongBreak,
    setPomodorosUntilLongBreak,
    shortBreakLength,
    setShortBreakLength,
    longBreakLength,
    setLongBreakLength,
    autoResumeTimer,
    setAutoResumeTimer,
    sound,
    setSound,
    notifications,
    setNotifications,
  } = useSettingsStore();

  return (
    <div
      className={clsx(
        "absolute flex h-[610px] w-[448px] flex-col rounded-[24px] p-[24px] shadow-[0px_1px_6px_rgba(0,0,0,0.039),_0px_5.5px_16px_rgba(0,0,0,0.19)]",
        {
          "bg-red-50": darkMode === false && state === "focus",
          "bg-green-50": darkMode === false && state === "short break",
          "bg-blue-50": darkMode === false && state === "long break",
          "bg-red-950 text-red-50": darkMode === true && state === "focus",
          "bg-green-950": darkMode === true && state === "short break",
          "bg-blue-950": darkMode === true && state === "long break",
        },
      )}
    >
      <div className="mt-[1px] mb-[25px] flex items-center justify-between">
        <h2
          className={clsx("font-heading-h1 text-heading-h1 text-2xl", {
            "text-red-900": darkMode === false && state === "focus",
            "text-green-900": darkMode === false && state === "short break",
            "text-blue-900": darkMode === false && state === "long break",
            "text-red-50": darkMode === true && state === "focus",
            "text-green-50": darkMode === true && state === "short break",
            "text-blue-50": darkMode === true && state === "long break",
          })}
        >
          Settings
        </h2>
        <button>
          <span
            className={clsx("block h-[18px] w-[18px]", {
              "text-red-900": darkMode === false && state === "focus",
              "text-green-900": darkMode === false && state === "short break",
              "text-blue-900": darkMode === false && state === "long break",
              "text-red-50": darkMode === true && state === "focus",
              "text-green-50": darkMode === true && state === "short break",
              "text-blue-50": darkMode === true && state === "long break",
            })}
          >
            <XIcon />
          </span>
        </button>
      </div>
      <SettingsComponentSwitch
        title="Dark mode"
        setIsOn={setDarkMode}
        isOn={darkMode}
      />
      <SettingsComponentNumber
        title="Focus length"
        setValue={setFocusLength}
        value={focusLength}
      />
      <SettingsComponentNumber
        title="Pomodoros until long break"
        value={pomodorosUntilLongBreak}
        setValue={setPomodorosUntilLongBreak}
      />
      <SettingsComponentNumber
        title="Short break length"
        setValue={setShortBreakLength}
        value={shortBreakLength}
      />
      <SettingsComponentNumber
        title="Long break length"
        setValue={setLongBreakLength}
        value={longBreakLength}
      />
      <SettingsComponentSwitch
        title="Auto resume timer"
        isOn={autoResumeTimer}
        setIsOn={setAutoResumeTimer}
      />
      <SettingsComponentSwitch title="Sound" isOn={sound} setIsOn={setSound} />

      <SettingsComponentSwitch
        title="Notifications"
        isOn={notifications}
        setIsOn={setNotifications}
      />
    </div>
  );
}
