import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
    focusLength: number;
    setFocusLength: (focusLength: number) => void;
    pomodorosUntilLongBreak: number;
    setPomodorosUntilLongBreak: (pomodorosUntilLongBreak: number) => void;
    shortBreakLength: number;
    setShortBreakLength: (shortBreakLength: number) => void;
    longBreakLength: number;
    setLongBreakLength: (longBreakLength: number) => void;
    autoResumeTimer: boolean;
    setAutoResumeTimer: (autoResumeTimer: boolean) => void;
    sound: boolean;
    setSound: (sound: boolean) => void;
    notifications: boolean;
    setNotifications: (notifications: boolean) => void;
}

export const useSettingsStore = create(
  persist<SettingsState>(
    (set) => ({
        darkMode: false,
        setDarkMode: (darkMode: boolean) => set({ darkMode }),
        focusLength: 25,
        setFocusLength: (focusLength: number) => set({ focusLength }),
        pomodorosUntilLongBreak: 4,
        setPomodorosUntilLongBreak: (pomodorosUntilLongBreak: number) =>set({ pomodorosUntilLongBreak }),
        shortBreakLength: 5,
        setShortBreakLength: (shortBreakLength: number) => set({ shortBreakLength }),
        longBreakLength: 15,
        setLongBreakLength: (longBreakLength: number) => set({ longBreakLength }),
        autoResumeTimer: false,
        setAutoResumeTimer: (autoResumeTimer: boolean) => set({ autoResumeTimer }),
        sound: true,
        setSound: (sound: boolean) => set({ sound }),
        notifications: true,
        setNotifications: (notifications: boolean) => set({ notifications }),
    }),
    {
      name: "settings-storage", 
      
    }
  )
);

interface RunningState {
  isRunning:boolean;
  setIsRunning: (isRunning: boolean) => void;
  colorMode: 'light' | 'dark';
  setColorMode:(colorMode: 'light' | 'dark')=>void;
  state: "focus" | "short break" | "long break";
  setState: (state: "focus" | "short break" | "long break") => void;
  intervalId:number | null;
  setIntervalId: (intervalId: number | null) => void;
  seconds:number;
  setSeconds: (seconds: number) => void;
  isMenuOpen:boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
  isShortcutsOpen:boolean;
  setIsShortcutsOpen: (isShortcutsOpen: boolean) => void;
  isPreferencesOpen:boolean;
  setIsPreferencesOpen: (isPreferencesOpen: boolean) => void;
  pomodoros:number;
  setPomodoros:(pomodoros:number)=>void;
  substractSeconds:()=>void;
}

export const useRunningStore = create(
  persist<RunningState>(
    (set) => ({
      isRunning: false,
      setIsRunning: (isRunning: boolean) => set({ isRunning }),
      colorMode: 'light',
      setColorMode: (colorMode: 'light' | 'dark') => set({ colorMode }),
      state: "focus",
      setState: (state: "focus" | "short break" | "long break") => set({ state }),
      intervalId: null,
      setIntervalId: (intervalId: number | null) => set({ intervalId }),
      seconds: 1500,
      setSeconds: (seconds: number) => set({ seconds }),
      isMenuOpen: false,
      setIsMenuOpen: (isMenuOpen: boolean) => set({ isMenuOpen }),
      isShortcutsOpen: false,
      setIsShortcutsOpen: (isShortcutsOpen: boolean) => set({ isShortcutsOpen }),
      isPreferencesOpen: false,
      setIsPreferencesOpen: (isPreferencesOpen: boolean) => set({ isPreferencesOpen }),
      pomodoros: 1,
      setPomodoros: (pomodoros: number) => set({ pomodoros }),
      substractSeconds: () => set((state) => {
        const expirationTime = Date.now() + 1 * 60 * 1000;
        localStorage.setItem("timer-expiration", expirationTime.toString());
        return { ...state, seconds: state.seconds - 1 };
      }),
    }),
    {
      name: "running-storage",
      onRehydrateStorage: () => () => {
        const expiration = localStorage.getItem("timer-expiration");

        if (expiration && Date.now() > Number(expiration)) {
          localStorage.removeItem("timer-expiration");
          localStorage.removeItem("running-storage");
          window.location.reload();
        }
      },
      
    }
  )
);
