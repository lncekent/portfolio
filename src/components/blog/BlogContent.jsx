import BentoCard from "../BentoCard";
import { Link } from "react-router-dom";
import { blogsData } from "@/data";
import { useState, useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import { BookOpen, Clock } from "lucide-react";
let isLoaded = false;

function BlogContent() {
  const featuredPost = blogsData[0];
  const otherPosts = blogsData.slice(1, 3);

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
      <div className="w-full gap-[clamp(0.75rem,0.85vw,3rem)] h-full flex flex-col lg:px-0 py-[clamp(12px,0.85vw,3rem)] lg:py-[clamp(12px,0.85vw,3rem)] overflow-y-auto no-scrollbar">
        <BentoCard title={"Blogs"} icon={<BookOpen className="stroke-black" />}>
          <div className="w-full flex flex-col gap-[clamp(0.75rem,0.85vw,3rem)]">
            <Skeleton className="w-full rounded-[14px] aspect-4/2.5 lg:aspect-5/3" />
            <div className="w-full grid lg:grid-cols-2 gap-[clamp(0.75rem,0.85vw,3rem)]">
              {[1, 2].map((i) => (
                <Skeleton
                  key={i}
                  className="w-full rounded-2xl aspect-4/2.5 lg:aspect-4/3"
                />
              ))}
            </div>
          </div>
        </BentoCard>
      </div>
    );
  }

  return (
    <div className=" w-full overflow-y-auto no-scrollbar overflow-hidden py-[clamp(12px,0.85vw,3rem)]">
      <BentoCard title={"Blogs"} icon={<BookOpen className="stroke-black" />}>
        <div className="w-full flex flex-col gap-[clamp(0.75rem,0.85vw,3rem)]">
          {/* 1. FEATURED POST (Main/Malaki) */}
          {featuredPost && (
            <Link
              key="feat-post-m"
              to={`/blog-selected/${featuredPost.slug}`}
              className="animate-in fade-in duration-700 delay-150 fill-mode-both transform-gpu will-change-transform relative w-full flex flex-col justify-end overflow-hidden rounded-[14px] aspect-4/2.5 lg:aspect-5/3 cursor-pointer group  transition-shadow"
            >
              {featuredPost.thumbnail ? (
                <img
                  src={featuredPost.thumbnail}
                  alt={featuredPost.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 w-full h-full bg-[#DEDEDE] dark:bg-zinc-800"></div>
              )}

              {/* Gradient Fade */}
              <div className="absolute inset-0 bg-linear-to-t from-[#234170] via-black/45 to-transparent  transition-opacity duration-500"></div>

              {/* Text Content */}
              <div className="relative z-10 w-full p-[clamp(1.25rem,1.4vw,4rem)] lg:p-[clamp(2rem,2.2vw,6rem)] flex flex-col gap-[clamp(0.375rem,0.45vw,1.5rem)]">
                <div className="flex items-center gap-[clamp(0.375rem,0.8vw,2.5rem)] text-zinc-300">
                  <Clock className="stroke-current w-[clamp(0.875rem,1.2vw,4rem)] h-[clamp(0.875rem,1.2vw,4rem)]" />
                  <p className="font-medium text-[clamp(12px,1.3vw,106px)] tracking-wide">
                    {featuredPost.date}
                  </p>
                </div>
                <h1 className="font-bold text-white text-[clamp(22px,2.1vw,280px)] leading-tight drop-shadow-md line-clamp-2">
                  {featuredPost.title}
                </h1>
              </div>
            </Link>
          )}

          {/* 2. OTHER POSTS GRID (Yung dalawa sa ilalim) */}
          <div
            key="other-posts-m"
            className="animate-in fade-in duration-700 delay-200 fill-mode-both transform-gpu will-change-transform w-full grid lg:grid-cols-2 gap-[clamp(0.75rem,0.85vw,3rem)]"
          >
            {otherPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog-selected/${post.slug}`}
                className="relative w-full flex flex-col justify-end overflow-hidden rounded-2xl aspect-4/2.5 lg:aspect-4/3 cursor-pointer group transition-shadow"
              >
                {post.thumbnail ? (
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 transform-cpu will-change-transform backface-hidden"
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full bg-[#DEDEDE] dark:bg-zinc-800"></div>
                )}

                <div className="absolute inset-0 bg-linear-to-t from-[#234170] via-black/45 to-transparent transition-opacity duration-500"></div>

                <div className="relative z-10 w-full p-[clamp(1rem,1.1vw,3rem)] flex flex-col gap-[clamp(0.25rem,0.35vw,1.5rem)]">
                  <div className="flex items-center gap-[clamp(0.375rem,0.45vw,1.5rem)] text-zinc-300">
                    <Clock className="stroke-current w-[clamp(0.875rem,1.1vw,3rem)] h-[clamp(0.875rem,1.1vw,3rem)]" />
                    <p className="font-medium text-[clamp(12px,0.95vw,3rem)] tracking-wide shrink-0">
                      {post.date}
                    </p>
                  </div>
                  <h1 className="font-bold text-white text-[clamp(18px,1.4vw,4.5rem)] leading-tight drop-shadow-md line-clamp-2">
                    {post.title}
                  </h1>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </BentoCard>
    </div>
  );
}

export default BlogContent;
