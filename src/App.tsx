import { useEffect } from "react";
import {
  BrainIcon,
  CoffeeIcon,
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ThreeDotsOutlineIcon,
} from "./assets/icons";
import clsx from "clsx";
import Menu from "./components/menu";
import {
  DarkShortFocus,
  DarkShortLongBreak,
  DarkShortShortBreak,
  LightShortFocus,
  LightShortLongBreak,
  LightShortShortBreak,
} from "./assets/logos";
import clickSound from "./assets/sounds/soft.wav";
import alarmSound from "./assets/sounds/endring.mp3";
import { useHotkeys } from "react-hotkeys-hook";
import { Shortcuts } from "./components/shortcuts";
import PreferencesModal from "./components/Preferences";
import { useRunningStore, useSettingsStore } from "./lib/store";

export default function App() {
  const {
    setSeconds,
    setIntervalId,
    intervalId,
    seconds,
    setIsShortcutsOpen,
    isMenuOpen,
    isPreferencesOpen,
    isRunning,
    isShortcutsOpen,
    setIsMenuOpen,
    setIsRunning,
    setState,
    state,
    pomodoros,
    setIsPreferencesOpen,
    setPomodoros,
    subtractSeconds,
  } = useRunningStore();
  const { darkMode } = useSettingsStore();
  const LONG_BREAK_LENGTH = 900;
  const SHORT_BREAK_LENGTH = 300;
  const FOCUS_LENGTH = 1500;
  //sounds
  const click = new Audio(clickSound);
  const alarm = new Audio(alarmSound);

  const onPlay = () => {
    const id = setInterval(() => {
      subtractSeconds();
    }, 1000);
    setIntervalId(id);
  };

  const onPause = () => {
    clearInterval(Number(intervalId));
    setIntervalId(null);
  };
  if (seconds === 0) {
    clearInterval(Number(intervalId));
    alarm.play();
    setIntervalId(null);
    setIsRunning(false);
    if (state === "focus" && pomodoros < 4) {
      setSeconds(SHORT_BREAK_LENGTH);
      setState("short break");
    } else if (state === "focus" && pomodoros === 4) {
      setSeconds(LONG_BREAK_LENGTH);
      setState("long break");
      setPomodoros(1);
    } else {
      setSeconds(FOCUS_LENGTH);
      setState("focus");
      setPomodoros(pomodoros + 1);
    }
  }

  const onNext = () => {
    click.play();

    if (state === "focus" && pomodoros < 4) {
      setSeconds(SHORT_BREAK_LENGTH);
      setState("short break");
    } else if (state === "focus" && pomodoros === 4) {
      setSeconds(LONG_BREAK_LENGTH);
      setState("long break");
      setPomodoros(0);
    } else {
      setSeconds(FOCUS_LENGTH);
      setState("focus");
      setPomodoros(pomodoros + 1);
    }
  };

  const onPausePlay = () => {
    click.play();
    setIsRunning(!isRunning);
    if (!isRunning) {
      onPlay();
    } else {
      onPause();
    }
  };

  const onMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    click.play();
  };
  const onCloseModals = () => {
    setIsMenuOpen(false);
    setIsShortcutsOpen(false);
    setIsPreferencesOpen(false);
    click.play();
  };

  const openShortcuts = () => {
    setIsShortcutsOpen(!isShortcutsOpen);
  };

  const openPreferences = () => {
    setIsPreferencesOpen(!isPreferencesOpen);
  };

  document.title = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
  useEffect(() => {
    let svg = "";
    if (darkMode === false && state === "focus") {
      svg = LightShortFocus;
    } else if (darkMode === false && state === "short break") {
      svg = LightShortShortBreak;
    } else if (darkMode === false && state === "long break") {
      svg = LightShortLongBreak;
    } else if (darkMode === true && state === "focus") {
      svg = DarkShortFocus;
    } else if (darkMode === true && state === "short break") {
      svg = DarkShortShortBreak;
    } else if (darkMode === true && state === "long break") {
      svg = DarkShortLongBreak;
    }

    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    // Cambia el favicon
    document.querySelector("link[rel='icon']")?.setAttribute("href", url);
  }, [darkMode, state]);

  useHotkeys("right", onNext);
  useHotkeys("space", onPausePlay);
  useHotkeys("ctrl+m", onMenu);
  useHotkeys("esc", onCloseModals);
  useHotkeys("ctrl+k", (event) => {
    event.preventDefault();
    openShortcuts();
  });
  useHotkeys("ctrl+g", (event) => {
    event.preventDefault();
    openPreferences();
  });
  return (
    <main
      className={clsx(
        "font-roboto-flex text-optical flex h-screen max-h-screen max-w-screen items-center justify-center",
        {
          "bg-red-50 selection:bg-red-900/20":
            darkMode === false && state === "focus",
          "bg-green-50 selection:bg-green-900/20":
            darkMode === false && state === "short break",
          "bg-blue-50 selection:bg-blue-900/20":
            darkMode === false && state === "long break",
          "bg-red-950 selection:bg-red-900/20":
            darkMode === true && state === "focus",
          "bg-green-950 selection:bg-green-900/20":
            darkMode === true && state === "short break",
          "bg-blue-950 selection:bg-blue-900/20":
            darkMode === true && state === "long break",
        },
      )}
    >
      <div className="flex flex-col items-center gap-[32px]">
        <div
          className={clsx(
            "flex items-center justify-center gap-[8px] rounded-[9999px] border-2 px-[14px] py-[6px]",
            {
              "bg-red-alpha-100 border-red-900 text-red-900":
                state === "focus" && darkMode === false,
              "bg-green-alpha-100 border-green-900 text-green-900":
                state === "short break" && darkMode === false,
              "bg-blue-alpha-100 border-blue-900 text-blue-900":
                state === "long break" && darkMode === false,
              "bg-red-alpha-100 border-red-50 text-red-50":
                state === "focus" && darkMode === true,
              "bg-green-alpha-100 border-green-50 text-green-50":
                state === "short break" && darkMode === true,
              "bg-blue-alpha-100 border-blue-50 text-blue-50":
                state === "long break" && darkMode === true,
            },
          )}
        >
          {state === "focus" ? <BrainIcon /> : <CoffeeIcon />}

          <span className="font-label text-label">
            {state === "focus"
              ? "Focus"
              : state === "short break"
                ? "Short Break"
                : "Long Break"}
          </span>
        </div>

        <h1
          className={clsx(
            "leading-timer text-timer duration-200",
            {
              "font-timer-paused": !isRunning,
              "font-timer-running": isRunning,
            },
            {
              "text-red-900": state === "focus" && darkMode === false,
              "text-green-900": state === "short break" && darkMode === false,
              "text-blue-900": state === "long break" && darkMode === false,
              "text-red-50": state === "focus" && darkMode === true,
              "text-green-50": state === "short break" && darkMode === true,
              "text-blue-50": state === "long break" && darkMode === true,
            },
          )}
        >
          {String(Math.floor(seconds / 60)).padStart(2, "0")}
        </h1>
        <h1
          className={clsx(
            "leading-timer text-timer duration-200",
            {
              "font-timer-paused": !isRunning,
              "font-timer-running": isRunning,
            },
            {
              "text-red-900": state === "focus" && darkMode === false,
              "text-green-900": state === "short break" && darkMode === false,
              "text-blue-900": state === "long break" && darkMode === false,
              "text-red-50": state === "focus" && darkMode === true,
              "text-green-50": state === "short break" && darkMode === true,
              "text-blue-50": state === "long break" && darkMode === true,
            },
          )}
        >
          {String(Math.floor(seconds % 60)).padStart(2, "0")}
        </h1>

        <div className="flex items-center justify-center gap-[16px]">
          <button
            onClick={onMenu}
            className={clsx(
              "relative h-[80px] w-[80px] cursor-pointer rounded-[24px] p-[24px]",
              {
                "bg-red-alpha-100 text-red-900":
                  state === "focus" && darkMode === false,
                "bg-green-alpha-100 text-green-900":
                  state === "short break" && darkMode === false,
                "bg-blue-alpha-100 text-blue-900":
                  state === "long break" && darkMode === false,
                "bg-red-alpha-100 text-red-100":
                  state === "focus" && darkMode === true,
                "bg-green-alpha-100 text-green-100":
                  state === "short break" && darkMode === true,
                "bg-blue-alpha-100 text-blue-100":
                  state === "long break" && darkMode === true,
              },
            )}
            type="button"
          >
            <Menu
              state={state}
              openShortcuts={openShortcuts}
              isOpen={isMenuOpen}
              setIsOpen={setIsMenuOpen}
              openPreferences={openPreferences}
            />

            <ThreeDotsOutlineIcon />
          </button>
          <button
            className={clsx(
              "relative flex h-[96px] w-[128px] cursor-pointer items-center justify-center rounded-[32px] px-[48] py-[32]",
              {
                "bg-red-alpha-600 text-red-900":
                  state === "focus" && darkMode === false,
                "bg-green-alpha-600 text-green-900":
                  state === "short break" && darkMode === false,
                "bg-blue-alpha-700 text-blue-900":
                  state === "long break" && darkMode === false,
                "bg-red-alpha-700 text-red-50":
                  state === "focus" && darkMode === true,
                "bg-green-alpha-700 text-green-50":
                  state === "short break" && darkMode === true,
                "bg-blue-alpha-700 text-blue-50":
                  state === "long break" && darkMode === true,
              },
            )}
            type="button"
            onClick={onPausePlay}
          >
            {isRunning ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            className={clsx(
              "flex h-[80px] w-[80px] cursor-pointer items-center justify-center rounded-[24px] p-[24px]",
              {
                "bg-red-alpha-100 text-red-900":
                  state === "focus" && darkMode === false,
                "bg-green-alpha-100 text-green-900":
                  state === "short break" && darkMode === false,
                "bg-blue-alpha-100 text-blue-900":
                  state === "long break" && darkMode === false,
                "bg-red-alpha-100 text-red-100":
                  state === "focus" && darkMode === true,
                "bg-green-alpha-100 text-green-100":
                  state === "short break" && darkMode === true,
                "bg-blue-alpha-100 text-blue-100":
                  state === "long break" && darkMode === true,
              },
            )}
            type="button"
            onClick={onNext}
          >
            <FastForwardIcon />
          </button>
        </div>
        {isShortcutsOpen ? <Shortcuts /> : null}
        {isPreferencesOpen ? (
          <PreferencesModal colorMode={"dark"} state={state} />
        ) : null}
      </div>
    </main>
  );
}
