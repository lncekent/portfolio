import BentoCard from "../BentoCard";
import ContactMe from "../ContactMe";
import { educationData, experienceData, orgcomData } from "@/data";
import { useState, useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import { BookOpenText, BriefcaseBusiness, Phone, Calendar, Building2 } from "lucide-react";

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
      <div className="w-full lg:py-3 lg:pr-3 pb-3 flex flex-col gap-3 overflow-y-auto no-scrollbar">
        <BentoCard
          title={"Education"}
          icon={<BookOpenText className="stroke-black" />}
          className="min-h-70"
        >
          <div className="flex flex-col gap-5">
            {[1, 2].map((i) => (
              <div key={i} className="flex w-full gap-5">
                <Skeleton className="lg:w-13 lg:h-13 w-11 h-11 rounded-full shrink-0" />
                <div className="flex flex-col gap-2 w-full mt-1">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-1/3 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </BentoCard>

        <BentoCard
          title={"Experience"}
          icon={<BriefcaseBusiness className="stroke-black" />}
        >
          <div className="flex flex-col gap-5">
            {[1, 2].map((i) => (
              <div key={i} className="flex w-full lg:gap-5 gap-4">
                <Skeleton className="lg:w-13 lg:h-13 w-11 h-11 rounded-full shrink-0" />
                <div className="flex flex-col gap-2 w-full mt-1">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-1/3 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </BentoCard>

        <BentoCard
          title={"Organizations & Community"}
          icon={<BriefcaseBusiness className="stroke-black" />}
        >
          <div className="flex flex-col gap-5">
            {[1, 2].map((i) => (
              <div key={i} className="flex w-full lg:gap-5 gap-4">
                <Skeleton className="lg:w-13 lg:h-13 w-11 h-11 rounded-full shrink-0" />
                <div className="flex flex-col gap-2 w-full mt-1">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-1/3 mt-1" />
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
    <div className="w-full lg:py-3 lg:pr-3 pb-3 flex flex-col gap-3 overflow-y-auto no-scrollbar">
      <BentoCard
        title={"Education"}
        icon={<BookOpenText className="stroke-black" />}
        className="min-h-70"
      >
        <div
          key="ed-m"
          className="animate-in fade-in duration-700 delay-350 fill-mode-both transform-gpu will-change-transform flex flex-col gap-5"
        >
          {educationData.map((item) => (
            <div className="flex w-full gap-5">
              <img
                src={item.logo}
                className="lg:w-13 lg:h-13 w-11 h-11"
                alt={item.title + "'s Logo"}
              ></img>
              <div className="flex flex-col gap-1 w-full overflow-hidden">
                <div className="w-full ">
                  <p className="font-semibold text-[15px] lg:text-[16px] text-black dark:text-zinc-100 leading-tight">
                    {item.degree}
                  </p>
                  <p className="font-medium text-zinc-600 dark:text-zinc-400 text-[14px]">
                    {item.institution}
                  </p>
                  <p className="font-medium text-[13px] text-zinc-500 dark:text-zinc-400">
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
                <div className="flex items-center gap-2">
                  <Calendar className="stroke-[#9D9D9D] w-3.5 h-3.5" />
                  <p className="text-[12px] text-[#9D9D9D]">{item.date}</p>
                </div>
                <p className="text-[13px] lg:text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400 font-light">
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
          className="animate-in fade-in duration-700 delay-400 fill-mode-both transform-gpu will-change-transform flex flex-col gap-5"
        >
          {experienceData.map((job) => (
            <div className="flex w-full lg:gap-5 gap-4">
              <img
                src={job.logo}
                className="lg:w-13 lg:h-13 w-11 h-11"
                alt={job.title + "'s Logo"}
              ></img>
              <div className="flex flex-col gap-1">
                <div>
                  <span className="font-semibold text-[15px] lg:text-[16px] text-black dark:text-zinc-100 leading-tight">
                    {job.role}
                  </span>
                  <p className="font-medium text-zinc-600 dark:text-zinc-400 text-[14px]">
                    {job.company}
                  </p>
                  <p className="font-medium text-[13px] text-zinc-500 dark:text-zinc-400">
                    {job.type}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="stroke-[#9D9D9D] w-3.5 h-3.5" />{" "}
                  <p className="text-[12px] text-[#9D9D9D]">{job.date}</p>
                </div>
                <p className="text-[13px] lg:text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400 font-light">
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
          className="animate-in fade-in duration-700 delay-400 fill-mode-both transform-gpu will-change-transform flex flex-col gap-5"
        >
          {orgcomData.map((job) => (
            <div className="flex w-full lg:gap-5 gap-4">
              <img
                src={job.logo}
                className="lg:w-13 lg:h-13 w-11 h-11"
                alt={job.title + "'s Logo"}
              ></img>
              <div className="flex flex-col gap-1">
                <div>
                  <span className="font-semibold text-[15px] lg:text-[16px] text-black dark:text-zinc-100 leading-tight">
                    {job.role}
                  </span>
                  <p className="font-medium text-zinc-600 dark:text-zinc-400 text-[14px]">
                    {job.company}
                  </p>
                  <p className="font-medium text-[13px] text-zinc-500 dark:text-zinc-400">
                    {job.type}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="stroke-[#9D9D9D] w-3.5 h-3.5" />{" "}
                  <p className="text-[12px] text-[#9D9D9D]">{job.date}</p>
                </div>
                <p className="text-[13px] lg:text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400 font-light">
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
