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
                  <Skeleton className="h-4 w-[60%] lg:w-[250px] bg-white/20" />
                </div>
              </div>

              <div className="flex lg:flex-row flex-col items-start gap-3 mt-1 lg:mt-2">
                <Skeleton className="w-full sm:w-[140px] h-[46px] lg:h-[38px] rounded-[10px] bg-white/20" />
                <Skeleton className="w-full sm:w-[180px] h-[46px] lg:h-[38px] rounded-[10px] bg-white/20" />
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
    <div className="w-full flex flex-col gap-3 lg:p-0 p-3 lg:overflow-y-auto lg:no-scrollbar lg:py-3 select-none">
      <div className="w-full flex flex-col bg-linear-to-t from-black/90 via-black/50 to-black/20 lg:bg-linear-to-r lg:from-black/90 lg:via-black/40 lg:to-transparent rounded-[14px]  shrink-0 overflow-hidden relative group">
        <div
          key="hero-m"
          className="animate-in fade-in duration-700 delay-150 fill-mode-both transform-gpu will-change-transform w-full relative h-90 sm:h-80 lg:h-72"
        >
          <video
            src="https://res.cloudinary.com/dxatb3m2q/video/upload/q_auto,f_auto/v1775295681/lightmode-cover_lmrfig.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover dark:hidden"
          />
          <video
            src="https://res.cloudinary.com/dxatb3m2q/video/upload/q_auto,f_auto/v1775295646/darkmode-cover_bmgsuh.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover hidden dark:block"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/20 lg:bg-linear-to-r lg:from-black/90 lg:via-black/40 lg:to-transparent"></div>

          {/* The Clock (Top Right) */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-black/30 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 shadow-sm">
            <Calendar className="w-3.5 h-3.5 lg:w-4 lg:h-4 stroke-white" />
            <span className="font-medium text-white text-[11px] lg:text-[12px] tracking-wide">
              {currentDate}
            </span>
          </div>

          <div className="absolute bottom-5 left-5 right-5 lg:bottom-8 lg:left-8 lg:right-auto z-20 flex flex-col gap-3 lg:gap-4 max-w-lg">
            <div className="flex flex-col gap-1">
              <h1 className="text-white font-bold text-[26px] leading-[1.1] sm:text-3xl lg:text-4xl tracking-tight">
                Crafting clean & <br className="hidden sm:block" /> dynamic
                digital systems.
              </h1>
              <p className="text-zinc-300 font-light text-[13px] sm:text-[14px] lg:text-[15px] mt-1 lg:mt-2 leading-relaxed max-w-[90%] lg:max-w-md">
                Bridging the gap between sleek front-end designs and robust
                back-end architecture. Let's build something impactful.
              </p>
            </div>

            <div className="flex lg:flex-row flex-col items-start gap-3 mt-1 lg:mt-2">
              <button
                className="w-full sm:w-auto cursor-pointer rounded-[10px] bg-white text-zinc-900 hover:bg-zinc-200 transition-all duration-200 px-6 py-3 lg:py-2 lg:px-4 font-medium text-[14px] flex justify-center"
                asChild
              >
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=lancemagollado46@gmail.com&su=Hi,%20Let%20us%20connect!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 lg:w-4 lg:h-4 stroke-black" />
                  Message Me
                </a>
              </button>

              {/* Status Badge */}
              <div className="flex w-full sm:w-auto justify-center sm:justify-start items-center gap-2 text-white/90 text-[14px] px-4 py-2.5 lg:py-2 rounded-[10px] bg-white/10 backdrop-blur-md border border-white/20">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                Open to Collaborate
              </div>
            </div>
          </div>
        </div>
      </div>
      <BentoCard
        title={"Stats"}
        icon={<ChartNoAxesCombined className={"stroke-black"} />}
      >
        <div
          key="stats-m"
          className="animate-in fade-in duration-700 delay-200 fill-mode-both transform-gpu will-change-transform grid lg:grid-cols-4 gap-3 grid-cols-2"
        >
          <div className="w-full gap-1 bg-secondary rounded-[10px] p-4 flex justify-evenly flex-col">
            <div className="flex items-center gap-3">
              <ExperienceIcon />
              <div className="flex items-center flex-1 justify-between">
                <span className="font-semibold text-[30px]">{experience}</span>
                <span className="font-light text-sm lg:text-base">Years</span>
              </div>
            </div>
            <span className="font-medium lg:text-base text-sm">Experience</span>
          </div>
          <div className="w-full gap-1 bg-secondary rounded-[10px] p-4 flex justify-evenly flex-col">
            <div className="flex items-center gap-3">
              <CertificateIcon />
              <div className="flex items-center flex-1 justify-between">
                <span className="font-semibold text-[30px]">
                  {achievementsData.length}
                </span>
              </div>
            </div>
            <span className="font-medium lg:text-base text-sm">
              Certificates
            </span>
          </div>
          <div className="w-full gap-1 bg-secondary rounded-[10px] p-4 flex justify-evenly flex-col">
            <div className="flex items-center gap-3">
              <ProjectsIcon />
              <div className="flex items-center flex-1 justify-between">
                <span className="font-semibold text-[30px]">
                  {projectsData.length}
                </span>
              </div>
            </div>
            <span className="font-medium lg:text-base text-sm">Projects</span>
          </div>
          <div className="w-full gap-1 bg-secondary rounded-[10px] p-4 flex justify-evenly flex-col">
            <div className="flex items-center gap-3">
              <TechnologyIcon />

              <div className="flex items-center flex-1 justify-between">
                <span className="font-semibold text-[30px]">
                  {techStackData.length}
                </span>
              </div>
            </div>
            <span className="font-medium lg:text-base text-sm">
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
          className={`group animate-in fade-in fill-mode-both transform-gpu will-change-transform absolute right-5 z-10 top-37.5 bg-[#00000040] p-2 rounded-[100px] transition duration-75 ease-in ${canHighlightsRight ? "cursor-pointer hover:bg-[#3FA6F4]" : "cursor-not-allowed opacity-30 "}`}
          onClick={() =>
            canHighlightsRight && scrollCarousel(highlightsRef, "right")
          }
        >
          <ChevronRight
            strokeWidth={1.25}
            className={`w-[30px] h-[30px] transition-colors duration-75 ${canHighlightsRight ? "stroke-black group-hover:stroke-white" : "stroke-black"}`}
          />
        </div>
        <div
          className={`group absolute animate-in fade-in fill-mode-both transform-gpu will-change-transform left-5 z-10 top-37.5 bg-[#00000040] p-2 rounded-[100px] transition duration-75 ease-in ${canHighlightsLeft ? "cursor-pointer hover:bg-[#3FA6F4]" : "cursor-not-allowed opacity-30 "}`}
          onClick={() =>
            canHighlightsLeft && scrollCarousel(highlightsRef, "left")
          }
        >
          <ChevronLeft
            strokeWidth={1.25}
            className={`w-[30px] h-[30px] transition-colors duration-75 ${canHighlightsLeft ? "stroke-black group-hover:stroke-white" : "stroke-black"}`}
          />
        </div>
        <div
          key="highlights-m"
          className="animate-in fade-in duration-700 delay-250 fill-mode-both transform-gpu will-change-transform flex w-full gap-3 overflow-x-auto no-scrollbar justify-between"
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
              className="flex flex-col w-57.5 shrink-0 bg-white dark:bg-zinc-900/40 rounded-2xl border border-zinc-200 dark:border-zinc-800  transition-all duration-300 overflow-hidden group cursor-pointer"
            >
              <div className="w-full aspect-14/10 bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out "
                />
              </div>

              <div className="w-full flex flex-col justify-between flex-1 p-4 gap-2">
                <h1 className="font-semibold text-zinc-900 dark:text-zinc-100 lg:text-[16px] text-[14px] leading-snug line-clamp-2">
                  {post.title}
                </h1>

                <div className="flex items-center gap-1.5 mt-auto">
                  <Clock className="stroke-ring w-3.5" />
                  <p className="font-light text-[12px] text-ring">
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
