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
      <div className="w-full flex flex-col gap-3 lg:pl-0 lg:pr-[clamp(12px,0.85vw,4rem)] p-3 lg:overflow-y-auto no-scrollbar lg:py-[clamp(12px,0.85vw,4rem)] select-none">
        <BentoCard className="h-[calc(100vh-24px)]">
          <div className="h-full w-full flex items-center justify-center">
            <div className="flex flex-col items-center justify-center text-center py-10 gap-[clamp(24px,1.7vw,5rem)]">
              {/* Circular Icon Skeleton */}
              <Skeleton className="w-[clamp(80px,5.6vw,20rem)] h-[clamp(80px,5.6vw,20rem)] rounded-full" />

              {/* Text Skeletons */}
              <div className="flex flex-col items-center gap-[clamp(12px,0.85vw,4rem)]">
                <Skeleton className="h-[clamp(64px,8vw,25rem)] w-[clamp(96px,13vw,35rem)]" />{" "}
                {/* 404 text skeleton */}
                <Skeleton className="h-[clamp(24px,1.6vw,5rem)] w-[clamp(144px,10vw,30rem)]" />{" "}
                {/* Page Not Found skeleton */}
                <div className="flex flex-col items-center gap-[clamp(6px,0.4vw,2.5rem)] mt-[clamp(6px,0.4vw,2.5rem)]">
                  <Skeleton className="h-[clamp(16px,1.2vw,5rem)] w-[clamp(256px,17.3vw,100rem)]" />
                  <Skeleton className="h-[clamp(16px,1.2vw,5rem)] w-[clamp(192px,12.8vw,100rem)]" />
                </div>
              </div>

              {/* Button Skeletons */}
              <div className="flex items-center gap-[clamp(6px,0.4vw,2.5rem)] justify-center mt-[clamp(6px,0.4vw,2.5rem)]">
                {/* <Skeleton className="h-[40px] w-28 rounded-[10px]" /> */}
                <Skeleton className="h-[clamp(40px,2.77vw,10rem)] w-[clamp(144px,10vw,30rem)] rounded-[clamp(10px,0.7vw,10rem)]" />
              </div>
            </div>
          </div>
        </BentoCard>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-3 lg:pl-0 lg:pr-[clamp(12px,0.85vw,4rem)] p-3 lg:overflow-y-auto no-scrollbar lg:py-[clamp(12px,0.85vw,4rem)] select-none">
      {/* Main 404 BentoCard */}
      <div key="notfound-m">
        <BentoCard className="h-[calc(100vh-24px)]">
          <div className="h-full w-full flex items-center justify-center fill-mode-both transform-gpu will-change-transform animate-in fade-in duration-700">
            <div className="flex flex-col items-center justify-center text-center py-10 gap-6">
              {/* Icon */}
              <div className="p-[clamp(20px,1.4vw,100px)] bg-zinc-100 dark:bg-zinc-800 rounded-full">
                <Compass
                  className="w-[clamp(40px,2.8vw,200px)] h-[clamp(40px,2.8vw,200px)] stroke-zinc-400 dark:stroke-zinc-500"
                  strokeWidth={1.25}
                />
              </div>

              {/* 404 Number */}
              <div className="flex flex-col gap-2">
                <span className="font-bold text-[clamp(72px,6.8vw,20rem)] leading-none text-zinc-200 dark:text-zinc-700 tracking-tighter select-none">
                  404
                </span>
                <h1 className="font-semibold text-[clamp(20px,1.67vw,5rem)] text-zinc-900 dark:text-white -mt-2 tracking-tight">
                  Page Not Found
                </h1>
                <p className="font-light text-[clamp(14px,1.2vw,5rem)] text-zinc-500 dark:text-zinc-400 max-w-[clamp(382px,26vw,100rem)] leading-relaxed">
                  The page you're looking for doesn't exist or may have been
                  moved. Let's get you back on track.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 flex-wrap justify-center">
                <Link
                  to="/"
                  className="flex items-center gap-2 px-[clamp(20px,1.4vw,20rem)] py-[clamp(10px,0.7vw,10rem)] rounded-[clamp(10px,0.7vw,10rem)] bg-zinc-900 dark:bg-white hover:bg-zinc-700 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-medium text-[clamp(14px,1.3vw,10rem)] transition-all duration-200"
                >
                  <House
                    className="w-[clamp(16px,1.1vw,20rem)] h-[clamp(16px,1.1vw,20rem)]"
                    strokeWidth={1.75}
                  />
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
