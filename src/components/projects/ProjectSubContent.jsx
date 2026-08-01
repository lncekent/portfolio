import { Link } from "react-router-dom";
import BentoCard from "../BentoCard";
import ContactMe from "../ContactMe";
import { useState, useEffect, useRef, useCallback } from "react";
import { Skeleton } from "../ui/skeleton";
import { FolderGit2, Phone, BookMarked, GitGraph } from "lucide-react";
import { GitHubCalendar } from "react-github-calendar";

let isLoaded = false;

function ProjectSubContent({
  className = "",
  projectList = [],
  showViewAll = false,
}) {
  // Dark mode detection for calendar
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Calendar state
  const [calendarStats, setCalendarStats] = useState(null);
  const [isCalendarLoading, setIsCalendarLoading] = useState(true);
  const statsComputedRef = useRef(false);
  const calendarContainerRef = useRef(null);
  const [blockSize, setBlockSize] = useState(12);

  // Dynamically calculate blockSize so the calendar fills its container width
  useEffect(() => {
    const container = calendarContainerRef.current;
    if (!container) return;

    const calculateBlockSize = () => {
      const containerWidth = container.clientWidth;
      if (containerWidth <= 0) return;
      const weeks = 53;
      const blockMargin = 4;
      const calculatedSize = Math.floor(
        (containerWidth + blockMargin) / weeks - blockMargin,
      );
      const clamped = Math.max(10, Math.min(20, calculatedSize));
      setBlockSize(clamped);
    };

    calculateBlockSize();

    const resizeObserver = new ResizeObserver(calculateBlockSize);
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  const handleTransformData = useCallback((data) => {
    if (!statsComputedRef.current && data.length > 0) {
      statsComputedRef.current = true;
      Promise.resolve().then(() => {
        const total = data.reduce((sum, d) => sum + d.count, 0);
        const monthMap = {};
        data.forEach((d) => {
          if (d.count > 0) {
            const key = d.date.slice(0, 7);
            monthMap[key] = (monthMap[key] || 0) + d.count;
          }
        });
        const sorted = Object.entries(monthMap).sort((a, b) => b[1] - a[1]);
        const [bestKey, bestCount] = sorted[0] || [];
        const bestMonth = bestKey
          ? new Date(bestKey + "-01").toLocaleString("default", {
              month: "long",
              year: "numeric",
            })
          : "N/A";
        setCalendarStats({ total, bestMonth, bestCount });
        setIsCalendarLoading(false);
      });
    }
    return data;
  }, []);

  // Page loading state
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
      <div className="grid gap-3">
        <BentoCard
          title={"Contributions"}
          icon={<GitGraph className="stroke-black" />}
          className="w-full"
        >
          <div className="overflow-x-auto no-scrollbar">
            <div className="flex flex-row gap-4 min-w-max">
              <div className="flex flex-col gap-1 shrink-0">
                <div className="flex gap-6 mb-1">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-3 w-8" />
                  ))}
                </div>
                {[...Array(7)].map((_, row) => (
                  <div key={row} className="flex gap-1">
                    {[...Array(52)].map((_, col) => (
                      <Skeleton
                        key={col}
                        className="w-3 h-3 rounded-[2px] shrink-0"
                      />
                    ))}
                  </div>
                ))}
                <div className="flex justify-between items-center mt-2">
                  <Skeleton className="h-3 w-44" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <div className="flex flex-col gap-3 w-38.75 shrink-0">
                <div className="flex flex-col gap-2 p-3 rounded-[10px] border border-zinc-200 dark:border-zinc-800">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-7 w-20" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <div className="flex flex-col gap-2 p-3 rounded-[10px] border border-zinc-200 dark:border-zinc-800">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </div>
          </div>
        </BentoCard>

        <BentoCard
          title={"Other Projects"}
          icon={<FolderGit2 className="stroke-black" />}
          className="w-full"
        >
          <div className="flex flex-col gap-4 w-full">
            <div className={`flex flex-col w-full gap-3 ${className}`}>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="lg:px-3 px-6 w-full rounded-[10px] py-4 flex border-[.50px] border-border flex-col"
                >
                  <div className="flex gap-2 w-full items-start">
                    <Skeleton className="w-6 h-6 shrink-0" />
                    <div className="flex flex-col gap-1.5 flex-1 w-full mt-0.5">
                      <div className="flex gap-2 items-center justify-between w-full">
                        <Skeleton className="h-5 w-1/2" />
                        <Skeleton className="h-4 w-12 rounded-[10px]" />
                      </div>
                      <Skeleton className="h-3 w-1/3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
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

  if (!projectList || projectList.length === 0) return null;

  return (
    <div className="grid gap-3">
      {/* Contributions Calendar */}
      <BentoCard
        title={"Contributions"}
        icon={<GitGraph className="stroke-black" />}
        className="w-full"
      >
        <div
          className={
            isCalendarLoading
              ? "hidden"
              : "overflow-x-auto no-scrollbar animate-in fade-in duration-700 fill-mode-both transform-gpu will-change-transform"
          }
        >
          <div className="flex flex-row gap-4 min-w-max">
            {/* Calendar */}
            <div
              ref={calendarContainerRef}
              className="calendar-wrapper min-w-0 shrink-0"
            >
              <GitHubCalendar
                username="lncekent"
                colorScheme={isDark ? "dark" : "light"}
                transformData={handleTransformData}
                blockSize={blockSize}
              />
            </div>

            {/* Stats Panel */}
            <div className="flex flex-col gap-3 w-38.75 shrink-0">
              <div className="flex flex-col gap-1 p-3 rounded-[10px] bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                  This Year
                </span>
                <span className="text-[26px] font-bold text-zinc-900 dark:text-zinc-100 leading-none">
                  {calendarStats?.total?.toLocaleString()}
                </span>
                <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                  contributions
                </span>
              </div>

              <div className="flex flex-col gap-1 p-3 rounded-[10px] bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                  Most Active
                </span>
                <span className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100 leading-snug">
                  {calendarStats?.bestMonth}
                </span>
                <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                  {calendarStats?.bestCount?.toLocaleString()} contributions
                </span>
              </div>
            </div>
          </div>
        </div>

        {isCalendarLoading && (
          <div className="overflow-x-auto no-scrollbar">
            <div className="flex flex-row gap-4 min-w-max">
              <div className="flex flex-col gap-1 shrink-0">
                <div className="flex gap-6 mb-1">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-3 w-8" />
                  ))}
                </div>
                {[...Array(7)].map((_, row) => (
                  <div key={row} className="flex gap-1">
                    {[...Array(52)].map((_, col) => (
                      <Skeleton
                        key={col}
                        className="w-3 h-3 rounded-[2px] shrink-0"
                      />
                    ))}
                  </div>
                ))}
                <div className="flex justify-between items-center mt-2">
                  <Skeleton className="h-3 w-44" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <div className="flex flex-col gap-3 w-38.75 shrink-0">
                <div className="flex flex-col gap-2 p-3 rounded-[10px] border border-zinc-200 dark:border-zinc-800">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-7 w-20" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <div className="flex flex-col gap-2 p-3 rounded-[10px] border border-zinc-200 dark:border-zinc-800">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </div>
          </div>
        )}
      </BentoCard>

      {/* Other Projects */}
      <BentoCard
        title={"Other Projects"}
        icon={<FolderGit2 className="stroke-black" />}
        className="w-full"
      >
        <div
          key="psc-opts"
          className="animate-in fade-in duration-700 delay-200 fill-mode-both transform-gpu will-change-transform flex flex-col gap-4 w-full"
        >
          <div className={`flex-col w-full gap-3 ${className}`}>
            {projectList.map((project) => (
              <Link
                key={project.id}
                to={`/projects-selected/${project.slug}`}
                className="lg:px-3 px-6 w-full rounded-[10px] py-4 flex border-[.50px] border-border cursor-pointer bg-white dark:bg-zinc-900/50 flex-col"
              >
                <div className="flex gap-2 w-full items-start ">
                  <BookMarked
                    strokeWidth={1.5}
                    className="stroke-black dark:invert"
                  />
                  <div className="flex flex-col gap-0.5 flex-1 w-full overflow-hidden">
                    <div className="flex gap-2 items-center justify-between w-full">
                      <span className="font-semibold text-[16px] line-clamp-1 ">
                        {project.title}
                      </span>
                      {project.status === "Public" ? (
                        <p className="text-[#35BF46] text-[11px] px-2 border py-0.5 rounded-[10px] border-[#C2F49E] bg-[#F6FFDD] shrink-0">
                          Public
                        </p>
                      ) : (
                        <p className="text-zinc-500 text-[11px] px-2 border py-0.5 rounded-[10px] border-zinc-300 bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700 shrink-0">
                          Private
                        </p>
                      )}
                    </div>
                    <p className="font-medium text-[10px] text-[#B9B9B9]">
                      Created on {project.date}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {showViewAll && (
            <div className="w-full justify-center flex">
              <Link
                to="/projects"
                className="text-center text-[14px] font-medium text-[#468cfc] hover:text-[#92bcff] transition-colors pt-2 pb-1"
              >
                View All Projects →
              </Link>
            </div>
          )}
        </div>
      </BentoCard>

      {/* Contact Me */}
      <ContactMe
        animKey="psc-btn"
        wrapperClass="animate-in fade-in duration-700 delay-300 fill-mode-both transform-gpu will-change-transform"
      />
    </div>
  );
}

export default ProjectSubContent;
