import BentoCard from "../BentoCard";
import { useState, useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TechMarquee from "./TechMarquee";
import ContactMe from "../ContactMe";
import { skillsData } from "@/data";
import { Cpu, UserRoundCheck, Phone } from "lucide-react";
let isLoaded = false;

function SubContent() {
  const [isLoading, setIsLoading] = useState(!isLoaded);

  useEffect(() => {
    if (!isLoaded) {
      const timer = setTimeout(() => {
        isLoaded = true;
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-3 lg:overflow-y-auto lg:no-scrollbar lg:py-3 lg:pr-3 select-none px-3 lg:px-0">
        <BentoCard title="Technologies" icon={<Cpu className="stroke-black" />}>
          <div className="flex flex-col gap-3 overflow-hidden h-29">
            <Skeleton className="w-full h-11 rounded-md" />
            <Skeleton className="w-full h-11 rounded-md" />
          </div>
        </BentoCard>

        <BentoCard
          title="Skills"
          icon={<UserRoundCheck className="stroke-black" />}
        >
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3 py-1">
                <Skeleton className="shrink-0 w-8 h-8 lg:w-10 lg:h-10 rounded-full" />
                <Skeleton className="h-5 w-3/4 rounded-md" />
              </div>
            ))}
          </div>
        </BentoCard>

        <BentoCard title="Contact Me" icon={<Phone className="stroke-black" />}>
          <div className="flex flex-col justify-between gap-10 h-full">
            <ul className="flex gap-4 w-full flex-wrap">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <li key={i} className="w-9 h-9">
                  <Skeleton className="w-full h-full rounded-full" />
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-1.5 mt-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </BentoCard>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-[clamp(12px,0.85vw,4rem)] lg:overflow-y-auto lg:no-scrollbar lg:py-[clamp(12px,0.85vw,4rem)] lg:pr-[clamp(12px,0.85vw,4rem)] select-none px-3 lg:px-0">
      <BentoCard title="Technologies" icon={<Cpu className="stroke-black" />}>
        <div
          key="tech-m"
          className="animate-in fade-in duration-700 delay-300 fill-mode-both transform-gpu will-change-transform"
        >
          <TechMarquee />
        </div>
      </BentoCard>

      <BentoCard
        title="Skills"
        icon={<UserRoundCheck className="stroke-black" />}
      >
        <div
          key="skills-m"
          className="animate-in fade-in duration-700 delay-350 fill-mode-both transform-gpu will-change-transform"
        >
          <Accordion
            type="single"
            collapsible
            defaultValue="item-1"
            className="flex flex-col gap-[clamp(0.25rem,0.5vw,2rem)]"
          >
            {skillsData.map((skill) => (
              <AccordionItem key={skill.id} value={skill.id}>
                <AccordionTrigger className="w-full flex items-center hover:no-underline rounded-lg transition-colors py-[clamp(0.5rem,0.7vw,3rem)]">
                  <div className="w-full flex items-center gap-[clamp(0.75rem,0.9vw,3rem)]">
                    <div className="shrink-0 w-[clamp(2.5rem,3vw,10rem)] h-[clamp(2.5rem,3vw,10rem)] [&>svg]:w-full [&>svg]:h-full [&>img]:w-full [&>img]:h-full">
                      {skill.icon}
                    </div>
                    <span className="font-medium text-[clamp(15px,1.1vw,5rem)] text-zinc-900 dark:text-zinc-100">
                      {skill.title}
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed pb-[clamp(0.75rem,1vw,4rem)] text-[clamp(13px,1vw,5rem)]">
                  {skill.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </BentoCard>
      <ContactMe
        animKey="contact-m"
        wrapperClass="animate-in fade-in duration-700 delay-400 fill-mode-both transform-gpu will-change-transform"
      />
    </div>
  );
}

export default SubContent;
