import clsx from "clsx";
import { useRunningStore, useSettingsStore } from "../../lib/store";
import { XIcon } from "../../assets/icons";
import clickSound from "../../assets/sounds/soft.wav";
import { useEffect, useRef } from "react";
import { ShortcutsComponent } from "../ShortcutsComponent";

export const Shortcuts = () => {
  const { darkMode, sound } = useSettingsStore();
  const { state, isShortcutsOpen, setIsShortcutsOpen } = useRunningStore();
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
        setIsShortcutsOpen(false);
        clickPlay();
      }
    }

    if (isShortcutsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isShortcutsOpen]);
  return (
    <div
      className={clsx(
        "absolute top-[50%] left-[50%] flex h-[470px] w-[400px] max-w-screen translate-x-[-50%] translate-y-[-50%] transform flex-col rounded-[24px] p-[24px] shadow-[0px_1px_6px_rgba(0,0,0,0.039),_0px_5.5px_16px_rgba(0,0,0,0.19)]",
        {
          "bg-red-50": darkMode === false && state === "focus",
          "bg-green-50": darkMode === false && state === "short break",
          "bg-blue-50": darkMode === false && state === "long break",
          "bg-red-950 text-red-50": darkMode === true && state === "focus",
          "bg-green-950": darkMode === true && state === "short break",
          "bg-blue-950": darkMode === true && state === "long break",
          hidden: !isShortcutsOpen,
        },
      )}
      ref={modalRef}
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
          Shortcuts
        </h2>
        <button
          onClick={() => {
            setIsShortcutsOpen(false);
            clickPlay();
          }}
          className="cursor-pointer"
        >
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
      <ShortcutsComponent shortcut={["Space"]} title="Play/Pause" />
      <ShortcutsComponent shortcut={["→"]} title="Skip to Next" />
      <ShortcutsComponent shortcut={["Esc"]} title="Close All Modals" />
      <ShortcutsComponent shortcut={["Ctrl", "M"]} title="Open Menu" />
      <ShortcutsComponent shortcut={["Ctrl", "S"]} title="View Statistics" />
      <ShortcutsComponent shortcut={["Ctrl", "G"]} title="Open Preferencess" />
      <ShortcutsComponent shortcut={["Ctrl", "K"]} title="View Shortcuts" />
    </div>
  );
};
