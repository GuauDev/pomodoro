import clsx from "clsx";
import { CharBarIcon, GearSixIcon, KeyIcon } from "../../assets/icons";
import { useEffect, useRef } from "react";
import { useRunningStore, useSettingsStore } from "../../lib/store";
import clickSound from "../../assets/sounds/soft.wav";

export default function Menu() {
  const { darkMode, sound } = useSettingsStore();
  const {
    setIsMenuOpen,
    isMenuOpen,
    state,
    setIsPreferencesOpen,
    setIsShortcutsOpen,
    setIsStatisticsOpen,
  } = useRunningStore();
  const click = new Audio(clickSound);
  const clickPlay = () => {
    if (sound) {
      click.play();
    }
  };

  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
        clickPlay();
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const openPreferences = () => {
    setIsPreferencesOpen(true);
  };
  const openShortcuts = () => {
    setIsShortcutsOpen(true);
  };

  const openStatistics = () => {
    setIsStatisticsOpen(true);
  };
  return (
    <div
      className={clsx(
        "absolute bottom-30 left-65 z-20 h-[160px] w-[250px] rounded-[12px] border py-[8px] shadow-[0px_1px_6px_rgba(0,0,0,0.039),_0px_5.5px_16px_rgba(0,0,0,0.19)]",
        {
          "border-black-alpha-50 bg-red-50 text-red-900":
            state === "focus" && darkMode === false,
          "border-black-alpha-50 bg-green-50 text-green-900":
            state === "short break" && darkMode === false,
          "border-black-alpha-50 bg-blue-50 text-blue-900":
            state === "long break" && darkMode === false,
          "border-white-alpha-50 bg-red-950 text-red-50":
            state === "focus" && darkMode === true,
          "border-white-alpha-50 bg-green-950 text-green-50":
            state === "short break" && darkMode === true,
          "border-white-alpha-50 bg-blue-950 text-blue-50":
            state === "long break" && darkMode === true,
          hidden: !isMenuOpen,
        },
      )}
      ref={modalRef}
    >
      <nav>
        <ul className="flex flex-col">
          {[
            {
              icon: CharBarIcon,
              text: "Statistics",
              shortcut: ["Ctrl", "S"],
              event: openStatistics,
            },

            {
              icon: GearSixIcon,
              text: "Preferences",
              shortcut: ["Ctrl", "G"],
              event: openPreferences,
            },
            {
              icon: KeyIcon,
              text: "Shortcuts",
              shortcut: ["Ctrl", "K"],
              event: openShortcuts,
            },
          ].map(({ icon: Icon, text, shortcut, event }) => (
            <li
              className="flex items-center justify-between p-[12px]"
              onClick={() => {
                if (event) event();
              }}
              key={text}
            >
              <div className="flex items-center gap-[8px]">
                <span>
                  <Icon />
                </span>
                <span className="text-text-regular">{text}</span>
              </div>
              <div className="text-text-small flex gap-[2px] leading-[1.2] opacity-[50%]">
                <p
                  className={clsx(
                    "rounded-[4px] border border-red-50 px-[4px]",
                    {
                      "border-red-50": state === "focus" && darkMode === true,
                      "border-green-50":
                        state === "short break" && darkMode === true,
                      "border-blue-50":
                        state === "long break" && darkMode === true,
                      "border-red-900": state === "focus" && darkMode === false,
                      "border-green-900":
                        state === "short break" && darkMode === false,
                      "border-blue-900":
                        state === "long break" && darkMode === false,
                    },
                  )}
                >
                  {shortcut[0]}
                </p>
                +
                <p
                  className={clsx(
                    "rounded-[4px] border border-red-50 px-[4px]",
                    {
                      "border-red-50": state === "focus" && darkMode === true,
                      "border-green-50":
                        state === "short break" && darkMode === true,
                      "border-blue-50":
                        state === "long break" && darkMode === true,
                      "border-red-900": state === "focus" && darkMode === false,
                      "border-green-900":
                        state === "short break" && darkMode === false,
                      "border-blue-900":
                        state === "long break" && darkMode === false,
                    },
                  )}
                >
                  {shortcut[1]}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
