import clsx from "clsx";
import {
  ArrowRightIcon,
  CharBarIcon,
  GearSixIcon,
  KeyIcon,
} from "../../assets/icons";

export default function Menu({
  colorMode,
  state,
}: {
  colorMode: "light" | "dark";
  state: "focus" | "short break" | "long break";
}) {
  return (
    <div
      className={clsx(
        "border-white-alpha-50 absolute bottom-30 left-65 z-20 h-[160px] w-[250px] rounded-[12px] border py-[8px]",
        {
          "bg-red-50 text-red-900": state === "focus" && colorMode === "light",
          "bg-green-50 text-green-900":
            state === "short break" && colorMode === "light",
          "bg-blue-50 text-blue-900":
            state === "long break" && colorMode === "light",
          "bg-red-950 text-red-50": state === "focus" && colorMode === "dark",
          "bg-green-950 text-green-50":
            state === "short break" && colorMode === "dark",
          "bg-blue-950 text-blue-50":
            state === "long break" && colorMode === "dark",
        },
      )}
    >
      <nav>
        <ul className="flex flex-col">
          <li className="flex items-center justify-between p-[12px]">
            <div className="flex items-center gap-[8px]">
              <span>
                <CharBarIcon />
              </span>
              <span className="text-text-regular">Statistics</span>
            </div>
            <div className="text-text-small flex gap-[2px] opacity-[50%]">
              <p
                className={clsx("rounded-[4px] border border-red-50 px-[4px]", {
                  "border-red-50": state === "focus" && colorMode === "dark",
                  "border-green-50":
                    state === "short break" && colorMode === "dark",
                  "border-blue-50":
                    state === "long break" && colorMode === "dark",
                  "border-red-900": state === "focus" && colorMode === "light",
                  "border-green-900":
                    state === "short break" && colorMode === "light",
                  "border-blue-900":
                    state === "long break" && colorMode === "light",
                })}
              >
                Ctrl
              </p>
              +<p className="rounded-[4px] border border-red-50 px-[4px]">S</p>
            </div>
          </li>
          <li className="flex items-center justify-between p-[12px]">
            <div className="flex items-center gap-[8px]">
              <span>
                <GearSixIcon />
              </span>
              <span className="text-text-regular">Preferences</span>
            </div>
            <div className="text-text-small flex gap-[2px] opacity-[50%]">
              <p className="rounded-[4px] border border-red-50 px-[4px]">
                Ctrl
              </p>
              +<p className="rounded-[4px] border border-red-50 px-[4px]">P</p>
            </div>
          </li>
          <li className="flex items-center justify-between p-[12px]">
            <div className="flex items-center gap-[8px]">
              <span>
                <KeyIcon />
              </span>
              <span className="text-text-regular">Shortcuts</span>
            </div>
            <div className="text-text-small flex gap-[2px] opacity-[50%]">
              <p className="rounded-[4px] border border-red-50 px-[4px]">
                Ctrl
              </p>
              +<p className="rounded-[4px] border border-red-50 px-[4px]">K</p>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
