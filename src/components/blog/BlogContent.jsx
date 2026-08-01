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
      <div className="w-full gap-3 h-full flex flex-col lg:px-0 py-3 lg:py-3 overflow-y-auto no-scrollbar">
        <BentoCard title={"Blogs"} icon={<BookOpen className="stroke-black" />}>
          <div className="w-full flex flex-col gap-3">
            <Skeleton className="w-full rounded-[14px] aspect-4/2.5 lg:aspect-5/3" />
            <div className="w-full grid lg:grid-cols-2 gap-3">
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
    <div className=" w-full overflow-y-auto no-scrollbar overflow-hidden py-3">
      <BentoCard title={"Blogs"} icon={<BookOpen className="stroke-black" />}>
        <div className="w-full flex flex-col gap-3">
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
              <div className="relative z-10 w-full p-5 lg:p-8 flex flex-col gap-1.5">
                <div className="flex items-center lg:gap-3 gap-1.5 text-zinc-300">
                  <Clock className="stroke-current lg:w-5 w-3.5" />
                  <p className="font-medium lg:text-[16px] text-[12px] tracking-wide">
                    {featuredPost.date}
                  </p>
                </div>
                <h1 className="font-bold text-white lg:text-[28px] text-[22px] leading-tight drop-shadow-md line-clamp-2">
                  {featuredPost.title}
                </h1>
              </div>
            </Link>
          )}

          {/* 2. OTHER POSTS GRID (Yung dalawa sa ilalim) */}
          <div
            key="other-posts-m"
            className="animate-in fade-in duration-700 delay-200 fill-mode-both transform-gpu will-change-transform w-full grid lg:grid-cols-2 gap-3"
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

                <div className="relative z-10 w-full p-4 flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-zinc-300">
                    <Clock className="stroke-current lg:w-4 w-3.5" />
                    <p className="font-medium text-[12px] lg:text-[13px] tracking-wide shrink-0">
                      {post.date}
                    </p>
                  </div>
                  <h1 className="font-bold text-white lg:text-[18px] text-[22px] leading-tight drop-shadow-md line-clamp-2">
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
