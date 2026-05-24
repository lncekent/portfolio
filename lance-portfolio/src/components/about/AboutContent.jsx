import BentoCard from "../BentoCard";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import React, { useRef, useState, useEffect } from "react";
import AchievementCard from "../achievements/AchievementCard";
import { Skeleton } from "../ui/skeleton";
import { achievementsData } from "@/data";
import { blogsData } from "@/data";
import {
  User,
  Pin,
  Award,
  Send,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";

let isLoaded = false;

function AboutContent() {
  const highlightsRef = useRef(null);
  const [canHighlightsLeft, setcanHighlightsLeft] = useState(false);
  const [canHighlightsRight, setcanHighlightsRight] = useState(true);

  const [isExpanded, setIsExpanded] = useState();

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

  if (isLoading) {
    return (
      <div className="overflow-y-auto py-3 w-full gap-3 flex flex-col no-scrollbar select-none min-h-[101vh]">
        {/* Hero Banner Skeleton */}
        <div className="w-full flex flex-col rounded-[14px] shrink-0 overflow-hidden relative group select-none">
          <Skeleton className="w-full absolute inset-0 z-0 rounded-none " />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/20 lg:bg-linear-to-r lg:from-black/90 lg:via-black/50 lg:to-transparent z-10 pointer-events-none"></div>

          <div className="w-full relative h-70 sm:h-75 lg:h-64 z-20">
            <div className="absolute bottom-5 left-5 right-5 lg:bottom-8 lg:left-8 lg:right-auto z-20 flex flex-col gap-3 lg:gap-4 max-w-2xl">
              <div className="flex flex-col gap-2 w-full">
                <Skeleton className="h-8 lg:h-10 w-62.5 bg-white/20" />
                <div className="mt-1 lg:mt-3 flex flex-col gap-2 w-[95%] lg:w-112.5">
                  <Skeleton className="h-4 w-[90%] bg-white/20" />
                  <Skeleton className="h-4 w-[80%] bg-white/20" />
                  <Skeleton className="h-4 w-[70%] bg-white/20" />
                </div>
              </div>
              <div className="flex lg:flex-row flex-col items-start gap-3 mt-1 lg:mt-2 w-full lg:w-auto">
                <Skeleton className="w-[90%] sm:w-37.5 h-14 lg:h-6.5 rounded-[10px] bg-white/20" />
              </div>
            </div>
          </div>
        </div>

        <BentoCard
          title={"About"}
          icon={<User className="stroke-black" />}
          className="leading-5"
        >
          <div className="flex flex-col gap-1.5 w-full mt-2">
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </BentoCard>

        <BentoCard
          title={"Highlights"}
          icon={<Pin className="stroke-black" />}
          className="relative"
        >
          <div className="flex gap-3 overflow-x-hidden w-full">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col w-57.5 shrink-0 gap-3">
                <Skeleton className="w-full aspect-14/10 rounded-2xl" />
                <div className="flex flex-col gap-2 p-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </BentoCard>

        <BentoCard
          title={"Certificates"}
          icon={<Award className="stroke-black" />}
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col w-full gap-5 lg:pr-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`flex flex-col w-full ${i !== 5 ? "border-b border-zinc-100 dark:border-zinc-800/80 pb-5" : ""}`}
                >
                  <div className="flex gap-4 items-center">
                    <Skeleton className="w-13 h-13 rounded-[10px] shrink-0" />
                    <div className="flex flex-col gap-2 w-full">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BentoCard>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto py-3 w-full gap-3 flex flex-col no-scrollbar">
      <div className="w-full flex flex-col bg-linear-to-t from-black/90 via-black/50 to-black/20 lg:bg-linear-to-r lg:from-black/90 lg:via-black/40 lg:to-transparent rounded-[14px] shrink-0 overflow-hidden relative group select-none">
        <div className="animate-in fade-in duration-700 delay-150 fill-mode-both transform-gpu will-change-transform w-full relative h-70 sm:h-75 lg:h-64">
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
            preload="auto"
            className="w-full h-full object-cover hidden dark:block"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/20 lg:bg-linear-to-r lg:from-black/90 lg:via-black/50 lg:to-transparent"></div>
          <div className="absolute bottom-5 left-5 right-5 lg:bottom-8 lg:left-8 lg:right-auto z-20 flex flex-col gap-3 lg:gap-4 max-w-2xl">
            <div className="flex flex-col gap-1">
              <h1 className="text-white font-bold text-[28px] leading-[1.1] sm:text-3xl lg:text-4xl tracking-tight">
                Behind the code.
              </h1>
              <p className="text-zinc-300 font-light text-[14px] sm:text-[15px] lg:text-[16px] mt-1 lg:mt-2 leading-relaxed max-w-[95%] lg:max-w-lg">
                I'm an IT student from Quezon City, passionate about
                transforming complex problems into elegant, user-centric web
                solutions.
              </p>
            </div>

            <div className="flex lg:flex-row flex-col items-start gap-3 mt-1 lg:mt-2">
              <Button
                className="w-full sm:w-auto cursor-pointer rounded-[10px] bg-white text-zinc-900 hover:bg-zinc-200 shadow-sm transition-all duration-200 px-6 lg:px-8 py-5 lg:py-4 font-medium text-[14px] flex justify-center"
                asChild
              >
                <a
                  href="https://www.linkedin.com/in/lancemagollado/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Send className="stroke-black" />
                  Let's Connect
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <BentoCard
        title={"About"}
        icon={<User className="stroke-black" />}
        className="leading-5"
      >
        <div
          key="about-txt-m"
          className="animate-in fade-in duration-700 delay-200 fill-mode-both transform-gpu will-change-transform gap-3 "
        >
          <span className="text-[13px] lg:text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400 font-light">
            For over two years, I have been actively architecting digital
            solutions. My journey began with intensive full-stack projects—like
            BakeHub—which laid the foundation for my formal technical and
            leadership roles at StudyPool and LESIT.&nbsp;
          </span>
          {isExpanded && (
            <span className="text-[13px] lg:text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400 font-light">
              Today, Front-End Development is my primary domain—a space where
              precise logic meets creative design. My ultimate trajectory is to
              evolve into a Full-Stack Developer, equipping me to engineer
              scalable, end-to-end web applications of my own.&nbsp;
            </span>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[13px] lg:text-[14px] leading-relaxed text-[#3FA6F4] hover:underline cursor-pointer transition duration-200 ease-in-out font-medium"
          >
            {isExpanded ? "Read Less." : "Read More..."}
          </button>
        </div>
      </BentoCard>
      <BentoCard
        title={"Highlights"}
        icon={<Pin className="stroke-black" />}
        className=" relative"
      >
        <div
          className={`group absolute animate-in fade-in fill-mode-both transform-gpu will-change-transform right-5 z-10 top-37.5 bg-[#00000040] p-2 rounded-[100px] transition duration-75 ease-in ${canHighlightsRight ? "cursor-pointer hover:bg-[#3FA6F4]" : "cursor-not-allowed opacity-30 "}`}
          onClick={() =>
            canHighlightsRight && scrollCarousel(highlightsRef, "right")
          }
        >
          <ChevronRight
            strokeWidth={1.25}
            className={`w-7.5 h-7.5 transition-colors duration-75 ${canHighlightsRight ? "stroke-black group-hover:stroke-white" : "stroke-black"}`}
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
            className={`w-7.5 h-7.5 transition-colors duration-75 ${canHighlightsLeft ? "stroke-black group-hover:stroke-white" : "stroke-black"}`}
          />
        </div>
        <div
          className="animate-in fade-in duration-700 delay-250 fill-mode-both transform-gpu will-change-transform flex gap-3 overflow-x-auto no-scrollbar w-full justify-between"
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

              {/* TWEAK 3: The Text Section (Clean padding & flex alignment) */}
              <div className="w-full flex flex-col justify-between flex-1 p-4 gap-2">
                <h1 className="font-semibold text-zinc-900 dark:text-zinc-100 lg:text-[16px] text-[14px] leading-snug line-clamp-2">
                  {post.title}
                </h1>

                {/* TWEAK 4: The Date (Forced to the bottom with mt-auto) */}
                <div className="flex items-center gap-1.5 mt-auto">
                  <Clock className="w-3.5 text-ring" />
                  <p className="font-light text-[12px] text-ring">
                    {post.date}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </BentoCard>
      <BentoCard
        title={"Certificates"}
        icon={<Award className="stroke-black" />}
      >
        <div className="animate-in fade-in duration-700 delay-300 fill-mode-both transform-gpu will-change-transform flex flex-col gap-6">
          <div className="flex flex-col w-full gap-5 lg:pr-2">
            {achievementsData.slice(0, 5).map((cert, index) => (
              <div
                key={cert.id}
                className={`flex flex-col w-full ${index !== achievementsData.slice(0, 5).length - 1 ? "border-b border-zinc-100 dark:border-zinc-800/80 pb-5" : ""}`}
              >
                <AchievementCard
                  data={cert}
                  list={achievementsData.slice(0, 5)}
                  variant="list"
                />
              </div>
            ))}
          </div>
          <Link
            to={"/achievements"}
            className="text-center block text-[#3FA6F4] hover:underline lg:text-[15px] text-sm"
          >
            See More
          </Link>
        </div>
      </BentoCard>
    </div>
  );
}

export default AboutContent;
