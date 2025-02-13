import clsx from "clsx";
import { CharBarIcon, GearSixIcon, KeyIcon } from "../../assets/icons";

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
        "absolute bottom-30 left-65 z-20 h-[160px] w-[250px] rounded-[12px] border py-[8px] shadow-[0px_1px_6px_rgba(0,0,0,0.039),_0px_5.5px_16px_rgba(0,0,0,0.19)]",
        {
          "border-black-alpha-50 bg-red-50 text-red-900":
            state === "focus" && colorMode === "light",
          "border-black-alpha-50 bg-green-50 text-green-900":
            state === "short break" && colorMode === "light",
          "border-black-alpha-50 bg-blue-50 text-blue-900":
            state === "long break" && colorMode === "light",
          "border-white-alpha-50 bg-red-950 text-red-50":
            state === "focus" && colorMode === "dark",
          "border-white-alpha-50 bg-green-950 text-green-50":
            state === "short break" && colorMode === "dark",
          "border-white-alpha-50 bg-blue-950 text-blue-50":
            state === "long break" && colorMode === "dark",
        },
      )}
    >
      <nav>
        <ul className="flex flex-col">
          {[
            { icon: CharBarIcon, text: "Statistics", shortcut: ["Ctrl", "S"] },

            {
              icon: GearSixIcon,
              text: "Settings",
              shortcut: ["Ctrl", "G"],
            },
            {
              icon: KeyIcon,
              text: "Shortcuts",
              shortcut: ["Ctrl", "K"],
            },
          ].map(({ icon: Icon, text, shortcut }) => (
            <li className="flex items-center justify-between p-[12px]">
              <div className="flex items-center gap-[8px]">
                <span>
                  <Icon />
                </span>
                <span className="text-text-regular">{text}</span>
              </div>
              <div className="text-text-small flex gap-[2px] leading-[1.2] opacity-[50%]">
                <p
                  className={clsx(
                    "rounded-[4px] border border-red-50 px-[4px]",
                    {
                      "border-red-50":
                        state === "focus" && colorMode === "dark",
                      "border-green-50":
                        state === "short break" && colorMode === "dark",
                      "border-blue-50":
                        state === "long break" && colorMode === "dark",
                      "border-red-900":
                        state === "focus" && colorMode === "light",
                      "border-green-900":
                        state === "short break" && colorMode === "light",
                      "border-blue-900":
                        state === "long break" && colorMode === "light",
                    },
                  )}
                >
                  {shortcut[0]}
                </p>
                +
                <p
                  className={clsx(
                    "rounded-[4px] border border-red-50 px-[4px]",
                    {
                      "border-red-50":
                        state === "focus" && colorMode === "dark",
                      "border-green-50":
                        state === "short break" && colorMode === "dark",
                      "border-blue-50":
                        state === "long break" && colorMode === "dark",
                      "border-red-900":
                        state === "focus" && colorMode === "light",
                      "border-green-900":
                        state === "short break" && colorMode === "light",
                      "border-blue-900":
                        state === "long break" && colorMode === "light",
                    },
                  )}
                >
                  {shortcut[1]}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
