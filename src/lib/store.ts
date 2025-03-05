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
  isStatisticsOpen:boolean;
  setIsStatisticsOpen: (isStatisticsOpen: boolean) => void;
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
      isStatisticsOpen: false,
      setIsStatisticsOpen: (isStatisticsOpen: boolean) => set({ isStatisticsOpen }),
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
        setIsStatisticsOpen: state.setIsStatisticsOpen,
        setPomodoros: state.setPomodoros,
        subtractSeconds: state.subtractSeconds,
        intervalId: null,
        isStatisticsOpen: false,
        seconds: state.seconds,
        isMenuOpen:false,
        isShortcutsOpen:false,
        isPreferencesOpen: false,
      }),
      
    }
  )
);




interface PomodoroStats {
  sessions: number;
  totalTime: number; // Minutes
  sessionsPerDay: { day: string; sessions: number }[];
  lastReset: string; // Date string (YYYY-MM-DD)
}

interface PomodoroStore {
  stats: PomodoroStats;
  addSession: (duration: number) => void;
  resetStats: () => void;
  checkWeeklyReset: () => void;
}

export const usePomodoroStore = create<PomodoroStore>()(
  persist(
    (set, get) => ({
      stats: {
        sessions: 0,
        totalTime: 0,
        sessionsPerDay: [],
        lastReset: new Date().toISOString().split("T")[0], // Store only the date
      },

      addSession: (duration) =>
        set((state) => {
          const today = new Date().toLocaleDateString("en-US", { weekday: "short" });
          const updatedSessionsPerDay = [...state.stats.sessionsPerDay];

          const index = updatedSessionsPerDay.findIndex((d) => d.day === today);
          if (index !== -1) {
            updatedSessionsPerDay[index].sessions += 1;
          } else {
            updatedSessionsPerDay.push({ day: today, sessions: 1 });
          }

          return {
            stats: {
              ...state.stats,
              sessions: state.stats.sessions + 1,
              totalTime: state.stats.totalTime + duration,
              sessionsPerDay: updatedSessionsPerDay,
            },
          };
        }),

      resetStats: () =>
        set({
          stats: {
            sessions: 0,
            totalTime: 0,
            sessionsPerDay: [],
            lastReset: new Date().toISOString().split("T")[0],
          },
        }),

      checkWeeklyReset: () => {
        const { stats, resetStats } = get();
        const lastResetDate = new Date(stats.lastReset);
        const currentDate = new Date();
        const daysDifference = Math.floor(
          (currentDate.getTime() - lastResetDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (daysDifference >= 7) {
          resetStats();
        }
      },
    }),
    { name: "pomodoro-store" }
  )
);

