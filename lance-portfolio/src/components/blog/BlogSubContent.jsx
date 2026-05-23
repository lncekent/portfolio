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
      <div className="w-full overflow-y-auto no-scrollbar overflow-hidden flex flex-col gap-3 lg:pr-3 lg:pb-3 lg:py-3 py-0 pb-0">
        <BentoCard
          title={"Recent Posts"}
          icon={<History className="stroke-black" />}
        >
          <div className="flex flex-col w-full gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-full flex rounded-2xl overflow-hidden shrink-0"
              >
                <div className="lg:aspect-4/2 aspect-square w-3/4 lg:w-full min-w-20 relative rounded-none shrink-0 border-zinc-200 dark:border-zinc-800">
                  <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
                </div>
                <div className="w-full p-3 bg-white dark:bg-zinc-900/40 rounded-none flex flex-col gap-2 justify-center lg:justify-start">
                  <Skeleton className="h-4 w-5/6" />
                  <div className="flex items-center gap-2 mt-1">
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
          <div className="flex flex-col justify-between gap-10 h-full">
            <ul className="flex gap-4 w-full flex-wrap">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <li key={i} className="w-9 h-9">
                  <Skeleton className="w-full h-full rounded-full" />
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-1.5 mt-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </BentoCard>
      </div>
    );
  }

  return (
    <div className="w-full overflow-y-auto no-scrollbar overflow-hidden flex flex-col gap-3 lg:pr-3 lg:pb-3 lg:py-3 py-0 pb-0">
      <BentoCard
        title={"Recent Posts"}
        icon={<History className="stroke-black" />}
      >
        <div
          key="bp-m"
          className="animate-in fade-in duration-700 delay-250 fill-mode-both transform-gpu will-change-transform flex flex-col w-full gap-3 h-full"
        >
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog-selected/${post.slug}`}
                className="w-full flex cursor-pointer group border rounded-2xl overflow-hidden"
              >
                <div className="lg:aspect-4/2 aspect-square dark:bg-zinc-900/40 w-3/4 lg:w-75 min-w-20 overflow-hidden relative">
                  {post.thumbnail && (
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                </div>
                <div className="w-full p-3 bg-white dark:bg-zinc-900/40  flex flex-col gap-1 justify-center lg:justify-start overflow-hidden">
                  <h1 className="font-semibold lg:text-[15px] text-[14px] line-clamp-3">
                    {post.title}
                  </h1>
                  <div className="flex items-center gap-1">
                    <Clock className="lg:w-3 w-3 stroke-ring" />
                    <p className="font-light lg:text-[12px] text-[10px] text-ring">
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
            <Pagination className="pt-3 pb-1">
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
