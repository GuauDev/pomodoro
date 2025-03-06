import { ArrowDownIcon, ArrowUpIcon } from "../../assets/icons";
import clsx from "clsx";
import { useRunningStore, useSettingsStore } from "../../lib/store";
import clickSound from "../../assets/sounds/soft.wav";

export function SettingsComponentNumber({
  title,
  value,
  setValue,
}: {
  title: string;
  value: number;
  setValue: (value: number) => void;
}) {
  const { state } = useRunningStore();
  const { darkMode, sound } = useSettingsStore();
  const min = 1;
  const max = 100;
  const click = new Audio(clickSound);
  const clickPlay = () => {
    if (sound) {
      click.play();
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value.replace(/[^0-9]/g, "");
    if (newValue === "") newValue = "0";
    setValue(Math.min(Math.max(Number(newValue), min), max));
  };

  return (
    <div className="flex items-center justify-between py-[12px]">
      <label
        htmlFor={title}
        className={clsx("text-text-regular font-text-regular", {
          "text-red-900": darkMode === false && state === "focus",
          "text-green-900": darkMode === false && state === "short break",
          "text-blue-900": darkMode === false && state === "long break",
          "text-red-50": darkMode === true && state === "focus",
          "text-green-50": darkMode === true && state === "short break",
          "text-blue-50": darkMode === true && state === "long break",
        })}
      >
        {title}
      </label>
      <div
        className={clsx(
          "flex h-[40px] w-[96px] items-center rounded-[8px] border",
          {
            "border-white-alpha-100": darkMode === true,
            "border-black-alpha-100": darkMode === false,
          },
        )}
      >
        <input
          type="text"
          value={String(value)}
          onChange={handleChange}
          className={clsx(
            "text-text-regular font-text-regular h-[40px] w-[65px] text-center outline-none",
            {
              "text-red-900 placeholder:text-red-900":
                darkMode === false && state === "focus",
              "text-green-900 placeholder:text-green-900":
                darkMode === false && state === "short break",
              "text-blue-900 placeholder:text-blue-900":
                darkMode === false && state === "long break",
              "text-red-50 placeholder:text-red-50":
                darkMode === true && state === "focus",
              "text-green-50 placeholder:text-green-50":
                darkMode === true && state === "short break",
              "text-blue-50 placeholder:text-blue-50":
                darkMode === true && state === "long break",
            },
          )}
          id={title}
        />
        <div
          className={clsx("flex h-[38px] w-[29px] flex-col border-l", {
            "border-white-alpha-100 text-red-50":
              darkMode === true && state === "focus",
            "border-white-alpha-100 text-green-50":
              darkMode === true && state === "short break",
            "border-white-alpha-100 text-blue-50":
              darkMode === true && state === "long break",
            "border-black-alpha-100 text-red-900":
              darkMode === false && state === "focus",
            "border-black-alpha-100 text-green-900":
              darkMode === false && state === "short break",
            "border-black-alpha-100 text-blue-900":
              darkMode === false && state === "long break",
          })}
        >
          <button
            onClick={() => {
              setValue(Math.min(Number(value) + 1, max));
              clickPlay();
            }}
            className={clsx(
              "flex h-[20px] w-[28px] cursor-pointer items-center justify-center border-b focus:outline-0",
              {
                "border-white-alpha-100": darkMode === true,
                "border-black-alpha-100": darkMode === false,
              },
            )}
          >
            <ArrowUpIcon />
          </button>
          <button
            onClick={() => {
              setValue(Math.max(Number(value) - 1, min));
              clickPlay();
            }}
            className="flex h-[20px] w-[29px] cursor-pointer items-center justify-center focus:outline-0"
          >
            <ArrowDownIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
