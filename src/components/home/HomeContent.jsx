import { useState, useEffect, useRef } from "react";
import BentoCard from "../BentoCard";
import { achievementsData, projectsData, techStackData } from "@/data";
import { blogsData } from "@/data";
import { Link } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import {
  Pin,
  ChartNoAxesCombined,
  Clock,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Send,
} from "lucide-react";
import ExperienceIcon from "@/assets/home/experience-svg.svg?react";
import CertificateIcon from "@/assets/home/certificate-svg.svg?react";
import ProjectsIcon from "@/assets/home/projects-svg.svg?react";
import TechnologyIcon from "@/assets/home/technology-svg.svg?react";

let isLoaded = false;

function Content() {
  const [currentDate, setCurrrentDate] = useState("");

  useEffect(() => {
    const getDate = () => {
      const today = new Date();

      const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
      const monthName = today.toLocaleDateString("en-US", { month: "long" });
      const day = today.getDate();
      const year = today.getFullYear();

      const timePart = today
        .toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
        .toUpperCase();

      setCurrrentDate(`${dayName}, ${year} ${monthName} ${day}, ${timePart}`);
    };

    getDate();

    const intervalId = setInterval(getDate, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const highlightsRef = useRef(null);
  const [canHighlightsLeft, setcanHighlightsLeft] = useState(false);
  const [canHighlightsRight, setcanHighlightsRight] = useState(true);

  const scrollCarousel = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleScroll = (ref, setLeft, setRight) => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      setLeft(scrollLeft > 0);
      setRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  // Re-check carousel button state on resize (zoom in/out)
  useEffect(() => {
    const el = highlightsRef.current;
    if (!el) return;
    const check = () =>
      handleScroll(highlightsRef, setcanHighlightsLeft, setcanHighlightsRight);
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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

  const startYear = 2024;
  const currentYear = new Date().getFullYear();
  const experience = currentYear - startYear;

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-3 lg:p-0 p-3 lg:overflow-y-auto no-scrollbar lg:py-3 select-none ">
        {/* Hero Banner Skeleton */}
        <div className="w-full flex flex-col rounded-[14px] shrink-0 overflow-hidden relative group select-none">
          <Skeleton className="w-full absolute inset-0 z-0 rounded-none " />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/20 lg:bg-linear-to-r lg:from-black/90 lg:via-black/40 lg:to-transparent z-10 pointer-events-none"></div>

          <div className="w-full relative h-90 sm:h-80 lg:h-72 z-20">
            {/* The Clock Skeleton */}
            <div className="absolute top-4 right-4 z-20">
              <Skeleton className="w-36 h-8 rounded-full bg-white/20" />
            </div>

            {/* Overlay Content Skeleton */}
            <div className="absolute bottom-5 left-5 right-5 lg:bottom-8 lg:left-8 lg:right-auto z-20 flex flex-col gap-3 lg:gap-4 max-w-lg text-white">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-8 lg:h-10 w-3/4 bg-white/20" />
                <Skeleton className="h-8 lg:h-10 w-1/2 bg-white/20" />
                <div className="mt-1 lg:mt-3 flex flex-col gap-2 w-full">
                  <Skeleton className="h-4 w-[90%] bg-white/20" />
                  <Skeleton className="h-4 w-[80%] bg-white/20" />
                  <Skeleton className="h-4 w-[60%] lg:w-62.5 bg-white/20" />
                </div>
              </div>

              <div className="flex lg:flex-row flex-col items-start gap-3 mt-1 lg:mt-2">
                <Skeleton className="w-full sm:w-35 h-11.5 lg:h-9.5 rounded-[10px] bg-white/20" />
                <Skeleton className="w-full sm:w-45 h-11.5 lg:h-9.5 rounded-[10px] bg-white/20" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Skeleton */}
        {/* Napansin mo ba? Ginamit pa rin natin ang BentoCard para sa container, pero Skeleton ang nasa loob */}
        <BentoCard
          title={"Stats"}
          icon={<ChartNoAxesCombined className={"stroke-black"} />}
        >
          <div className="grid lg:grid-cols-4 gap-3 grid-cols-2">
            {/* Gagamit tayo ng simpleng array [1,2,3,4] para mag-map ng 4 na skeleton boxes */}
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="w-full h-32 rounded-[10px]" />
            ))}
          </div>
        </BentoCard>

        {/* Highlights Skeleton */}
        <BentoCard
          title={"Highlights"}
          icon={<Pin className={"stroke-black"} />}
        >
          <div className="flex w-full gap-3 overflow-x-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col w-57.5 shrink-0 gap-3">
                {/* Image Skeleton */}
                <Skeleton className="w-full aspect-14/10 rounded-2xl" />
                {/* Title and Text Skeletons */}
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </BentoCard>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-[clamp(12px,0.85vw,4rem)] lg:p-0 p-3 lg:overflow-y-auto lg:no-scrollbar lg:py-[clamp(12px,0.85vw,4rem)] select-none">
      {/* Banner Section */}
      <div className="w-full flex flex-col bg-linear-to-t from-black/90 via-black/50 to-black/20 lg:bg-linear-to-r lg:from-black/90 lg:via-black/40 lg:to-transparent rounded-[clamp(10px,1vw,3rem)]  shrink-0 overflow-hidden relative group">
        <div
          key="hero-m"
          className="animate-in fade-in duration-700 delay-150 fill-mode-both transform-gpu will-change-transform w-full relative aspect-video sm:aspect-16/7  min-h-75 lg:min-h-80 xl:min-h-80 h-auto"
        >
          <video
            src="https://res.cloudinary.com/dxatb3m2q/video/upload/q_auto:best,f_auto,w_1280,vc_auto/v1779602558/lightmode-banner_gcmym1.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover dark:hidden"
          />
          <video
            src="https://res.cloudinary.com/dxatb3m2q/video/upload/q_auto:best,f_auto,w_1280,vc_auto/v1779602238/darkmode-banner_fr1voe.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover hidden dark:block"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/20 lg:bg-linear-to-r lg:from-black/90 lg:via-black/40 lg:to-transparent"></div>

          {/* The Clock (Top Right) */}
          <div className="absolute top-[clamp(0.75rem,1.2vw,3.75rem)] right-[clamp(0.75rem,1.2vw,3.75rem)] z-20 flex items-center gap-[clamp(0.375rem,0.5vw,2rem)] bg-black/30 backdrop-blur-md border border-white/10 rounded-full px-[clamp(0.625rem,0.8vw,3rem)] py-[clamp(0.25rem,0.4vw,2rem)] shadow-sm">
            <Calendar className="w-[clamp(16px,1.2vw,7rem)] h-[clamp(16px,1.2vw,7rem)] stroke-white" />
            <span className="font-medium text-white text-[clamp(12px,1vw,3rem)] tracking-wide">
              {currentDate}
            </span>
          </div>

          <div className="absolute bottom-[clamp(1.25rem,2.5vw,5.75rem)] left-[clamp(1.25rem,2.5vw,5.75rem)] z-20 flex flex-col gap-[clamp(12px,1.1vw,6rem)] max-w-[85%] lg:max-w-[68%] w-full">
            <div className="flex flex-col gap-[clamp(4px,0.30vw,2rem)]">
              <h1 className="text-white font-bold leading-[1.1] text-[clamp(1.625rem,2.8vw,9.25rem)] tracking-tight">
                Crafting clean & <br className="hidden sm:block" /> dynamic
                digital systems.
              </h1>
              <p className="text-zinc-300 font-light mt-1 lg:mt-2 leading-relaxed text-[clamp(0.8125rem,1.1vw,3rem)] ">
                Bridging the gap between sleek front-end designs and robust
                back-end architecture. Let's build something impactful.
              </p>
            </div>

            <div className="flex lg:flex-row flex-col items-start gap-[clamp(0.5rem,0.9vw,1.875rem)] mt-1 lg:mt-2">
              <button
                className="w-full sm:w-auto cursor-pointer rounded-[clamp(10px,0.7vw,3rem)] bg-white text-zinc-900 hover:bg-zinc-200 transition-all duration-200 flex text-[clamp(0.8125rem,0.95vw,120px)] px-[clamp(1.25rem,1.5vw,5.25rem)] py-[clamp(0.5rem,0.7vw,4.875rem)] justify-center"
                asChild
              >
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=lancemagollado46@gmail.com&su=Hi,%20Let%20us%20connect!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-[clamp(0.375rem,0.5vw,2rem)]"
                >
                  <Send className="w-[clamp(0.875rem,1vw,4rem)] h-[clamp(0.875rem,1vw,4rem)] stroke-black" />
                  Message Me
                </a>
              </button>

              {/* Status Badge */}
              <div className="flex w-full sm:w-auto justify-center sm:justify-start items-center gap-[clamp(0.375rem,0.5vw,2rem)] text-white/90 text-[clamp(0.8125rem,0.95vw,5rem)] px-[clamp(1.25rem,1.5vw,5.25rem)] py-[clamp(0.5rem,0.7vw,4.875rem)] rounded-[clamp(10px,0.7vw,3rem)] bg-white/10 backdrop-blur-md border border-white/20">
                <span className="relative flex h-[clamp(0.5rem,0.6vw,2.5rem)] w-[clamp(0.5rem,0.6vw,2.5rem)]">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-full w-full bg-green-500"></span>
                </span>
                Open to Collaborate
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <BentoCard
        title={"Stats"}
        icon={<ChartNoAxesCombined className={"stroke-black"} />}
      >
        <div
          key="stats-m"
          className="animate-in fade-in duration-700 delay-200 fill-mode-both transform-gpu will-change-transform grid lg:grid-cols-4 gap-[clamp(0.5rem,0.7vw,3rem)] grid-cols-2"
        >
          <div className="w-full gap-[clamp(0.25rem,0.5vw,2rem)] bg-secondary rounded-[clamp(10px,0.7vw,2rem)] p-[clamp(0.75rem,1.3vw,5rem)] flex justify-evenly flex-col">
            <div className="flex items-center gap-[clamp(0.5rem,0.9vw,3rem)]">
              <ExperienceIcon className="w-[clamp(1.5rem,2vw,8rem)] h-[clamp(1.5rem,2vw,8rem)]" />
              <div className="flex items-center flex-1 justify-between">
                <span className="font-semibold text-[clamp(1.875rem,2.2vw,9rem)]">
                  {experience}
                </span>
                <span className="font-light text-[clamp(1rem,1.1vw,4rem)]">
                  Years
                </span>
              </div>
            </div>
            <span className="font-medium text-[clamp(1rem,1.1vw,4rem)]">
              Experience
            </span>
          </div>
          <div className="w-full gap-[clamp(0.25rem,0.5vw,2rem)] bg-secondary rounded-[clamp(10px,0.7vw,2rem)] p-[clamp(0.75rem,1.3vw,5rem)] flex justify-evenly flex-col">
            <div className="flex items-center gap-[clamp(0.5rem,0.9vw,3rem)]">
              <CertificateIcon className="w-[clamp(1.5rem,2vw,8rem)] h-[clamp(1.5rem,2vw,8rem)]" />
              <div className="flex items-center flex-1 justify-between">
                <span className="font-semibold text-[clamp(1.875rem,2.2vw,9rem)]">
                  {achievementsData.length}
                </span>
              </div>
            </div>
            <span className="font-medium text-[clamp(1rem,1.1vw,4rem)]">
              Certificates
            </span>
          </div>
          <div className="w-full gap-[clamp(0.25rem,0.5vw,2rem)] bg-secondary rounded-[clamp(10px,0.7vw,2rem)] p-[clamp(0.75rem,1.3vw,5rem)] flex justify-evenly flex-col">
            <div className="flex items-center gap-[clamp(0.5rem,0.9vw,3rem)]">
              <ProjectsIcon className="w-[clamp(1.5rem,2vw,8rem)] h-[clamp(1.5rem,2vw,8rem)]" />
              <div className="flex items-center flex-1 justify-between">
                <span className="font-semibold text-[clamp(1.875rem,2.2vw,9rem)]">
                  {projectsData.length}
                </span>
              </div>
            </div>
            <span className="font-medium text-[clamp(1rem,1.1vw,4rem)]">
              Projects
            </span>
          </div>
          <div className="w-full gap-[clamp(0.25rem,0.5vw,2rem)] bg-secondary rounded-[clamp(10px,0.7vw,2rem)] p-[clamp(0.75rem,1.3vw,5rem)] flex justify-evenly flex-col">
            <div className="flex items-center gap-[clamp(0.5rem,0.9vw,3rem)]">
              <TechnologyIcon className="w-[clamp(1.5rem,2vw,8rem)] h-[clamp(1.5rem,2vw,8rem)]" />

              <div className="flex items-center flex-1 justify-between">
                <span className="font-semibold text-[clamp(1.875rem,2.2vw,9rem)]">
                  {techStackData.length}
                </span>
              </div>
            </div>
            <span className="font-medium text-[clamp(1rem,1.1vw,4rem)]">
              Technologies
            </span>
          </div>
        </div>
      </BentoCard>
      <BentoCard
        icon={<Pin className={"stroke-black"} />}
        title={"Highlights"}
        className="relative"
      >
        <div
          className={`group animate-in fade-in fill-mode-both transform-gpu will-change-transform absolute right-[clamp(0.75rem,1.2vw,4rem)] z-10 top-1/2 -translate-y-1/2 bg-[#00000040] p-[clamp(0.375rem,0.5vw,2rem)] rounded-[100px] transition duration-75 ease-in ${canHighlightsRight ? "cursor-pointer hover:bg-[#3FA6F4]" : "cursor-not-allowed opacity-30 "}`}
          onClick={() =>
            canHighlightsRight && scrollCarousel(highlightsRef, "right")
          }
        >
          <ChevronRight
            strokeWidth={1.25}
            className={`w-[clamp(1.5rem,1.8vw,7rem)] h-[clamp(1.5rem,1.8vw,7rem)] transition-colors duration-75 ${canHighlightsRight ? "stroke-black group-hover:stroke-white" : "stroke-black"}`}
          />
        </div>
        <div
          className={`group absolute animate-in fade-in fill-mode-both transform-gpu will-change-transform left-[clamp(0.75rem,1.2vw,4rem)] z-10 top-1/2 -translate-y-1/2 bg-[#00000040] p-[clamp(0.375rem,0.5vw,2rem)] rounded-[100px] transition duration-75 ease-in ${canHighlightsLeft ? "cursor-pointer hover:bg-[#3FA6F4]" : "cursor-not-allowed opacity-30 "}`}
          onClick={() =>
            canHighlightsLeft && scrollCarousel(highlightsRef, "left")
          }
        >
          <ChevronLeft
            strokeWidth={1.25}
            className={`w-[clamp(1.5rem,1.8vw,7rem)] h-[clamp(1.5rem,1.8vw,7rem)] transition-colors duration-75 ${canHighlightsLeft ? "stroke-black group-hover:stroke-white" : "stroke-black"}`}
          />
        </div>
        <div
          key="highlights-m"
          className="animate-in fade-in duration-700 delay-250 fill-mode-both transform-gpu will-change-transform flex w-full gap-[clamp(0.5rem,0.7vw,3rem)] overflow-x-auto no-scrollbar justify-between"
          ref={highlightsRef}
          onScroll={() =>
            handleScroll(
              highlightsRef,
              setcanHighlightsLeft,
              setcanHighlightsRight,
            )
          }
        >
          {blogsData.slice(0, 5).map((post) => (
            <Link
              key={post.id}
              to={`/blog-selected/${post.slug}`}
              className="flex flex-col flex-1 min-w-55 lg:min-w-[clamp(220px,16vw,800px)] max-w-none bg-white dark:bg-zinc-900/40 rounded-[clamp(0.75rem,1vw,3rem)] border border-zinc-200 dark:border-zinc-800 transition-all duration-300 overflow-hidden group cursor-pointer"
            >
              <div className="w-full aspect-14/10 bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out "
                />
              </div>

              <div className="w-full flex flex-col justify-between flex-1 p-[clamp(0.75rem,1.2vw,5rem)] gap-[clamp(0.375rem,0.6vw,2.5rem)]">
                <h1 className="font-semibold text-zinc-900 dark:text-zinc-100 text-[clamp(1rem,1.1vw,5rem)] leading-snug line-clamp-2">
                  {post.title}
                </h1>

                <div className="flex items-center gap-[clamp(0.25rem,0.5vw,2rem)] mt-auto">
                  <Clock className="stroke-ring w-[clamp(0.75rem,1.1vw,5rem)] h-[clamp(0.75rem,1.1vw,5rem)]" />
                  <p className="font-light text-[clamp(0.6875rem,1.1vw,5rem)] text-ring line-clamp-1">
                    {post.date}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </BentoCard>
    </div>
  );
}

export default Content;
