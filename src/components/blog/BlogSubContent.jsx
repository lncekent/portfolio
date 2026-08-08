import BentoCard from "../BentoCard";
import ContactMe from "../ContactMe";
import { Link, useParams } from "react-router-dom";
import { blogsData } from "@/data";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { History, Phone, Clock } from "lucide-react";

let isLoaded = false;

function BlogSubContent() {
  const { slug } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  useEffect(() => {
    setCurrentPage(1);
  }, [slug]);

  const [isLoading, setIsLoading] = useState(!isLoaded);

  useEffect(() => {
    if (!isLoaded) {
      const timer = setTimeout(() => {
        isLoaded = true;
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [slug]);

  let availablePosts = [];

  if (slug) {
    availablePosts = blogsData.filter((post) => post.slug !== slug);
  } else {
    availablePosts = blogsData.slice(3);
  }

  const totalPages = Math.ceil(availablePosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = availablePosts.slice(
    startIndex,
    startIndex + postsPerPage,
  );

  if (isLoading) {
    return (
      <div className="w-full overflow-y-auto no-scrollbar overflow-hidden flex flex-col gap-[clamp(0.75rem,0.85vw,3rem)] lg:pr-[clamp(12px,0.85vw,3rem)] lg:pb-[clamp(12px,0.85vw,3rem)] lg:py-[clamp(12px,0.85vw,3rem)] py-0 pb-0">
        <BentoCard
          title={"Recent Posts"}
          icon={<History className="stroke-black" />}
        >
          <div className="flex flex-col w-full gap-[clamp(0.75rem,0.85vw,3rem)]">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-full flex rounded-2xl overflow-hidden shrink-0"
              >
                <div className="lg:aspect-4/2 aspect-square w-3/4 lg:w-full min-w-20 relative rounded-none shrink-0 border-zinc-200 dark:border-zinc-800">
                  <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
                </div>
                <div className="w-full p-[clamp(0.75rem,0.85vw,3rem)] bg-white dark:bg-zinc-900/40 rounded-none flex flex-col gap-[clamp(0.5rem,0.6vw,2rem)] justify-center lg:justify-start">
                  <Skeleton className="h-4 w-5/6" />
                  <div className="flex items-center gap-[clamp(0.5rem,0.6vw,2rem)] mt-1">
                    <Skeleton className="h-3 w-3 rounded-full" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </BentoCard>

        <BentoCard
          title="Contact Me"
          icon={<Phone className="stroke-black" />}
          className="h-full"
        >
          <div className="flex flex-col justify-between gap-[clamp(1.5rem,2vw,5rem)] h-full">
            <ul className="flex gap-[clamp(0.75rem,0.9vw,2.5rem)] w-full flex-wrap">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <li
                  key={i}
                  className="w-[clamp(2.25rem,2.6vw,8rem)] h-[clamp(2.25rem,2.6vw,8rem)]"
                >
                  <Skeleton className="w-full h-full rounded-full" />
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-[clamp(0.375rem,0.45vw,1.5rem)] mt-[clamp(0.5rem,0.6vw,2rem)]">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </BentoCard>
      </div>
    );
  }

  return (
    <div className="w-full overflow-y-auto no-scrollbar overflow-hidden flex flex-col gap-[clamp(0.75rem,0.85vw,3rem)] lg:pr-[clamp(12px,0.85vw,3rem)] lg:pb-[clamp(12px,0.85vw,3rem)] lg:py-[clamp(12px,0.85vw,3rem)] py-0 pb-0">
      <BentoCard
        title={"Recent Posts"}
        icon={<History className="stroke-black" />}
      >
        <div
          key="bp-m"
          className="animate-in fade-in duration-700 delay-250 fill-mode-both transform-gpu will-change-transform flex flex-col w-full gap-[clamp(0.75rem,0.85vw,3rem)] h-full"
        >
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog-selected/${post.slug}`}
                className="w-full flex cursor-pointer group border rounded-2xl overflow-hidden"
              >
                <div className="lg:aspect-4/2 aspect-square dark:bg-zinc-900/40 w-2/4 lg:w-[clamp(3rem,11vw,40rem)] min-w-20 overflow-hidden relative shrink-0">
                  {post.thumbnail && (
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 will-change-transform transform-cpu backface-hidden"
                    />
                  )}
                </div>
                <div className="w-full p-[clamp(0.75rem,0.85vw,3rem)] bg-white dark:bg-zinc-900/40  flex flex-col gap-[clamp(0.25rem,0.35vw,1.5rem)] justify-center lg:justify-start overflow-hidden">
                  <h1 className="font-semibold text-[clamp(14px,1vw,3.5rem)] line-clamp-3">
                    {post.title}
                  </h1>
                  <div className="flex items-center gap-[clamp(0.25rem,0.35vw,1.5rem)]">
                    <Clock className="w-[clamp(0.75rem,0.85vw,2.5rem)] h-[clamp(0.75rem,0.85vw,2.5rem)] stroke-ring" />
                    <p className="font-light text-[clamp(10px,0.85vw,2.5rem)] text-ring">
                      {post.date}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-4 text-center text-zinc-500 text-sm">
              More posts coming soon!
            </div>
          )}
          {totalPages > 1 && (
            <Pagination className="pt-[clamp(0.75rem,0.85vw,3rem)] pb-[clamp(0.25rem,0.35vw,1.5rem)] [&_a]:text-[clamp(14px,1vw,3.5rem)]! [&_a]:h-auto! [&_a]:px-[clamp(0.625rem,1vw,5rem)]! [&_a]:py-[clamp(0.375rem,0.45vw,1.5rem)]! [&_svg]:w-[clamp(1rem,1.1vw,3rem)]! [&_svg]:h-[clamp(1rem,1.1vw,3rem)]!">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {[...Array(totalPages)].map((_, index) => {
                  const pageNum = index + 1;
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        onClick={() => setCurrentPage(pageNum)}
                        isActive={currentPage === pageNum}
                        className="cursor-pointer"
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </BentoCard>
      <ContactMe
        animKey="cm-m"
        wrapperClass="animate-in fade-in duration-700 delay-300 fill-mode-both transform-gpu will-change-transform"
      />
    </div>
  );
}

export default BlogSubContent;
