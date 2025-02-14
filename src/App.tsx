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

export default function App() {
  const LONG_BREAK_LENGTH = 900;
  const SHORT_BREAK_LENGTH = 300;
  const FOCUS_LENGTH = 1500;
  const [state, setState] = useState<"focus" | "short break" | "long break">(
    "focus",
  );
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [colorMode] = useState<"light" | "dark">("dark");
  const [seconds, setSeconds] = useState<number>(FOCUS_LENGTH);
  const [intervalId, setIntervalId] = useState<number | null>();
  const [pomodoros, setPomodoros] = useState<number>(1);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  //sounds
  const click = new Audio(clickSound);
  const alarm = new Audio(alarmSound);

  const onPlay = () => {
    click.play();
    const id = setInterval(() => {
      setSeconds((sec) => sec - 1);
    }, 1000);
    setIntervalId(id);
  };
  const onPause = () => {
    click.play();
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
      setPomodoros((pomodoros) => pomodoros + 1);
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
      setPomodoros((pomodoros) => pomodoros + 1);
    }
  };

  document.title = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
  useEffect(() => {
    let svg = "";
    if (colorMode === "light" && state === "focus") {
      svg = LightShortFocus;
    } else if (colorMode === "light" && state === "short break") {
      svg = LightShortShortBreak;
    } else if (colorMode === "light" && state === "long break") {
      svg = LightShortLongBreak;
    } else if (colorMode === "dark" && state === "focus") {
      svg = DarkShortFocus;
    } else if (colorMode === "dark" && state === "short break") {
      svg = DarkShortShortBreak;
    } else if (colorMode === "dark" && state === "long break") {
      svg = DarkShortLongBreak;
    }

    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    // Cambia el favicon
    document.querySelector("link[rel='icon']")?.setAttribute("href", url);
  }, [colorMode, state]);
  return (
    <main
      className={clsx(
        "font-roboto-flex text-optical flex h-screen max-h-screen max-w-screen items-center justify-center",
        {
          "bg-red-50 selection:bg-red-900/20":
            colorMode === "light" && state === "focus",
          "bg-green-50 selection:bg-green-900/20":
            colorMode === "light" && state === "short break",
          "bg-blue-50 selection:bg-blue-900/20":
            colorMode === "light" && state === "long break",
          "bg-red-950 selection:bg-red-900/20":
            colorMode === "dark" && state === "focus",
          "bg-green-950 selection:bg-green-900/20":
            colorMode === "dark" && state === "short break",
          "bg-blue-950 selection:bg-blue-900/20":
            colorMode === "dark" && state === "long break",
        },
      )}
    >
      <div className="flex flex-col items-center gap-[32px]">
        <div
          className={clsx(
            "flex items-center justify-center gap-[8px] rounded-[9999px] border-2 px-[14px] py-[6px]",
            {
              "bg-red-alpha-100 border-red-900 text-red-900":
                state === "focus" && colorMode === "light",
              "bg-green-alpha-100 border-green-900 text-green-900":
                state === "short break" && colorMode === "light",
              "bg-blue-alpha-100 border-blue-900 text-blue-900":
                state === "long break" && colorMode === "light",
              "bg-red-alpha-100 border-red-50 text-red-50":
                state === "focus" && colorMode === "dark",
              "bg-green-alpha-100 border-green-50 text-green-50":
                state === "short break" && colorMode === "dark",
              "bg-blue-alpha-100 border-blue-50 text-blue-50":
                state === "long break" && colorMode === "dark",
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
              "text-red-900": state === "focus" && colorMode === "light",
              "text-green-900":
                state === "short break" && colorMode === "light",
              "text-blue-900": state === "long break" && colorMode === "light",
              "text-red-50": state === "focus" && colorMode === "dark",
              "text-green-50": state === "short break" && colorMode === "dark",
              "text-blue-50": state === "long break" && colorMode === "dark",
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
              "text-red-900": state === "focus" && colorMode === "light",
              "text-green-900":
                state === "short break" && colorMode === "light",
              "text-blue-900": state === "long break" && colorMode === "light",
              "text-red-50": state === "focus" && colorMode === "dark",
              "text-green-50": state === "short break" && colorMode === "dark",
              "text-blue-50": state === "long break" && colorMode === "dark",
            },
          )}
        >
          {String(Math.floor(seconds % 60)).padStart(2, "0")}
        </h1>

        <div className="flex items-center justify-center gap-[16px]">
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              click.play();
            }}
            className={clsx("h-[80px] w-[80px] rounded-[24px] p-[24px]", {
              "bg-red-alpha-100 text-red-900":
                state === "focus" && colorMode === "light",
              "bg-green-alpha-100 text-green-900":
                state === "short break" && colorMode === "light",
              "bg-blue-alpha-100 text-blue-900":
                state === "long break" && colorMode === "light",
              "bg-red-alpha-100 text-red-100":
                state === "focus" && colorMode === "dark",
              "bg-green-alpha-100 text-green-100":
                state === "short break" && colorMode === "dark",
              "bg-blue-alpha-100 text-blue-100":
                state === "long break" && colorMode === "dark",
            })}
            type="button"
          >
            {isMenuOpen ? <Menu colorMode={colorMode} state={state} /> : null}

            <ThreeDotsOutlineIcon />
          </button>
          <button
            className={clsx(
              "relative flex h-[96px] w-[128px] items-center justify-center rounded-[32px] px-[48] py-[32]",
              {
                "bg-red-alpha-600 text-red-900":
                  state === "focus" && colorMode === "light",
                "bg-green-alpha-600 text-green-900":
                  state === "short break" && colorMode === "light",
                "bg-blue-alpha-700 text-blue-900":
                  state === "long break" && colorMode === "light",
                "bg-red-alpha-700 text-red-50":
                  state === "focus" && colorMode === "dark",
                "bg-green-alpha-700 text-green-50":
                  state === "short break" && colorMode === "dark",
                "bg-blue-alpha-700 text-blue-50":
                  state === "long break" && colorMode === "dark",
              },
            )}
            type="button"
            onClick={() => {
              setIsRunning(!isRunning);
              if (!isRunning) {
                onPlay();
              } else {
                onPause();
              }
            }}
          >
            {isRunning ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            className={clsx(
              "flex h-[80px] w-[80px] items-center justify-center rounded-[24px] p-[24px]",
              {
                "bg-red-alpha-100 text-red-900":
                  state === "focus" && colorMode === "light",
                "bg-green-alpha-100 text-green-900":
                  state === "short break" && colorMode === "light",
                "bg-blue-alpha-100 text-blue-900":
                  state === "long break" && colorMode === "light",
                "bg-red-alpha-100 text-red-100":
                  state === "focus" && colorMode === "dark",
                "bg-green-alpha-100 text-green-100":
                  state === "short break" && colorMode === "dark",
                "bg-blue-alpha-100 text-blue-100":
                  state === "long break" && colorMode === "dark",
              },
            )}
            type="button"
            onClick={onNext}
          >
            <FastForwardIcon />
          </button>
        </div>
      </div>
    </main>
  );
}
