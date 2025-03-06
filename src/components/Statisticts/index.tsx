import clsx from "clsx";
import { useRef, useEffect } from "react";
import { usePomodoroStore } from "../../lib/store";
import { useSettingsStore, useRunningStore } from "../../lib/store";
import { NoData, XIcon } from "../../assets/icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const Statistics = () => {
  const { stats } = usePomodoroStore();
  const { darkMode } = useSettingsStore();
  const { state, setIsStatisticsOpen, isStatisticsOpen } = useRunningStore();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsStatisticsOpen(false);
      }
    }

    if (isStatisticsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isStatisticsOpen]);

  return (
    <div
      className={clsx(
        "absolute top-[50%] left-[50%] flex h-[320px] w-[400px] max-w-screen translate-x-[-50%] translate-y-[-50%] transform flex-col rounded-[24px] p-[24px] shadow-[0px_1px_6px_rgba(0,0,0,0.039),_0px_5.5px_16px_rgba(0,0,0,0.19)]",
        {
          "bg-red-50 text-red-900": state === "focus" && darkMode === false,
          "bg-green-50 text-green-900":
            state === "short break" && darkMode === false,
          "bg-blue-50 text-blue-900":
            state === "long break" && darkMode === false,
          "bg-red-950 text-red-50": state === "focus" && darkMode === true,
          "bg-green-950 text-green-50":
            state === "short break" && darkMode === true,
          "bg-blue-950 text-blue-50":
            state === "long break" && darkMode === true,
          hidden: !isStatisticsOpen,
        },
      )}
      ref={modalRef}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Statistics</h2>
        <button
          onClick={() => setIsStatisticsOpen(false)}
          className="cursor-pointer"
        >
          <span className="block h-[18px] w-[18px]">
            <XIcon />
          </span>
        </button>
      </div>
      {stats.sessions > 0 ? (
        <>
          <p>
            Total Sessions: <span className="font-bold">{stats.sessions}</span>
          </p>
          <p>
            Total Focus Time:{" "}
            <span className="font-bold">{stats.totalTime} min</span>
          </p>

          <div className="mt-4 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.sessionsPerDay}>
                <XAxis dataKey="day" color="" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="sessions"
                  fill={clsx({
                    "#471515": state === "focus" && darkMode === false,
                    "#216630": state === "short break" && darkMode === false,
                    "#153047": state === "long break" && darkMode === false,
                    "#ffd9d9": state === "focus" && darkMode === true,
                    "#d9fae1": state === "short break" && darkMode === true,
                    "#d9eeff": state === "long break" && darkMode === true,
                  })}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
          <NoData
            a={clsx({
              "#471515": state === "focus" && darkMode === false,
              "#216630": state === "short break" && darkMode === false,
              "#153047": state === "long break" && darkMode === false,
              "#ffd9d9": state === "focus" && darkMode === true,
              "#d9fae1": state === "short break" && darkMode === true,
              "#d9eeff": state === "long break" && darkMode === true,
            })}
            b={clsx({
              "#471515": state === "focus" && darkMode === true,
              "#216630": state === "short break" && darkMode === true,
              "#153047": state === "long break" && darkMode === true,
              "#ffd9d9": state === "focus" && darkMode === false,
              "#d9fae1": state === "short break" && darkMode === false,
              "#d9eeff": state === "long break" && darkMode === false,
            })}
            c={darkMode ? "black" : "white"}
          />
          <p className="mt-4 text-lg font-medium">No data yet!</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Start a session to track your progress.
          </p>
        </div>
      )}
    </div>
  );
};
