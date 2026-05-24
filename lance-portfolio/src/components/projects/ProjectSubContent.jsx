import { Link } from "react-router-dom";
import BentoCard from "../BentoCard";
import ContactMe from "../ContactMe";
import { useState, useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import { FolderGit2, Phone, BookMarked } from "lucide-react";

let isLoaded = false;

function ProjectSubContent({
  className = "",
  projectList = [],
  showViewAll = false,
}) {
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
      <ContactMe
        animKey="psc-btn"
        wrapperClass="animate-in fade-in duration-700 delay-300 fill-mode-both transform-gpu will-change-transform"
      />
    </div>
  );
}

export default ProjectSubContent;
