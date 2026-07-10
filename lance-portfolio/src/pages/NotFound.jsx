import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { House, MoveLeft, Compass } from "lucide-react";
import BentoCard from "@/components/BentoCard";
import { Skeleton } from "@/components/ui/skeleton";

function NotFound() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-3 lg:p-0 p-3 lg:overflow-y-auto no-scrollbar lg:py-3 select-none">
        <BentoCard className="h-[calc(100vh-24px)]">
          <div className="h-full w-full flex items-center justify-center">
            <div className="flex flex-col items-center justify-center text-center py-10 gap-6">
              {/* Circular Icon Skeleton */}
              <Skeleton className="w-20 h-20 rounded-full" />

              {/* Text Skeletons */}
              <div className="flex flex-col items-center gap-3">
                <Skeleton className="h-16 w-24" /> {/* 404 text skeleton */}
                <Skeleton className="h-6 w-36" />  {/* Page Not Found skeleton */}
                <div className="flex flex-col items-center gap-1.5 mt-2">
                  <Skeleton className="h-4 w-64" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>

              {/* Button Skeletons */}
              <div className="flex items-center gap-3 justify-center mt-2">
                <Skeleton className="h-[40px] w-28 rounded-[10px]" />
                <Skeleton className="h-[40px] w-36 rounded-[10px]" />
              </div>
            </div>
          </div>
        </BentoCard>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-3 lg:p-0 p-3 lg:overflow-y-auto no-scrollbar lg:py-3 select-none">
      {/* Main 404 BentoCard */}
      <div
        key="notfound-m"
      >
        <BentoCard className="h-[calc(100vh-24px)]">
          <div className="h-full w-full flex items-center justify-center fill-mode-both transform-gpu will-change-transform animate-in fade-in duration-700">
            <div className="flex flex-col items-center justify-center text-center py-10 gap-6">
              {/* Icon */}
              <div className="p-5 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                <Compass
                  className="w-10 h-10 stroke-zinc-400 dark:stroke-zinc-500"
                  strokeWidth={1.25}
                />
              </div>

              {/* 404 Number */}
              <div className="flex flex-col gap-2">
                <span className="font-bold text-[72px] lg:text-[96px] leading-none text-zinc-200 dark:text-zinc-700 tracking-tighter select-none">
                  404
                </span>
                <h1 className="font-semibold text-xl lg:text-2xl text-zinc-900 dark:text-white -mt-2 tracking-tight">
                  Page Not Found
                </h1>
                <p className="font-light text-[14px] lg:text-[15px] text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed">
                  The page you're looking for doesn't exist or may have been
                  moved. Let's get you back on track.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 flex-wrap justify-center">
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium text-[14px] transition-all duration-200 cursor-pointer"
                >
                  <MoveLeft className="w-4 h-4" strokeWidth={1.75} />
                  Go Back
                </button>
                <Link
                  to="/"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-zinc-900 dark:bg-white hover:bg-zinc-700 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-medium text-[14px] transition-all duration-200"
                >
                  <House className="w-4 h-4" strokeWidth={1.75} />
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </BentoCard>
      </div>
    </div>
  );
}

export default NotFound;
