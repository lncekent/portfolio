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
          <div className="flex flex-col gap-5">
            <Skeleton className="w-10 h-10 rounded-full" />

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-3/4 lg:w-1/2" />
                <Skeleton className="h-6 w-20 rounded-4xl" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-14" />
              </div>
              <div className="flex flex-col gap-3 mt-1">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex lg:gap-3 gap-2 items-center">
                    <Skeleton className="lg:w-6 lg:h-6 w-4 h-4 rounded-full" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full pt-4">
              <Skeleton className="w-full aspect-video rounded-[10px]" />
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Skeleton className="h-10 w-40 rounded-[100px]" />
              <Skeleton className="h-10 w-32 rounded-[100px]" />
            </div>

            <div className="flex flex-col gap-6 pt-4">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-48" />
                <div className="flex flex-col gap-1.5 mt-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-11/12" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
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
        <div className="animate-in fade-in duration-700 delay-300 fill-mode-both transform-gpu will-change-transform flex flex-col gap-5">
          <button onClick={() => navigate(-1)}>
            <div className="p-2 w-fit rounded-[100px] outline-1 outline-zinc-200 cursor-pointer dark:outline-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors  dark:bg-zinc-900/50">
              <ChevronLeft
                strokeWidth={1.5}
                className="stroke-black dark:stroke-white"
              />
            </div>
          </button>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <h1 className="font-semibold lg:text-4xl text-3xl text-zinc-900 dark:text-zinc-100">
                {project.title}
              </h1>
              {project.status === "Public" ? (
                <p className="text-[#35BF46] text-[14px] px-3 border py-1 rounded-4xl border-[#C2F49E] bg-[#F6FFDD]">
                  Public
                </p>
              ) : (
                <p className="text-zinc-500 text-[14px] px-3 border py-1 rounded-4xl border-zinc-300 bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700">
                  Private
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {project.techStack?.map((tech) => (
                <p
                  key={tech}
                  className="text-zinc-500 dark:text-zinc-400 text-[12px] w-fit px-2 border py-0.5 rounded-[5px] border-zinc-300 dark:border-zinc-800"
                >
                  {tech}
                </p>
              ))}
            </div>

            <div className="flex flex-col gap-3 mt-1">
              <div className="flex lg:gap-3 gap-4 items-center">
                <div className="lg:w-6 w-4 text-zinc-800 dark:text-zinc-200">
                  <User strokeWidth={1.5} />
                </div>
                <p className="lg:text-base text-sm text-zinc-700 dark:text-zinc-300">
                  {project.role}
                </p>
              </div>
              <div className="flex lg:gap-3 gap-4 items-center">
                <div className="lg:w-6 w-4 text-zinc-800 dark:text-zinc-200">
                  <ChartColumnStacked strokeWidth={1.5} />
                </div>
                <p className="text-sm lg:text-base text-zinc-700 dark:text-zinc-300">
                  {project.type}
                </p>
              </div>
              <div className="flex lg:gap-3 gap-4  items-center">
                <div className="lg:w-6 w-4 text-zinc-800 dark:text-zinc-200">
                  <Calendar strokeWidth={1.5} />
                </div>
                <p className="text-sm lg:text-base text-zinc-700 dark:text-zinc-300">
                  {project.duration}
                </p>
              </div>
            </div>
          </div>

          {project.content?.images?.[0] && (
            <div className="w-full pt-4">
              <img
                src={project.content.images[0]}
                alt={`${project.title} Preview`}
                className="w-full rounded-[10px] ring-1 ring-black/5 dark:ring-white/10 "
              />
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[14px] font-medium rounded-[100px] hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
              >
                <GitFork strokeWidth={1.5} />
                View Source Code
              </a>
            )}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-700 text-[14px] font-medium rounded-[100px] hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <TvMinimalPlay strokeWidth={1.5} />
                Live Demo
              </a>
            )}
          </div>

          <div className="flex flex-col gap-6 pt-4">
            {project.content?.overview && (
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                  Project Overview
                </h2>
                <p className="font-light lg:text-[16px] text-[15px] leading-relaxed lg:leading-loose text-zinc-600 dark:text-zinc-400 tracking-wide">
                  {project.content.overview}
                </p>
              </div>
            )}

            {project.content?.gallery && project.content.gallery.length > 0 && (
              <div className="flex flex-col gap-3 pt-2">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                  Project Highlights
                </h2>

                <div className="grid grid-cols-1 lg:gap-6 gap-3">
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
                <div className="flex flex-col gap-2 pt-2">
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                    Key Features
                  </h2>
                  <ul className="list-disc pl-6 space-y-3 font-light lg:text-[16px] text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
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
