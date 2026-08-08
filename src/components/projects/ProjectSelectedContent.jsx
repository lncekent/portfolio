import BentoCard from "../BentoCard";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import {
  ChevronLeft,
  User,
  ChartColumnStacked,
  Calendar,
  GitFork,
  TvMinimalPlay,
} from "lucide-react";

const loadedProjects = new Set();

function ProjectSelectedContent({ project }) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(!loadedProjects.has(project.id));

  useEffect(() => {
    if (!loadedProjects.has(project.id)) {
      setIsLoading(true); // Force skeleton state sync
      const timer = setTimeout(() => {
        loadedProjects.add(project.id);
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [project.id]);

  if (isLoading) {
    return (
      <div>
        <BentoCard>
          <div className="flex flex-col gap-[clamp(1.25rem,1.3vw,4rem)]">
            <Skeleton className="w-[clamp(2.5rem,2.8vw,8rem)] h-[clamp(2.5rem,2.8vw,8rem)] rounded-full" />

            <div className="flex flex-col gap-[clamp(0.75rem,0.85vw,3rem)]">
              <div className="flex items-center gap-[clamp(0.75rem,0.85vw,3rem)]">
                <Skeleton className="h-[clamp(2rem,2.2vw,6rem)] w-3/4 lg:w-1/2" />
                <Skeleton className="h-[clamp(1.5rem,1.7vw,5rem)] w-20 rounded-4xl" />
              </div>
              <div className="flex flex-wrap gap-[clamp(0.5rem,0.6vw,2rem)]">
                <Skeleton className="h-[clamp(1.25rem,1.4vw,4rem)] w-16" />
                <Skeleton className="h-[clamp(1.25rem,1.4vw,4rem)] w-20" />
                <Skeleton className="h-[clamp(1.25rem,1.4vw,4rem)] w-14" />
              </div>
              <div className="flex flex-col gap-[clamp(0.75rem,0.85vw,3rem)] mt-[clamp(0.25rem,0.3vw,1.5rem)]">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-[clamp(0.75rem,0.9vw,3rem)] items-center">
                    <Skeleton className="w-[clamp(1rem,1.5vw,4rem)] h-[clamp(1rem,1.5vw,4rem)] rounded-full" />
                    <Skeleton className="h-[clamp(1.25rem,1.4vw,4rem)] w-[clamp(8rem,9vw,25rem)]" />
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full pt-[clamp(1rem,1.1vw,3rem)]">
              <Skeleton className="w-full aspect-video rounded-[10px]" />
            </div>

            <div className="flex flex-wrap gap-[clamp(0.75rem,0.85vw,3rem)] pt-[clamp(0.5rem,0.6vw,2rem)]">
              <Skeleton className="h-[clamp(2.5rem,2.8vw,8rem)] w-[clamp(10rem,11vw,30rem)] rounded-[100px]" />
              <Skeleton className="h-[clamp(2.5rem,2.8vw,8rem)] w-[clamp(8rem,9vw,25rem)] rounded-[100px]" />
            </div>

            <div className="flex flex-col gap-[clamp(1.5rem,1.6vw,4rem)] pt-[clamp(1rem,1.1vw,3rem)]">
              <div className="flex flex-col gap-[clamp(0.5rem,0.6vw,2rem)]">
                <Skeleton className="h-[clamp(1.5rem,1.7vw,5rem)] w-[clamp(12rem,13vw,35rem)]" />
                <div className="flex flex-col gap-[clamp(0.375rem,0.45vw,1.5rem)] mt-[clamp(0.5rem,0.6vw,2rem)]">
                  <Skeleton className="h-[clamp(1rem,1.1vw,3rem)] w-full" />
                  <Skeleton className="h-[clamp(1rem,1.1vw,3rem)] w-11/12" />
                  <Skeleton className="h-[clamp(1rem,1.1vw,3rem)] w-full" />
                  <Skeleton className="h-[clamp(1rem,1.1vw,3rem)] w-4/5" />
                </div>
              </div>
            </div>
          </div>
        </BentoCard>
      </div>
    );
  }

  return (
    <div>
      <BentoCard>
        <div className="animate-in fade-in duration-700 delay-300 fill-mode-both transform-gpu will-change-transform flex flex-col gap-[clamp(1.25rem,1.3vw,4rem)]">
          <button onClick={() => navigate(-1)}>
            <div className="p-[clamp(0.5rem,0.6vw,2rem)] w-fit rounded-[100px] outline-1 outline-zinc-200 cursor-pointer dark:outline-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors  dark:bg-zinc-900/50">
              <ChevronLeft
                strokeWidth={1.5}
                className="stroke-black dark:stroke-white w-[clamp(1.25rem,1.5vw,4rem)] h-[clamp(1.25rem,1.5vw,4rem)]"
              />
            </div>
          </button>

          <div className="flex flex-col gap-[clamp(0.75rem,0.85vw,3rem)]">
            <div className="flex items-center gap-[clamp(0.75rem,0.85vw,3rem)]">
              <h1 className="font-semibold text-[clamp(30px,2.6vw,9rem)] text-zinc-900 dark:text-zinc-100">
                {project.title}
              </h1>
              {project.status === "Public" ? (
                <p className="text-[#35BF46] text-[clamp(14px,1vw,3.5rem)] px-[clamp(0.75rem,0.85vw,3rem)] border py-[clamp(0.25rem,0.3vw,1.5rem)] rounded-4xl border-[#C2F49E] bg-[#F6FFDD]">
                  Public
                </p>
              ) : (
                <p className="text-zinc-500 text-[clamp(14px,1vw,3.5rem)] px-[clamp(0.75rem,0.85vw,3rem)] border py-[clamp(0.25rem,0.3vw,1.5rem)] rounded-4xl border-zinc-300 bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700">
                  Private
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-[clamp(0.5rem,0.6vw,2rem)]">
              {project.techStack?.map((tech) => (
                <p
                  key={tech}
                  className="text-zinc-500 dark:text-zinc-400 text-[clamp(12px,0.85vw,2.5rem)] w-fit px-2 border py-[clamp(0.125rem,0.2vw,1rem)] rounded-[5px] border-zinc-300 dark:border-zinc-800"
                >
                  {tech}
                </p>
              ))}
            </div>

            <div className="flex flex-col gap-[clamp(0.75rem,0.85vw,3rem)] mt-[clamp(0.25rem,0.3vw,1.5rem)]">
              <div className="flex gap-[clamp(0.75rem,0.9vw,3rem)] items-center">
                <div className="shrink-0 text-zinc-800 dark:text-zinc-200">
                  <User
                    strokeWidth={1.5}
                    className="w-[clamp(1.1rem,1.5vw,4rem)] h-[clamp(1.1rem,1.5vw,4rem)]"
                  />
                </div>
                <p className="text-[clamp(14px,1vw,3.5rem)] text-zinc-700 dark:text-zinc-300">
                  {project.role}
                </p>
              </div>
              <div className="flex gap-[clamp(0.75rem,0.9vw,3rem)] items-center">
                <div className="shrink-0 text-zinc-800 dark:text-zinc-200">
                  <ChartColumnStacked
                    strokeWidth={1.5}
                    className="w-[clamp(1.1rem,1.5vw,4rem)] h-[clamp(1.1rem,1.5vw,4rem)]"
                  />
                </div>
                <p className="text-[clamp(14px,1vw,3.5rem)] text-zinc-700 dark:text-zinc-300">
                  {project.type}
                </p>
              </div>
              <div className="flex gap-[clamp(0.75rem,0.9vw,3rem)]  items-center">
                <div className="shrink-0 text-zinc-800 dark:text-zinc-200">
                  <Calendar
                    strokeWidth={1.5}
                    className="w-[clamp(1.1rem,1.5vw,4rem)] h-[clamp(1.1rem,1.5vw,4rem)]"
                  />
                </div>
                <p className="text-[clamp(14px,1vw,3.5rem)] text-zinc-700 dark:text-zinc-300">
                  {project.duration}
                </p>
              </div>
            </div>
          </div>

          {project.content?.images?.[0] && (
            <div className="w-full pt-[clamp(1rem,1.1vw,3rem)]">
              <img
                src={project.content.images[0]}
                alt={`${project.title} Preview`}
                className="w-full rounded-[10px] ring-1 ring-black/5 dark:ring-white/10 "
              />
            </div>
          )}

          <div className="flex flex-wrap gap-[clamp(0.75rem,0.85vw,3rem)] pt-[clamp(0.5rem,0.6vw,2rem)]">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-[clamp(0.5rem,0.6vw,2rem)] px-[clamp(1.25rem,1.4vw,4rem)] py-[clamp(0.625rem,0.75vw,2rem)] bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[clamp(14px,1vw,3.5rem)] font-medium rounded-[100px] hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
              >
                <GitFork
                  strokeWidth={1.5}
                  className="w-[clamp(1.1rem,1.3vw,3.5rem)] h-[clamp(1.1rem,1.3vw,3.5rem)]"
                />
                View Source Code
              </a>
            )}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-[clamp(0.5rem,0.6vw,2rem)] px-[clamp(1.25rem,1.4vw,4rem)] py-[clamp(0.625rem,0.75vw,2rem)] bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-700 text-[clamp(14px,1vw,3.5rem)] font-medium rounded-[100px] hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <TvMinimalPlay
                  strokeWidth={1.5}
                  className="w-[clamp(1.1rem,1.3vw,3.5rem)] h-[clamp(1.1rem,1.3vw,3.5rem)]"
                />
                Live Demo
              </a>
            )}
          </div>

          <div className="flex flex-col gap-[clamp(1.5rem,1.6vw,4rem)] pt-[clamp(1rem,1.1vw,3rem)]">
            {project.content?.overview && (
              <div className="flex flex-col gap-[clamp(0.5rem,0.6vw,2rem)]">
                <h2 className="text-[clamp(20px,1.4vw,5rem)] font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                  Project Overview
                </h2>
                <p className="font-light text-[clamp(15px,1.1vw,4rem)] leading-relaxed lg:leading-loose text-zinc-600 dark:text-zinc-400 tracking-wide">
                  {project.content.overview}
                </p>
              </div>
            )}

            {project.content?.gallery && project.content.gallery.length > 0 && (
              <div className="flex flex-col gap-[clamp(0.75rem,0.85vw,3rem)] pt-[clamp(0.5rem,0.6vw,2rem)]">
                <h2 className="text-[clamp(20px,1.4vw,5rem)] font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                  Project Highlights
                </h2>

                <div className="grid grid-cols-1 gap-[clamp(0.75rem,1.4vw,4rem)]">
                  {project.content.gallery.map((img, idx) => (
                    <div
                      key={idx}
                      className="w-full rounded-[10px] overflow-hidden ring-1 ring-black/5 dark:ring-white/10  bg-zinc-100 dark:bg-zinc-800 group"
                    >
                      <img
                        src={img}
                        alt={`${project.title} screenshot ${idx + 1}`}
                        className="w-full h-full object-contain transition-transform duration-500 ease-out "
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {project.content?.features &&
              project.content.features.length > 0 && (
                <div className="flex flex-col gap-[clamp(0.5rem,0.6vw,2rem)] pt-[clamp(0.5rem,0.6vw,2rem)]">
                  <h2 className="text-[clamp(20px,1.4vw,5rem)] font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                    Key Features
                  </h2>
                  <ul className="list-disc pl-[clamp(1.5rem,1.6vw,4rem)] space-y-[clamp(0.75rem,0.85vw,3rem)] font-light text-[clamp(15px,1.1vw,4rem)] leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {project.content.features.map((feature, idx) => (
                      <li key={idx}>
                        <strong className="font-medium text-zinc-900 dark:text-zinc-200">
                          {feature.title}:{" "}
                        </strong>
                        {feature.desc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        </div>
      </BentoCard>
    </div>
  );
}

export default ProjectSelectedContent;
