import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
        notifications: false,
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
  subtractSeconds:()=>void;
}

export const useRunningStore = create(
  persist<RunningState>(
    (set) => ({
      isRunning: false,
      setIsRunning: (isRunning: boolean) => set({ isRunning }),
      state: "focus",
      setState: (state: "focus" | "short break" | "long break") => set({ state }),
      intervalId: null,
      setIntervalId: (intervalId: number | null) => set({ intervalId }),
      seconds: 0,
      setSeconds: (seconds: number) => set({ seconds }),
      isMenuOpen: false,
      setIsMenuOpen: (isMenuOpen: boolean) => set({ isMenuOpen }),
      isShortcutsOpen: false,
      setIsShortcutsOpen: (isShortcutsOpen: boolean) => set({ isShortcutsOpen }),
      isPreferencesOpen: false,
      setIsPreferencesOpen: (isPreferencesOpen: boolean) => set({ isPreferencesOpen }),
      pomodoros: 1,
      setPomodoros: (pomodoros: number) => set({ pomodoros }),
      subtractSeconds: () => set((state) => ({ seconds: state.seconds + 1 })
      ),
    }),
    {
      name: "running-storage",
      storage:createJSONStorage(()=>{return sessionStorage}),
      partialize: (state) => ({
        isRunning: false,
        state: state.state,
        pomodoros: state.pomodoros,
        setIsRunning: state.setIsRunning,
        setState: state.setState,
        setIntervalId: state.setIntervalId,
        setSeconds: state.setSeconds,
        setIsMenuOpen: state.setIsMenuOpen,
        setIsShortcutsOpen: state.setIsShortcutsOpen,
        setIsPreferencesOpen: state.setIsPreferencesOpen,
        setPomodoros: state.setPomodoros,
        subtractSeconds: state.subtractSeconds,
        intervalId: null,
        seconds: state.seconds,
        isMenuOpen:false,
        isShortcutsOpen:false,
        isPreferencesOpen: false,
      }),
      
    }
  )
);
