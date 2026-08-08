import BentoCard from "../BentoCard";
import ContactMe from "../ContactMe";
import { educationData, experienceData, orgcomData } from "@/data";
import { useState, useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import {
  BookOpenText,
  BriefcaseBusiness,
  Phone,
  Calendar,
  Building2,
} from "lucide-react";

let isLoaded = false;

function AboutSubContent() {
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
      <div className="w-full lg:py-[clamp(12px,0.85vw,3rem)] lg:pr-[clamp(12px,0.85vw,3rem)] pb-[clamp(12px,0.85vw,3rem)] flex flex-col gap-[clamp(12px,0.85vw,3rem)] overflow-y-auto no-scrollbar">
        <BentoCard
          title={"Education"}
          icon={<BookOpenText className="stroke-black" />}
          className="min-h-[clamp(17.5rem,18vw,60rem)]"
        >
          <div className="flex flex-col gap-[clamp(1.25rem,1.3vw,4rem)]">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex w-full gap-[clamp(0.75rem,1.1vw,3rem)]"
              >
                <Skeleton className="w-[clamp(2.75rem,3.2vw,10rem)] h-[clamp(2.75rem,3.2vw,10rem)] rounded-full shrink-0" />
                <div className="flex flex-col gap-[clamp(0.5rem,0.6vw,2rem)] w-full mt-[clamp(0.25rem,0.3vw,1rem)]">
                  <Skeleton className="h-[clamp(1.25rem,1.4vw,4rem)] w-3/4" />
                  <Skeleton className="h-[clamp(1rem,1.1vw,3rem)] w-1/2" />
                  <Skeleton className="h-[clamp(0.75rem,0.85vw,2.5rem)] w-1/3 mt-[clamp(0.25rem,0.3vw,1rem)]" />
                </div>
              </div>
            ))}
          </div>
        </BentoCard>

        <BentoCard
          title={"Experience"}
          icon={<BriefcaseBusiness className="stroke-black" />}
        >
          <div className="flex flex-col gap-[clamp(1.25rem,1.3vw,4rem)]">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex w-full gap-[clamp(0.75rem,1.1vw,3rem)]"
              >
                <Skeleton className="w-[clamp(2.75rem,3.2vw,10rem)] h-[clamp(2.75rem,3.2vw,10rem)] rounded-full shrink-0" />
                <div className="flex flex-col gap-[clamp(0.5rem,0.6vw,2rem)] w-full mt-[clamp(0.25rem,0.3vw,1rem)]">
                  <Skeleton className="h-[clamp(1.25rem,1.4vw,4rem)] w-3/4" />
                  <Skeleton className="h-[clamp(1rem,1.1vw,3rem)] w-1/2" />
                  <Skeleton className="h-[clamp(0.75rem,0.85vw,2.5rem)] w-1/3 mt-[clamp(0.25rem,0.3vw,1rem)]" />
                </div>
              </div>
            ))}
          </div>
        </BentoCard>

        <BentoCard
          title={"Organizations & Community"}
          icon={<BriefcaseBusiness className="stroke-black" />}
        >
          <div className="flex flex-col gap-[clamp(1.25rem,1.3vw,4rem)]">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex w-full gap-[clamp(0.75rem,1.1vw,3rem)]"
              >
                <Skeleton className="w-[clamp(2.75rem,3.2vw,10rem)] h-[clamp(2.75rem,3.2vw,10rem)] rounded-full shrink-0" />
                <div className="flex flex-col gap-[clamp(0.5rem,0.6vw,2rem)] w-full mt-[clamp(0.25rem,0.3vw,1rem)]">
                  <Skeleton className="h-[clamp(1.25rem,1.4vw,4rem)] w-3/4" />
                  <Skeleton className="h-[clamp(1rem,1.1vw,3rem)] w-1/2" />
                  <Skeleton className="h-[clamp(0.75rem,0.85vw,2.5rem)] w-1/3 mt-[clamp(0.25rem,0.3vw,1rem)]" />
                </div>
              </div>
            ))}
          </div>
        </BentoCard>

        <BentoCard
          title="Contact Me"
          icon={<Phone className="stroke-black" />}
          className="h-full"
        >
          <div className="flex flex-col justify-between gap-[clamp(1.5rem,2vw,5rem)] h-full">
            <ul className="flex gap-[clamp(0.75rem,0.9vw,2.5rem)] w-full flex-wrap">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <li key={i} className="w-[clamp(2.25rem,2.6vw,8rem)] h-[clamp(2.25rem,2.6vw,8rem)]">
                  <Skeleton className="w-full h-full rounded-full" />
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-[clamp(0.375rem,0.45vw,1.5rem)] mt-[clamp(0.5rem,0.6vw,2rem)]">
              <Skeleton className="h-[clamp(1rem,1.1vw,3rem)] w-full" />
              <Skeleton className="h-[clamp(1rem,1.1vw,3rem)] w-5/6" />
            </div>
          </div>
        </BentoCard>
      </div>
    );
  }

  return (
    <div className="w-full lg:py-[clamp(12px,0.85vw,3rem)] lg:pr-[clamp(12px,0.85vw,3rem)] pb-[clamp(12px,0.85vw,3rem)] flex flex-col gap-[clamp(12px,0.85vw,3rem)] overflow-y-auto no-scrollbar">
      <BentoCard
        title={"Education"}
        icon={<BookOpenText className="stroke-black" />}
        className="min-h-[clamp(17.5rem,18vw,60rem)]"
      >
        <div
          key="ed-m"
          className="animate-in fade-in duration-700 delay-350 fill-mode-both transform-gpu will-change-transform flex flex-col gap-[clamp(1.25rem,1.3vw,4rem)]"
        >
          {educationData.map((item) => (
            <div className="flex w-full gap-[clamp(0.75rem,1.1vw,3rem)]">
              <img
                src={item.logo}
                className="w-[clamp(2.75rem,3.2vw,10rem)] h-[clamp(2.75rem,3.2vw,10rem)]"
                alt={item.title + "'s Logo"}
              ></img>
              <div className="flex flex-col gap-[clamp(0.25rem,0.35vw,1.5rem)] w-full overflow-hidden">
                <div className="w-full ">
                  <p className="font-semibold text-[clamp(15px,1.1vw,4rem)] text-black dark:text-zinc-100 leading-tight">
                    {item.degree}
                  </p>
                  <p className="font-medium text-zinc-600 dark:text-zinc-400 text-[clamp(14px,1vw,3.5rem)]">
                    {item.institution}
                  </p>
                  <p className="font-medium text-[clamp(13px,0.95vw,3rem)] text-zinc-500 dark:text-zinc-400">
                    GWA:{" "}
                    <span
                      className={
                        item.gwaIsProgress
                          ? "text-[#25B243] font-semibold"
                          : "font-semibold text-zinc-700 dark:text-zinc-300"
                      }
                    >
                      {item.gwaText}
                    </span>
                    {item.gwaValue}
                  </p>
                </div>
                <div className="flex items-center gap-[clamp(0.5rem,0.6vw,2rem)]">
                  <Calendar className="stroke-[#9D9D9D] w-[clamp(0.875rem,1.1vw,3rem)] h-[clamp(0.875rem,1.1vw,3rem)]" />
                  <p className="text-[clamp(12px,0.85vw,4rem)] text-[#9D9D9D]">
                    {item.date}
                  </p>
                </div>
                <p className="text-[clamp(13px,1vw,3.5rem)] leading-relaxed text-zinc-600 dark:text-zinc-400 font-light">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </BentoCard>
      <BentoCard
        title={"Experience"}
        icon={<BriefcaseBusiness className="stroke-black" />}
      >
        <div
          key="ex-m"
          className="animate-in fade-in duration-700 delay-400 fill-mode-both transform-gpu will-change-transform flex flex-col gap-[clamp(1.25rem,1.3vw,4rem)]"
        >
          {experienceData.map((job) => (
            <div className="flex w-full gap-[clamp(0.75rem,1.1vw,3rem)]">
              <img
                src={job.logo}
                className="w-[clamp(2.75rem,3.2vw,10rem)] h-[clamp(2.75rem,3.2vw,10rem)]"
                alt={job.company + "'s Logo"}
              ></img>
              <div className="flex flex-col gap-[clamp(0.25rem,0.35vw,1.5rem)]">
                <div>
                  <span className="font-semibold text-[clamp(15px,1.1vw,4rem)] text-black dark:text-zinc-100 leading-tight">
                    {job.role}
                  </span>
                  <p className="font-medium text-zinc-600 dark:text-zinc-400 text-[clamp(14px,1vw,3.5rem)]">
                    {job.company}
                  </p>
                  <p className="font-medium text-[clamp(13px,0.95vw,3rem)] text-zinc-500 dark:text-zinc-400">
                    {job.type}
                  </p>
                </div>
                <div className="flex items-center gap-[clamp(0.5rem,0.6vw,2rem)]">
                  <Calendar className="stroke-[#9D9D9D] w-[clamp(0.875rem,1.1vw,3rem)] h-[clamp(0.875rem,1.1vw,3rem)]" />{" "}
                  <p className="text-[clamp(12px,0.85vw,3rem)] text-[#9D9D9D]">
                    {job.date}
                  </p>
                </div>
                <p className="text-[clamp(13px,1vw,3.5rem)] leading-relaxed text-zinc-600 dark:text-zinc-400 font-light">
                  {job.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </BentoCard>

      <BentoCard
        title={"Organizations & Community"}
        icon={<Building2 className="stroke-black" />}
      >
        <div
          key="ex-m"
          className="animate-in fade-in duration-700 delay-400 fill-mode-both transform-gpu will-change-transform flex flex-col gap-[clamp(1.25rem,1.3vw,4rem)]"
        >
          {orgcomData.map((job) => (
            <div className="flex w-full gap-[clamp(0.75rem,1.1vw,3rem)]">
              <img
                src={job.logo}
                className="w-[clamp(2.75rem,3.2vw,10rem)] h-[clamp(2.75rem,3.2vw,10rem)]"
                alt={job.title + "'s Logo"}
              ></img>
              <div className="flex flex-col gap-[clamp(0.25rem,0.35vw,1.5rem)]">
                <div>
                  <span className="font-semibold text-[clamp(15px,1.1vw,4rem)] text-black dark:text-zinc-100 leading-tight">
                    {job.role}
                  </span>
                  <p className="font-medium text-zinc-600 dark:text-zinc-400 text-[clamp(14px,1vw,3.5rem)]">
                    {job.company}
                  </p>
                  <p className="font-medium text-[clamp(13px,0.95vw,3rem)] text-zinc-500 dark:text-zinc-400">
                    {job.type}
                  </p>
                </div>
                <div className="flex items-center gap-[clamp(0.5rem,0.6vw,2rem)]">
                  <Calendar className="stroke-[#9D9D9D] w-[clamp(0.875rem,1.1vw,3rem)] h-[clamp(0.875rem,1.1vw,3rem)]" />{" "}
                  <p className="text-[clamp(12px,0.85vw,2.5rem)] text-[#9D9D9D]">
                    {job.date}
                  </p>
                </div>
                <p className="text-[clamp(13px,1vw,3.5rem)] leading-relaxed text-zinc-600 dark:text-zinc-400 font-light">
                  {job.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </BentoCard>

      <ContactMe
        animKey="asc-cm-m"
        wrapperClass="animate-in fade-in duration-700 delay-450 fill-mode-both transform-gpu will-change-transform"
      />
    </div>
  );
}

export default AboutSubContent;
