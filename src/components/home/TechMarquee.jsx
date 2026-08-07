import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { techStackData } from "@/data";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, useEffect } from "react";

const firstRow = techStackData.slice(0, techStackData.length / 2);
const secondRow = techStackData.slice(techStackData.length / 2);

const SkillsCards = ({ img, imgDark, skillName }) => {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const resolvedImg = imgDark && isDark ? imgDark : img;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <figure
          className={cn(
            "relative h-full overflow-hidden py-[clamp(0.75rem,1vw,4rem)] px-[clamp(0.5rem,0.7vw,3rem)]",
          )}
        >
          <div className="flex flex-row items-center">
            <img
              className="w-[clamp(38px,2.8vw,10rem)] h-[clamp(36px,2.6vw,10rem)]"
              alt={skillName + "'s Logo"}
              src={resolvedImg}
            />
          </div>
        </figure>
      </TooltipTrigger>
      <TooltipContent className="bg-[#468cfc] text-white font-medium text-[clamp(12px,0.9vw,4rem)] px-[clamp(0.75rem,0.9vw,3rem)] py-[clamp(0.375rem,0.45vw,2rem)] rounded-[clamp(6px,0.5vw,2rem)] shadow-md border-none ">
        <p>{skillName}</p>
      </TooltipContent>
    </Tooltip>
  );
};

function TechMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden gap-[clamp(0.25rem,0.5vw,2rem)]">
      <Marquee pauseOnHover className="[--duration:20s] [--gap:clamp(0.5rem,1vw,4rem)]">
        {firstRow.map((techStackData) => (
          <SkillsCards key={techStackData.username} {...techStackData} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s] [--gap:clamp(0.5rem,1vw,4rem)]">
        {secondRow.map((techStackData) => (
          <SkillsCards key={techStackData.username} {...techStackData} />
        ))}
      </Marquee>
      <div className="from-card pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r"></div>
      <div className="from-card pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>
    </div>
  );
}

export default TechMarquee;
