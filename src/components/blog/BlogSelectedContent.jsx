import { useParams, Navigate, useNavigate } from "react-router-dom";
import BentoCard from "../BentoCard";
import { blogsData } from "@/data";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { ChevronLeft, Clock } from "lucide-react";

const loadedBlogs = new Set();

function BlogSelectedContent() {
  const { slug } = useParams();
  const post = blogsData.find((b) => b.slug === slug);
  const navigate = useNavigate();

  const scrollContainerRef = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0);

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, 0);
    }
  }, [slug]);

  const [isLoading, setIsLoading] = useState(!loadedBlogs.has(slug));

  useEffect(() => {
    if (!loadedBlogs.has(slug)) {
      setIsLoading(true); // Force skeleton state sync on cross-slug navigation
      const timer = setTimeout(() => {
        loadedBlogs.add(slug);
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="w-full py-3 overflow-y-auto no-scrollbar">
        <BentoCard>
          <div className="flex flex-col gap-5">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex flex-col gap-3">
              <Skeleton className="h-10 w-3/4 lg:w-1/2" />
              <div className="flex items-center gap-2 mt-2">
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="w-full pt-6">
              <Skeleton className="w-full rounded-[10px] aspect-video" />
            </div>
            <div className="flex flex-col w-full gap-4 pt-6">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-10/12" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        </BentoCard>
      </div>
    );
  }

  if (!post) return <Navigate to="/blog" replace />;

  const hasFirstImage = post.contentImages && post.contentImages.length > 0;
  const hasSecondImage = post.contentImages && post.contentImages.length > 1;

  const renderContentBlocks = (blocks) => {
    if (!blocks || !Array.isArray(blocks))
      return <p className="text-zinc-500 italic">No content available.</p>;

    return blocks.map((block, index) => {
      switch (block.type) {
        case "paragraph":
          // UX TWEAK: Softer text color (zinc-600) and relaxed line height for premium reading
          return (
            <p
              key={index}
              className="font-light lg:text-[16px] text-[15px] leading-relaxed lg:leading-loose pt-5 text-zinc-600 dark:text-zinc-400 tracking-wide"
            >
              {block.text}
            </p>
          );

        case "subtitle":
          // UX TWEAK: Tighter tracking (letter spacing) for headers
          return (
            <h3
              key={index}
              className="font-semibold lg:text-2xl text-xl pt-8 pb-3 text-zinc-900 dark:text-white tracking-tight"
            >
              {block.text}
            </h3>
          );

        case "list":
          return (
            <ul
              key={index}
              className="list-disc pl-6 space-y-3 pt-3 text-zinc-600 dark:text-zinc-400 font-light lg:text-[16px] text-[15px] leading-relaxed"
            >
              {block.items.map((item, i) => (
                <li key={i}>
                  {typeof item === "object" ? (
                    <span>
                      <strong className="font-medium text-zinc-900 dark:text-zinc-200">
                        {item.keyword}
                      </strong>
                      {item.text || item.description}
                    </span>
                  ) : (
                    item
                  )}
                </li>
              ))}
            </ul>
          );

        case "quote":
          return (
            <div
              key={index}
              className="my-8 p-6 lg:p-8 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border-l-4 border-[#468cfc]"
            >
              <p className="font-medium lg:text-lg text-base italic text-zinc-900 dark:text-white leading-relaxed">
                "{block.text}"
              </p>
            </div>
          );

        case "bold":
          return (
            <p
              key={index}
              className="font-medium lg:text-[16px] text-[15px] leading-relaxed pt-5 text-zinc-900 dark:text-white"
            >
              {block.text}
            </p>
          );
        case "button-group":
          return (
            <div key={index} className="flex flex-wrap gap-4 pt-6 pb-2">
              {block.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium text-sm rounded-full hover:bg-zinc-900/90 dark:hover:bg-white/90 duration-500 ease-in-out transition shadow-md"
                >
                  {link.label}
                </a>
              ))}
            </div>
          );
        default:
          return null;
      }
    });
  };
  const halfLength = post.content ? Math.ceil(post.content.length / 2) : 0;
  const firstHalfContent = post.content
    ? post.content.slice(0, halfLength)
    : [];
  const secondHalfContent = post.content ? post.content.slice(halfLength) : [];

  return (
    <div
      className="w-full py-3 overflow-y-auto no-scrollbar"
      ref={scrollContainerRef}
    >
      <BentoCard>
        <div
          className="animate-in fade-in duration-700 delay-300 fill-mode-both transform-gpu will-change-transform flex flex-col gap-5"
          key={slug}
        >
          {/* BACK BUTTON */}
          <button
            onClick={() => navigate(-1)}
            className="p-2 w-fit rounded-[100px] outline-1 outline-zinc-200  cursor-pointer dark:outline-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:bg-zinc-900/50 transition-colors"
          >
            <ChevronLeft strokeWidth={1.5} className="stroke-current" />
          </button>

          {/* HEADER */}
          <div className="flex flex-col gap-3">
            <h1 className="font-semibold lg:text-4xl text-3xl leading-11">
              {post.title}
            </h1>
            <div className="flex items-center gap-2 text-ring">
              <Clock
                strokeWidth={1.5}
                className="lg:w-5 w-4.5 stroke-current"
              />
              <p className="font-light lg:text-base text-sm">{post.date}</p>
            </div>
          </div>

          {/* TOP IMAGE */}
          {hasFirstImage && (
            <div className="w-full pt-6">
              <img
                src={post.contentImages[0]}
                alt={`${post.title} Image 1`}
                loading="eager"
                fetchPriority="high"
                className="w-full rounded-[10px] object-cover ring-1 ring-black/5 dark:ring-white/10 shadow-sm"
              />
            </div>
          )}

          {/* FIRST HALF OF CONTENT */}
          <div className="flex flex-col w-full">
            {renderContentBlocks(firstHalfContent)}
          </div>

          {/* MIDDLE IMAGE (Kung meron man) */}
          {hasSecondImage && (
            <div className="pt-3">
              <img
                src={post.contentImages[1]}
                alt={`${post.title} Image 2`}
                loading="eager"
                fetchPriority="high"
                className="w-full rounded-[10px] object-cover shadow-sm ring-1 ring-black/5 dark:ring-white/10"
              />
            </div>
          )}

          {/* SECOND HALF OF CONTENT */}
          <div className="flex flex-col w-full ">
            {renderContentBlocks(secondHalfContent)}
          </div>
        </div>
      </BentoCard>
    </div>
  );
}

export default BlogSelectedContent;
