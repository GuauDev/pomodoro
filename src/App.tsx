import { useEffect, useState } from "react";
import {
  BrainIcon,
  CoffeeIcon,
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ThreeDotsOutlineIcon,
} from "./assets/icons";
import clsx from "clsx";
import Menu from "./components/Menu";
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
import { Shortcuts } from "./components/Shortcuts";
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
  const {
    darkMode,
    focusLength,
    shortBreakLength,
    longBreakLength,
    pomodorosUntilLongBreak,
    autoResumeTimer,
    sound,
    notifications,
  } = useSettingsStore();
  //sounds
  const click = new Audio(clickSound);
  const alarm = new Audio(alarmSound);
  const clickPlay = () => {
    if (sound) {
      click.play();
    }
  };

  const alarmPlay = () => {
    if (sound) {
      alarm.play();
    }
  };

  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [enableNotications, setEnableNotifications] = useState(true);

  useEffect(() => {
    if (state === "focus") {
      setMinutesLeft(Math.floor((focusLength * 60 - seconds) / 60));
      setSecondsLeft((focusLength * 60 - seconds) % 60);
    } else if (state === "short break") {
      setMinutesLeft(Math.floor((shortBreakLength * 60 - seconds) / 60));
      setSecondsLeft((shortBreakLength * 60 - seconds) % 60);
    } else if (state === "long break") {
      setMinutesLeft(Math.floor((longBreakLength * 60 - seconds) / 60));
      setSecondsLeft((longBreakLength * 60 - seconds) % 60);
    }

    if (seconds >= focusLength * 60 && state === "focus") {
      alarmPlay();
      if (pomodoros >= pomodorosUntilLongBreak) {
        setState("long break");
        setPomodoros(0);
      } else {
        setState("short break");
      }
      setSeconds(0);
      if (autoResumeTimer) {
        onPlay();
      } else {
        onPause();
      }
    } else if (seconds >= shortBreakLength * 60 && state === "short break") {
      alarmPlay();
      setState("focus");
      setPomodoros(pomodoros + 1);
      if (autoResumeTimer) {
        onPlay();
      } else {
        onPause();
      }

      setSeconds(0);
    } else if (seconds >= longBreakLength * 60 && state === "long break") {
      alarmPlay();
      setState("focus");
      setPomodoros(pomodoros + 1);
      setSeconds(0);
      if (autoResumeTimer) {
        onPlay();
      } else {
        onPause();
      }
    }
  }, [seconds, longBreakLength, shortBreakLength, focusLength, state]);
  const onNext = () => {
    setEnableNotifications(false);
    clickPlay();
    if (state === "focus") {
      if (pomodoros >= pomodorosUntilLongBreak) {
        setState("long break");
        setPomodoros(0);
      } else {
        setState("short break");
      }
    } else if (state === "short break") {
      setState("focus");
      setPomodoros(pomodoros + 1);
    } else if (state === "long break") {
      setState("focus");
      setPomodoros(pomodoros + 1);
    }
    setSeconds(0);
  };

  const onPlay = () => {
    clearInterval(Number(intervalId));
    setIntervalId(null);
    const id = setInterval(() => {
      subtractSeconds();
    }, 1000);
    setIntervalId(id);
    setIsRunning(true);
  };
  const onPause = () => {
    clearInterval(Number(intervalId));
    setIntervalId(null);
    setIsRunning(false);
  };

  const onPausePlay = () => {
    clickPlay();
    if (!isRunning) {
      onPlay();
    } else {
      onPause();
    }
  };

  const onMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    clickPlay();
  };
  const onCloseModals = () => {
    setIsMenuOpen(false);
    setIsShortcutsOpen(false);
    setIsPreferencesOpen(false);
    clickPlay();
  };

  const openShortcuts = () => {
    setIsShortcutsOpen(!isShortcutsOpen);
    clickPlay();
  };

  const openPreferences = () => {
    setIsPreferencesOpen(!isPreferencesOpen);
    clickPlay();
  };

  document.title = `${String(minutesLeft).padStart(2, "0")}:${String(secondsLeft).padStart(2, "0")}`;
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
    if (notifications && enableNotications) {
      if (Notification.permission === "granted") {
        new Notification(`Pomodoro Timer`, {
          body: `Time for ${state}`,
          icon: url,
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification(`Pomodoro Timer`, {
              body: `Time for ${state}`,
              icon: url,
            });
          }
        });
      }
    }
    setEnableNotifications(true);

    // Cambia el favicon
    document.querySelector("link[rel='icon']")?.setAttribute("href", url);
  }, [darkMode, state]);

  useHotkeys("right", (event) => {
    event.preventDefault();
    onNext;
  });
  useHotkeys("space", (event) => {
    event.preventDefault();
    onPausePlay();
  });
  useHotkeys("ctrl+m", (event) => {
    event.preventDefault();
    onMenu();
  });
  useHotkeys("esc", (event) => {
    event.preventDefault();
    onCloseModals();
  });
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
          {String(minutesLeft).padStart(2, "0")}
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
          {String(secondsLeft).padStart(2, "0")}
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
            <Menu />

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
        <Shortcuts />
        <PreferencesModal />
      </div>
    </main>
  );
}
