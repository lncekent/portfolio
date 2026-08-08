import BentoCard from "../BentoCard";
import { Link } from "react-router-dom";
import { projectsData } from "@/data";
import ProjectSubContent from "./ProjectSubContent";
import { useState, useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import { Pin, ArrowRight, Clock } from "lucide-react";

let isLoaded = false;

function ProjectsContent() {
  const featuredProjects = projectsData.slice(0, 3);
  const otherProjects = projectsData.slice(3);

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
      <div className="w-full h-full lg:pr-[clamp(12px,0.85vw,3rem)] px-3 lg:px-0 py-[clamp(12px,0.85vw,3rem)] overflow-y-auto no-scrollbar overflow-hidden flex flex-col gap-[clamp(0.75rem,0.85vw,3rem)] min-h-[101vh]">
        <BentoCard
          title={"Featured"}
          icon={<Pin className="stroke-black" />}
          className="w-full relative "
        >
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-[clamp(0.75rem,0.85vw,3rem)]">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-full h-full flex flex-col bg-white dark:bg-zinc-900/50 rounded-[10px] border border-zinc-200 dark:border-zinc-800 overflow-hidden"
              >
                <div className="w-full aspect-video bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative border-b border-zinc-100 dark:border-zinc-800 shrink-0">
                  <Skeleton className="w-full h-full rounded-none" />
                </div>
                <div className="flex flex-col flex-1 p-[clamp(1rem,1.1vw,3rem)] gap-[clamp(0.375rem,0.45vw,1.5rem)] justify-between">
                  <div className="flex flex-col gap-[clamp(0.375rem,0.45vw,1.5rem)] w-full">
                    <Skeleton className="h-[clamp(1.25rem,1.4vw,4rem)] w-3/4" />
                    <div className="flex items-center gap-[clamp(0.375rem,0.45vw,1.5rem)] mt-[clamp(0.125rem,0.2vw,1rem)]">
                      <Skeleton className="h-[clamp(0.75rem,0.85vw,2.5rem)] w-1/3" />
                    </div>
                    <div className="flex flex-col gap-[clamp(0.25rem,0.35vw,1.5rem)] mt-[clamp(0.5rem,0.6vw,2rem)]">
                      <Skeleton className="h-[clamp(0.75rem,0.85vw,2.5rem)] w-full" />
                      <Skeleton className="h-[clamp(0.75rem,0.85vw,2.5rem)] w-11/12" />
                      <Skeleton className="h-[clamp(0.75rem,0.85vw,2.5rem)] w-4/5" />
                    </div>
                  </div>
                  <div className="mt-[clamp(0.75rem,0.85vw,3rem)] flex items-center gap-[clamp(0.25rem,0.35vw,1.5rem)]">
                    <Skeleton className="h-[clamp(1rem,1.1vw,3rem)] w-[clamp(6rem,7vw,18rem)]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </BentoCard>

        <ProjectSubContent
          className="w-full grid lg:grid-cols-4"
          projectList={otherProjects}
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full lg:pr-[clamp(12px,0.85vw,3rem)] px-3 lg:px-0 py-[clamp(12px,0.85vw,3rem)] overflow-y-auto no-scrollbar overflow-hidden flex flex-col gap-[clamp(0.75rem,0.85vw,3rem)]">
      <BentoCard
        title={"Featured"}
        icon={<Pin className="stroke-black" />}
        className="w-full relative "
      >
        <div
          key="feat-grid-m"
          className="animate-in fade-in duration-700 delay-150 fill-mode-both transform-gpu will-change-transform grid lg:grid-cols-3 grid-cols-1 gap-[clamp(0.75rem,0.85vw,3rem)]"
        >
          {featuredProjects.map((post) => (
            <Link
              key={post.id}
              to={`/projects-selected/${post.slug}`}
              className="w-full h-full flex flex-col bg-white dark:bg-zinc-900/50 rounded-[10px] border border-zinc-200 dark:border-zinc-800 transition-all duration-300 overflow-hidden group cursor-pointer"
            >
              <div className="w-full aspect-video bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative border-b border-zinc-100 dark:border-zinc-800 shrink-0">
                <img
                  src={post.thumbnail}
                  alt={post.title + "'s Image"}
                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform transform-gpu backface-hidden"
                />
              </div>

              <div className="flex flex-col flex-1 p-[clamp(1rem,1.1vw,3rem)] gap-[clamp(0.375rem,0.45vw,1.5rem)] justify-between">
                <div className="flex flex-col gap-[clamp(0.375rem,0.45vw,1.5rem)]">
                  <h1 className="font-bold text-zinc-900 dark:text-zinc-100 text-[clamp(16px,1.1vw,4rem)] leading-snug line-clamp-1 tracking-tight">
                    {post.title}
                  </h1>

                  <div className="flex items-center gap-[clamp(0.375rem,0.45vw,1.5rem)] mt-[clamp(0.125rem,0.2vw,1rem)]">
                    <Clock className="stroke-zinc-400 w-[clamp(0.875rem,1.1vw,3rem)]" />
                    <span className="text-[clamp(11px,0.8vw,2.5rem)] text-zinc-500 dark:text-zinc-400 tracking-wide">
                      {post.date}
                    </span>
                  </div>
                  <p className="mt-[clamp(0.375rem,0.45vw,1.5rem)] text-[clamp(12px,0.85vw,2.5rem)] leading-relaxed text-zinc-600 dark:text-zinc-400 font-light line-clamp-3">
                    {post.description}
                  </p>
                </div>

                <div className="mt-[clamp(0.75rem,0.85vw,3rem)] flex items-center gap-[clamp(0.25rem,0.35vw,1.5rem)] text-[#468cfc] transition-colors duration-300 group-hover:text-[#92bcff] ease-out">
                  <span className="text-[clamp(12px,0.85vw,2.5rem)] font-medium">View Project</span>
                  <ArrowRight className="w-[clamp(0.875rem,1.1vw,3rem)] h-[clamp(0.875rem,1.1vw,3rem)]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </BentoCard>

      <ProjectSubContent
        className="w-full grid lg:grid-cols-4"
        projectList={otherProjects}
      />
    </div>
  );
}

export default ProjectsContent;
