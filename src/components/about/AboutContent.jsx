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
      <div className="overflow-y-auto py-[clamp(12px,0.85vw,3rem)] w-full gap-[clamp(12px,0.85vw,3rem)] flex flex-col no-scrollbar select-none min-h-[101vh] ">
        {/* Hero Banner Skeleton */}
        <div className="w-full flex flex-col rounded-[clamp(10px,1vw,3rem)] shrink-0 overflow-hidden relative group select-none">
          <Skeleton className="w-full absolute inset-0 z-0 rounded-none " />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/20 lg:bg-linear-to-r lg:from-black/90 lg:via-black/50 lg:to-transparent z-10 pointer-events-none"></div>

          <div className="w-full relative aspect-video sm:aspect-16/7 min-h-75 lg:min-h-70 xl:min-h-70 h-auto z-20">
            <div className="absolute bottom-[clamp(20px,2.2vw,5rem)] left-[clamp(20px,2.2vw,5rem)] right-5 lg:right-auto z-20 flex flex-col gap-[clamp(12px,1.1vw,3rem)]">
              <div className="flex flex-col gap-[clamp(4px,0.2vw,3rem)] w-full">
                <Skeleton className="h-[clamp(2.3rem,2.8vw,9.25rem)] w-[clamp(15rem,18vw,50rem)] bg-white/20" />
                <div className="mt-1 lg:mt-2 flex flex-col gap-[clamp(0.25rem,0.4vw,1.5rem)] max-w-[clamp(90%,50%,90%)]">
                  <Skeleton className="h-[clamp(0.8125rem,1.1vw,3.6rem)] w-[90%] bg-white/20" />
                  <Skeleton className="h-[clamp(0.8125rem,1.1vw,3.6rem)] w-[80%] bg-white/20" />
                  <Skeleton className="h-[clamp(0.8125rem,1.1vw,3.6rem)] w-[70%] bg-white/20" />
                </div>
              </div>
              <div className="flex lg:flex-row flex-col items-start gap-[clamp(12px,0.85vw,3rem)] mt-1 lg:mt-2 w-full lg:w-auto">
                <Skeleton className="w-full sm:w-auto sm:px-[clamp(1.25rem,1.5vw,5.25rem)] h-[clamp(2.5rem,3vw,9rem)] rounded-[clamp(10px,0.7vw,3rem)] bg-white/20" />
              </div>
            </div>
          </div>
        </div>

        <BentoCard
          title={"About"}
          icon={<User className="stroke-black" />}
          className="leading-5"
        >
          <div className="flex flex-col gap-[clamp(0.375rem,0.45vw,1.5rem)] w-full mt-[clamp(0.5rem,0.6vw,2rem)]">
            <Skeleton className="h-[clamp(1rem,1.1vw,3rem)] w-11/12" />
            <Skeleton className="h-[clamp(1rem,1.1vw,3rem)] w-full" />
            <Skeleton className="h-[clamp(1rem,1.1vw,3rem)] w-11/12" />
            <Skeleton className="h-[clamp(1rem,1.1vw,3rem)] w-4/5" />
          </div>
        </BentoCard>

        <BentoCard
          title={"Highlights"}
          icon={<Pin className="stroke-black" />}
          className="relative"
        >
          <div className="flex gap-[clamp(0.5rem,0.7vw,3rem)] overflow-x-hidden w-full">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col flex-1 min-w-[clamp(220px,16vw,800px)] shrink-0 gap-[clamp(0.5rem,0.7vw,3rem)]">
                <Skeleton className="w-full aspect-14/10 rounded-[clamp(0.75rem,1vw,3rem)]" />
                <div className="flex flex-col gap-[clamp(0.375rem,0.45vw,1.5rem)] p-[clamp(0.75rem,1.2vw,5rem)]">
                  <Skeleton className="h-[clamp(1rem,1.1vw,5rem)] w-3/4" />
                  <Skeleton className="h-[clamp(1rem,1.1vw,5rem)] w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </BentoCard>

        <BentoCard
          title={"Certificates"}
          icon={<Award className="stroke-black" />}
        >
          <div className="flex flex-col gap-[clamp(1rem,1.5vw,4rem)]">
            <div className="flex flex-col w-full gap-[clamp(1rem,1.1vw,3rem)] lg:pr-[clamp(0.5rem,0.6vw,2rem)]">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`flex flex-col w-full ${i !== 5 ? "border-b border-zinc-100 dark:border-zinc-800/80 pb-[clamp(1rem,1.1vw,3rem)]" : ""}`}
                >
                  <div className="flex gap-[clamp(0.75rem,1.1vw,3rem)] items-center">
                    <Skeleton className="w-[clamp(3rem,3.5vw,10rem)] h-[clamp(3rem,3.5vw,10rem)] rounded-[10px] shrink-0" />
                    <div className="flex flex-col gap-[clamp(0.5rem,0.6vw,2rem)] w-full">
                      <Skeleton className="h-[clamp(1rem,1.1vw,3rem)] w-3/4" />
                      <Skeleton className="h-[clamp(0.75rem,0.85vw,2.5rem)] w-1/2" />
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
    <div className="py-[clamp(12px,0.85vw,3rem)] w-full gap-[clamp(12px,0.85vw,3rem)] flex flex-col no-scrollbar lg:overflow-y-auto select-none">
      {/* Banner Section */}
      <div className="w-full flex flex-col bg-linear-to-t from-black/90 via-black/50 to-black/20 lg:bg-linear-to-r lg:from-black/90 lg:via-black/40 lg:to-transparent rounded-[clamp(10px,1vw,3rem)] shrink-0 overflow-hidden relative group select-none">
        <div className="animate-in fade-in duration-700 delay-150 fill-mode-both transform-gpu will-change-transform w-full relative aspect-video sm:aspect-16/7 min-h-75 lg:min-h-70 xl:min-h-70 h-auto">
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
          <div className="absolute bottom-[clamp(20px,2.2vw,5rem)] left-[clamp(20px,2.2vw,5rem)] right-5 lg:right-auto z-20 flex flex-col gap-[clamp(12px,1.1vw,3rem)]">
            <div className="flex flex-col gap-[clamp(4px,0.2vw,3rem)]">
              <h1 className="text-white font-bold leading-[1.1] text-[clamp(2.3rem,2.8vw,9.25rem)] tracking-tight">
                Behind the code.
              </h1>
              <p className="text-zinc-300 font-light text-[clamp(0.8125rem,1.1vw,3.6rem)] mt-1 lg:mt-2 leading-relaxed max-w-[clamp(90%,50%,90%)]">
                I'm an IT student from Quezon City, passionate about
                transforming complex problems into elegant, user-centric web
                solutions.
              </p>
            </div>

            <div className="flex lg:flex-row flex-col items-start gap-[clamp(12px,0.85vw,3rem)] mt-1 lg:mt-2">
              <button className="w-full sm:w-auto cursor-pointer rounded-[clamp(10px,0.7vw,3rem)] bg-white text-zinc-900 hover:bg-zinc-200 transition-all duration-200 flex text-[clamp(0.8125rem,0.95vw,120px)] px-[clamp(1.25rem,1.5vw,5.25rem)] py-[clamp(0.5rem,0.7vw,4.875rem)] justify-center">
                <a
                  href="https://www.linkedin.com/in/lancemagollado/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-[clamp(0.375rem,0.5vw,2rem)]"
                >
                  <Send className="stroke-black w-[clamp(0.875rem,1vw,4rem)] h-[clamp(0.875rem,1vw,4rem)]" />
                  Let's Connect
                </a>
              </button>
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
          <span className="text-[clamp(13px,1vw,5rem)] leading-relaxed text-zinc-600 dark:text-zinc-400 font-light">
            For over two years, I have been actively architecting digital
            solutions. My journey began with intensive full-stack projects—like
            BakeHub—which laid the foundation for my formal technical and
            leadership roles at StudyPool and LESIT.&nbsp;
          </span>
          {isExpanded && (
            <span className="text-[clamp(13px,1vw,5rem)] leading-relaxed text-zinc-600 dark:text-zinc-400 font-light">
              Today, Front-End Development is my primary domain—a space where
              precise logic meets creative design. My ultimate trajectory is to
              evolve into a Full-Stack Developer, equipping me to engineer
              scalable, end-to-end web applications of my own.&nbsp;
            </span>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[clamp(13px,1vw,5rem)] leading-relaxed text-[#3FA6F4] hover:underline cursor-pointer transition duration-200 ease-in-out font-medium"
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
                  <Clock className="stroke-ring w-[clamp(0.5rem,1vw,3rem)] h-[clamp(0.75rem,1.1vw,3rem)]" />
                  <p className="font-light text-[clamp(0.6875rem,1vw,3rem)] text-ring line-clamp-1">
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
        <div className="animate-in fade-in duration-700 delay-300 fill-mode-both transform-gpu will-change-transform flex flex-col gap-[clamp(1rem,1.5vw,4rem)]">
          <div className="flex flex-col w-full gap-[clamp(1rem,1.1vw,3rem)] lg:pr-[clamp(0.5rem,0.6vw,2rem)]">
            {achievementsData.slice(0, 5).map((cert, index) => (
              <div
                key={cert.id}
                className={`flex flex-col w-full ${index !== achievementsData.slice(0, 5).length - 1 ? "border-b border-zinc-100 dark:border-zinc-800/80 pb-[clamp(1rem,1.1vw,3rem)]" : ""}`}
              >
                <AchievementCard
                  data={cert}
                  list={achievementsData.slice(0, 5)}
                  variant="list"
                />
              </div>
            ))}
          </div>
          <div className="w-full flex items-center justify-center">
            <Link
              to={"/achievements"}
              className="text-center text-[#3FA6F4] hover:underline text-[clamp(14px,1vw,3rem)]"
            >
              See More
            </Link>
          </div>
        </div>
      </BentoCard>
    </div>
  );
}

export default AboutContent;
