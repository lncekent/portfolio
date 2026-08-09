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
  const statsRef = useRef(null);
  const [blockSize, setBlockSize] = useState(12);
  const [fontSize, setFontSize] = useState(14);

  // Size the calendar blocks dynamically.
  // - Projects list (full width): size blocks by container WIDTH so it fills.
  // - Sidebar (showViewAll): size blocks by the stats column HEIGHT so the
  //   calendar matches the neighbors' height. Its full-year width then overflows
  //   the narrow column and scrolls horizontally.
  useEffect(() => {
    const calculate = () => {
      const blockMargin = 4;
      const container = calendarContainerRef.current;
      if (!container) return;
      const containerWidth = container.clientWidth;
      if (containerWidth <= 0) return;
      const weeks = 53;
      let size = Math.floor(
        (containerWidth + blockMargin) / weeks - blockMargin,
      );

      if (showViewAll) {
        size = Math.max(11, Math.min(40, size));
        setBlockSize(size);
        setFontSize(Math.max(11, Math.round(size * 0.75 + 2)));
      } else {
        size = Math.max(10, Math.min(48, size));
        setBlockSize(size);
        setFontSize(Math.max(12, Math.round(size * 0.85 + 4)));
      }
    };

    calculate();

    const target = calendarContainerRef.current;
    if (!target) return;
    const resizeObserver = new ResizeObserver(calculate);
    resizeObserver.observe(target);
    return () => resizeObserver.disconnect();
  }, [showViewAll]);

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
      <div className="grid gap-[clamp(0.75rem,0.85vw,3rem)]">
        <BentoCard
          title={"Contributions"}
          icon={<GitGraph className="stroke-black" />}
          className="w-full"
        >
          {showViewAll ? (
            <div className="flex flex-col gap-[clamp(0.5rem,0.6vw,2rem)] w-full">
              <div className="overflow-x-auto no-scrollbar w-full">
                <div className="flex flex-col gap-1 shrink-0 min-w-max">
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
              </div>

              <div className="grid grid-cols-2 gap-[clamp(0.5rem,0.6vw,1.5rem)] w-full">
                <div className="flex flex-col gap-[clamp(0.125rem,0.2vw,0.75rem)] p-[clamp(0.5rem,0.6vw,1.5rem)] rounded-[10px] border border-zinc-200 dark:border-zinc-800">
                  <Skeleton className="h-[clamp(10px,0.7vw,2rem)] w-16" />
                  <Skeleton className="h-[clamp(18px,1.3vw,4rem)] w-20" />
                  <Skeleton className="h-[clamp(10px,0.7vw,2rem)] w-24" />
                </div>
                <div className="flex flex-col gap-[clamp(0.125rem,0.2vw,0.75rem)] p-[clamp(0.5rem,0.6vw,1.5rem)] rounded-[10px] border border-zinc-200 dark:border-zinc-800">
                  <Skeleton className="h-[clamp(10px,0.7vw,2rem)] w-20" />
                  <Skeleton className="h-[clamp(12px,0.85vw,2.5rem)] w-full" />
                  <Skeleton className="h-[clamp(10px,0.7vw,2rem)] w-24" />
                </div>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto no-scrollbar">
              <div className="flex flex-row items-start gap-[clamp(0.75rem,0.9vw,2.5rem)] min-w-max lg:min-w-0 lg:w-full">
                {/* Calendar Skeleton */}
                <div className="flex flex-col gap-[clamp(0.25rem,0.35vw,1.5rem)] min-w-0 flex-1 w-full">
                  <div className="grid grid-cols-12 gap-1 w-full mb-1">
                    {[...Array(12)].map((_, i) => (
                      <Skeleton key={i} className="h-[clamp(0.75rem,0.85vw,2.5rem)] w-full" />
                    ))}
                  </div>
                  {[...Array(7)].map((_, row) => (
                    <div
                      key={row}
                      className="grid grid-cols-[repeat(53,minmax(0,1fr))] gap-[clamp(1px,0.15vw,4px)] w-full"
                    >
                      {[...Array(53)].map((_, col) => (
                        <Skeleton
                          key={col}
                          className="aspect-square w-full rounded-[2px]"
                        />
                      ))}
                    </div>
                  ))}
                  <div className="flex justify-between items-center mt-[clamp(0.5rem,0.6vw,2rem)] w-full">
                    <Skeleton className="h-[clamp(0.75rem,0.85vw,2.5rem)] w-44" />
                    <Skeleton className="h-[clamp(0.75rem,0.85vw,2.5rem)] w-24" />
                  </div>
                </div>

                {/* Stats Panel Skeleton */}
                <div className="flex flex-col gap-[clamp(0.75rem,0.85vw,3rem)] w-[clamp(9.6875rem,11vw,30rem)] shrink-0">
                  <div className="flex flex-col gap-[clamp(0.5rem,0.6vw,2rem)] p-[clamp(0.75rem,0.85vw,3rem)] rounded-[10px] border border-zinc-200 dark:border-zinc-800">
                    <Skeleton className="h-[clamp(0.75rem,0.85vw,2.5rem)] w-16" />
                    <Skeleton className="h-[clamp(1.75rem,2vw,5rem)] w-20" />
                    <Skeleton className="h-[clamp(0.75rem,0.85vw,2.5rem)] w-24" />
                  </div>
                  <div className="flex flex-col gap-[clamp(0.5rem,0.6vw,2rem)] p-[clamp(0.75rem,0.85vw,3rem)] rounded-[10px] border border-zinc-200 dark:border-zinc-800">
                    <Skeleton className="h-[clamp(0.75rem,0.85vw,2.5rem)] w-20" />
                    <Skeleton className="h-[clamp(1.25rem,1.4vw,4rem)] w-full" />
                    <Skeleton className="h-[clamp(0.75rem,0.85vw,2.5rem)] w-24" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </BentoCard>

        <BentoCard
          title={"Other Projects"}
          icon={<FolderGit2 className="stroke-black" />}
          className="w-full"
        >
          <div className="flex flex-col gap-[clamp(0.75rem,0.9vw,2.5rem)] w-full">
            <div
              className={`flex flex-col w-full gap-[clamp(0.75rem,0.85vw,3rem)] ${className}`}
            >
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="px-[clamp(0.75rem,1vw,3rem)] w-full rounded-[10px] py-[clamp(1rem,1.1vw,3rem)] flex border-[.50px] border-border flex-col"
                >
                  <div className="flex gap-[clamp(0.5rem,0.6vw,2rem)] w-full items-start">
                    <Skeleton className="w-[clamp(1.5rem,1.7vw,5rem)] h-[clamp(1.5rem,1.7vw,5rem)] shrink-0" />
                    <div className="flex flex-col gap-[clamp(0.375rem,0.45vw,1.5rem)] flex-1 w-full mt-[clamp(0.125rem,0.2vw,1rem)]">
                      <div className="flex gap-[clamp(0.5rem,0.6vw,2rem)] items-center justify-between w-full">
                        <Skeleton className="h-[clamp(1.25rem,1.4vw,4rem)] w-1/2" />
                        <Skeleton className="h-[clamp(1rem,1.1vw,3rem)] w-12 rounded-[10px]" />
                      </div>
                      <Skeleton className="h-[clamp(0.75rem,0.85vw,2.5rem)] w-1/3" />
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
          <div className="flex flex-col justify-between gap-[clamp(1.5rem,2vw,5rem)] h-full">
            <ul className="flex gap-[clamp(0.75rem,0.9vw,2.5rem)] w-full flex-wrap">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <li
                  key={i}
                  className="w-[clamp(2.25rem,2.6vw,8rem)] h-[clamp(2.25rem,2.6vw,8rem)]"
                >
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

  if (!projectList || projectList.length === 0) return null;

  return (
    <div className="grid gap-[clamp(0.75rem,0.85vw,3rem)]">
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
              : "animate-in fade-in duration-700 fill-mode-both transform-gpu will-change-transform"
          }
        >
          {showViewAll ? (
            <div className="flex flex-col gap-[clamp(0.5rem,0.6vw,2rem)] w-full">
              {/* Horizontally Scrollable Calendar */}
              <div className="overflow-x-auto no-scrollbar w-full">
                <div
                  ref={calendarContainerRef}
                  style={{ "--calendar-font-size": `${fontSize}px` }}
                  className={`calendar-wrapper w-full ${blockSize > 11 ? "fill" : "shrink-0 min-w-max"}`}
                >
                  <GitHubCalendar
                    username="lncekent"
                    colorScheme={isDark ? "dark" : "light"}
                    transformData={handleTransformData}
                    blockSize={blockSize}
                    fontSize={fontSize}
                  />
                </div>
              </div>

              {/* Stats Panel Stacked Underneath */}
              <div
                ref={statsRef}
                className="grid grid-cols-2 gap-[clamp(0.5rem,0.6vw,1.5rem)] w-full"
              >
                <div className="flex flex-col gap-[clamp(0.125rem,0.2vw,0.75rem)] p-[clamp(0.5rem,0.6vw,1.5rem)] rounded-[10px] bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[clamp(10px,0.7vw,2rem)] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                    This Year
                  </span>
                  <span className="text-[clamp(18px,1.3vw,4rem)] font-bold text-zinc-900 dark:text-zinc-100 leading-none">
                    {calendarStats?.total?.toLocaleString()}
                  </span>
                  <span className="text-[clamp(10px,0.7vw,2rem)] text-zinc-400 dark:text-zinc-500">
                    contributions
                  </span>
                </div>

                <div className="flex flex-col gap-[clamp(0.125rem,0.2vw,0.75rem)] p-[clamp(0.5rem,0.6vw,1.5rem)] rounded-[10px] bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[clamp(10px,0.7vw,2rem)] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                    Most Active
                  </span>
                  <span className="text-[clamp(12px,0.85vw,2.5rem)] font-semibold text-zinc-900 dark:text-zinc-100 leading-snug line-clamp-1">
                    {calendarStats?.bestMonth}
                  </span>
                  <span className="text-[clamp(10px,0.7vw,2rem)] text-zinc-400 dark:text-zinc-500">
                    {calendarStats?.bestCount?.toLocaleString()} contributions
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto no-scrollbar">
              <div className="flex flex-row items-start gap-[clamp(0.75rem,0.9vw,2.5rem)] min-w-max lg:min-w-0 lg:w-full">
                {/* Calendar */}
                <div
                  ref={calendarContainerRef}
                  style={{ "--calendar-font-size": `${fontSize}px` }}
                  className="calendar-wrapper min-w-0 shrink-0 fill lg:flex-1"
                >
                  <GitHubCalendar
                    username="lncekent"
                    colorScheme={isDark ? "dark" : "light"}
                    transformData={handleTransformData}
                    blockSize={blockSize}
                    fontSize={fontSize}
                  />
                </div>

                {/* Stats Panel */}
                <div
                  ref={statsRef}
                  className="flex flex-col gap-[clamp(0.75rem,0.85vw,3rem)] w-[clamp(9.6875rem,11vw,30rem)] shrink-0"
                >
                  <div className="flex flex-col gap-[clamp(0.25rem,0.35vw,1.5rem)] p-[clamp(0.75rem,0.85vw,3rem)] rounded-[10px] bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                    <span className="text-[clamp(11px,0.8vw,2.5rem)] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                      This Year
                    </span>
                    <span className="text-[clamp(26px,1.8vw,7rem)] font-bold text-zinc-900 dark:text-zinc-100 leading-none">
                      {calendarStats?.total?.toLocaleString()}
                    </span>
                    <span className="text-[clamp(11px,0.8vw,2.5rem)] text-zinc-400 dark:text-zinc-500">
                      contributions
                    </span>
                  </div>

                  <div className="flex flex-col gap-[clamp(0.25rem,0.35vw,1.5rem)] p-[clamp(0.75rem,0.85vw,3rem)] rounded-[10px] bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                    <span className="text-[clamp(11px,0.8vw,2.5rem)] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                      Most Active
                    </span>
                    <span className="text-[clamp(14px,1vw,3.5rem)] font-semibold text-zinc-900 dark:text-zinc-100 leading-snug">
                      {calendarStats?.bestMonth}
                    </span>
                    <span className="text-[clamp(11px,0.8vw,2.5rem)] text-zinc-400 dark:text-zinc-500">
                      {calendarStats?.bestCount?.toLocaleString()} contributions
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {isCalendarLoading && (
          <div>
            {showViewAll ? (
              <div className="flex flex-col gap-[clamp(0.5rem,0.6vw,2rem)] w-full">
                <div className="overflow-x-auto no-scrollbar w-full">
                  <div className="flex flex-col gap-1 shrink-0 min-w-max">
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
                </div>

                <div className="grid grid-cols-2 gap-[clamp(0.5rem,0.6vw,1.5rem)] w-full">
                  <div className="flex flex-col gap-[clamp(0.125rem,0.2vw,0.75rem)] p-[clamp(0.5rem,0.6vw,1.5rem)] rounded-[10px] border border-zinc-200 dark:border-zinc-800">
                    <Skeleton className="h-[clamp(10px,0.7vw,2rem)] w-16" />
                    <Skeleton className="h-[clamp(18px,1.3vw,4rem)] w-20" />
                    <Skeleton className="h-[clamp(10px,0.7vw,2rem)] w-24" />
                  </div>
                  <div className="flex flex-col gap-[clamp(0.125rem,0.2vw,0.75rem)] p-[clamp(0.5rem,0.6vw,1.5rem)] rounded-[10px] border border-zinc-200 dark:border-zinc-800">
                    <Skeleton className="h-[clamp(10px,0.7vw,2rem)] w-20" />
                    <Skeleton className="h-[clamp(12px,0.85vw,2.5rem)] w-full" />
                    <Skeleton className="h-[clamp(10px,0.7vw,2rem)] w-24" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto no-scrollbar">
                <div className="flex flex-row items-start gap-[clamp(0.75rem,0.9vw,2.5rem)] min-w-max lg:min-w-0 lg:w-full">
                  {/* Calendar Skeleton */}
                  <div className="flex flex-col gap-[clamp(0.25rem,0.35vw,1.5rem)] min-w-0 flex-1 w-full">
                    <div className="grid grid-cols-12 gap-1 w-full mb-1">
                      {[...Array(12)].map((_, i) => (
                        <Skeleton key={i} className="h-3 w-full" />
                      ))}
                    </div>
                    {[...Array(7)].map((_, row) => (
                      <div
                        key={row}
                        className="grid grid-cols-[repeat(53,minmax(0,1fr))] gap-[clamp(1px,0.15vw,4px)] w-full"
                      >
                        {[...Array(53)].map((_, col) => (
                          <Skeleton
                            key={col}
                            className="aspect-square w-full rounded-[2px]"
                          />
                        ))}
                      </div>
                    ))}
                    <div className="flex justify-between items-center mt-2 w-full">
                      <Skeleton className="h-3 w-44" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>

                  {/* Stats Panel Skeleton */}
                  <div className="flex flex-col gap-[clamp(0.75rem,0.85vw,3rem)] w-[clamp(9.6875rem,11vw,30rem)] shrink-0">
                    <div className="flex flex-col gap-[clamp(0.5rem,0.6vw,2rem)] p-[clamp(0.75rem,0.85vw,3rem)] rounded-[10px] border border-zinc-200 dark:border-zinc-800">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-7 w-20" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <div className="flex flex-col gap-[clamp(0.5rem,0.6vw,2rem)] p-[clamp(0.75rem,0.85vw,3rem)] rounded-[10px] border border-zinc-200 dark:border-zinc-800">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </div>
              </div>
            )}
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
          className="animate-in fade-in duration-700 delay-200 fill-mode-both transform-gpu will-change-transform flex flex-col gap-[clamp(0.75rem,0.9vw,2.5rem)] w-full"
        >
          <div
            className={`flex-col w-full gap-[clamp(0.75rem,0.85vw,3rem)] ${className}`}
          >
            {projectList.map((project) => (
              <Link
                key={project.id}
                to={`/projects-selected/${project.slug}`}
                className="px-[clamp(0.75rem,1vw,3rem)] w-full rounded-[10px] py-[clamp(1rem,1.1vw,3rem)] flex border-[.50px] border-border cursor-pointer bg-white dark:bg-zinc-900/50 flex-col"
              >
                <div className="flex gap-[clamp(0.5rem,0.6vw,2rem)] w-full items-start ">
                  <BookMarked
                    strokeWidth={1.5}
                    className="stroke-black dark:invert w-[clamp(1.25rem,1.4vw,4rem)] h-[clamp(1.25rem,1.4vw,4rem)] shrink-0"
                  />
                  <div className="flex flex-col gap-[clamp(0.125rem,0.2vw,1rem)] flex-1 w-full overflow-hidden">
                    <div className="flex gap-[clamp(0.5rem,0.6vw,2rem)] items-center justify-between w-full">
                      <span className="font-semibold text-[clamp(16px,1.1vw,4rem)] line-clamp-1 ">
                        {project.title}
                      </span>
                      {project.status === "Public" ? (
                        <p className="text-[#35BF46] text-[clamp(11px,0.8vw,2.5rem)] px-[clamp(0.5rem,0.6vw,2rem)] border py-[clamp(0.125rem,0.2vw,1rem)] rounded-[10px] border-[#C2F49E] bg-[#F6FFDD] shrink-0">
                          Public
                        </p>
                      ) : (
                        <p className="text-zinc-500 text-[clamp(11px,0.8vw,2.5rem)] px-[clamp(0.5rem,0.6vw,2rem)] border py-[clamp(0.125rem,0.2vw,1rem)] rounded-[10px] border-zinc-300 bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700 shrink-0">
                          Private
                        </p>
                      )}
                    </div>
                    <p className="font-medium text-[clamp(10px,0.75vw,2rem)] text-[#B9B9B9]">
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
                className="text-center text-[clamp(14px,1vw,3.5rem)] font-medium text-[#468cfc] hover:text-[#92bcff] transition-colors pt-2 pb-1"
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
