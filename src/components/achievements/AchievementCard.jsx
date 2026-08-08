import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import {
  ExternalLink,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

function AchievementCard({ data, list, variant = "card" }) {
  const initialIndex = list ? list.findIndex((item) => item.id === data.id) : 0;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentData = list ? list[currentIndex] : data;

  // The dialog is portaled outside #root, so it doesn't inherit the app's
  // zoom scaling. Replicate that scaling here with a single uniform transform
  // so the modal grows on zoom-out while keeping its exact proportions.
  const [uiScale, setUiScale] = useState(() =>
    typeof window !== "undefined" && window.innerWidth >= 1440
      ? window.innerWidth / 1440
      : 1,
  );

  useEffect(() => {
    const onResize = () =>
      setUiScale(window.innerWidth >= 1440 ? window.innerWidth / 1440 : 1);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNext = () => {
    if (currentIndex < list.length - 1) setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  return (
    <Dialog
      className={"w-full"}
      onOpenChange={(open) => {
        if (!open) {
          setTimeout(() => setCurrentIndex(initialIndex), 200);
        }
      }}
    >
      {variant === "card" ? (
        // -------------------------------------------------------------
        // VARIANT 1: THE ACHIEVEMENT PAGE CARD
        // -------------------------------------------------------------
        <DialogTrigger
          asChild
          className="w-full flex select-none flex-col transition-all ease-in duration-300 cursor-pointer group outline-none"
        >
          <div className="flex flex-col w-full bg-white dark:bg-card rounded-2xl transition-all duration-300 overflow-hidden relative">
            <div className="w-full aspect-4/3 bg-zinc-50 dark:bg-zinc-800/50 overflow-hidden relative border border-zinc-200 dark:border-zinc-800 rounded-2xl">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-contain p-[clamp(0.5rem,0.6vw,2rem)] transition-transform duration-500 ease-out "
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out pointer-events-none"></div>
              <div className="absolute bottom-[clamp(0.75rem,0.85vw,3rem)] left-[clamp(1rem,1.1vw,3rem)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center gap-[clamp(0.375rem,0.45vw,1.5rem)] text-white z-10">
                <ExternalLink strokeWidth={2} className="w-[clamp(0.9375rem,1.1vw,3rem)] h-[clamp(0.9375rem,1.1vw,3rem)]" />
                <span className="text-[clamp(13px,0.95vw,3rem)] font-medium tracking-wide">
                  View Certificate
                </span>
              </div>
            </div>

            <div className="py-[clamp(1rem,1.1vw,3rem)] flex gap-[clamp(0.75rem,0.85vw,3rem)] items-start bg-card flex-1">
              <div className="w-[clamp(2rem,2.4vw,7rem)] h-[clamp(2rem,2.4vw,7rem)] rounded-md bg-white dark:bg-zinc-800 shrink-0 overflow-hidden border border-zinc-200 dark:border-zinc-700 flex items-center justify-center p-[clamp(0.125rem,0.15vw,0.75rem)] shadow-sm">
                <img
                  src={data.issuerLogo}
                  alt={data.issuer + " Logo"}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col gap-[clamp(0.375rem,0.45vw,1.5rem)]  h-full">
                <div className="flex flex-col leading-tight">
                  <h1
                    className="font-semibold text-[clamp(16px,1.1vw,4rem)] text-zinc-900 dark:text-zinc-100 leading-snug line-clamp-1"
                    title={data.title}
                  >
                    {data.title}
                  </h1>
                  <p className="text-[clamp(14px,1vw,3.5rem)] line-clamp-1 text-zinc-600 dark:text-zinc-400 font-medium mt-[clamp(0.125rem,0.2vw,1rem)]">
                    {data.issuer}
                  </p>
                </div>
                <div className="flex gap-[clamp(0.375rem,0.45vw,1.5rem)] items-center mt-[clamp(0.25rem,0.3vw,1.5rem)] ">
                  <p className="text-[clamp(12px,0.85vw,2.5rem)] text-zinc-500 dark:text-zinc-400 line-clamp-1">
                    Issued {data.date}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>
      ) : (
        <div className="flex flex-col w-full outline-none">
          <div className="flex gap-[clamp(0.75rem,1.1vw,3rem)] items-start">
            <div className="w-[clamp(3rem,3.5vw,10rem)] h-[clamp(3rem,3.5vw,10rem)] bg-white dark:bg-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-800 p-[clamp(0.375rem,0.45vw,1.5rem)] shrink-0 flex items-center justify-center">
              <img
                src={data.issuerLogo}
                alt={data.issuer}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold text-[clamp(15px,1.1vw,4rem)] text-zinc-900 dark:text-zinc-100 leading-tight">
                {data.title}
              </h1>
              <p className="text-[clamp(14px,1vw,3.5rem)] text-zinc-700 dark:text-zinc-300 font-medium mt-[clamp(0.125rem,0.2vw,1rem)]">
                {data.issuer}
              </p>
              <p className="text-[clamp(13px,0.95vw,3rem)] text-zinc-500 dark:text-zinc-400 font-light mt-[clamp(0.125rem,0.2vw,1rem)] mb-[clamp(0.625rem,0.7vw,2rem)]">
                Issued {data.date}
              </p>

              <DialogTrigger asChild>
                <button className="w-fit flex items-center gap-[clamp(0.375rem,0.45vw,1.5rem)] px-[clamp(0.875rem,1vw,3rem)] py-[clamp(0.375rem,0.45vw,1.5rem)] rounded-full border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-[clamp(14px,1vw,3.5rem)] font-semibold text-zinc-700 dark:text-zinc-200 cursor-pointer">
                  <span>View Certificate</span>
                  <ExternalLink
                    strokeWidth={2}
                    className="w-[clamp(0.9375rem,1.1vw,3rem)] h-[clamp(0.9375rem,1.1vw,3rem)]"
                  />
                </button>
              </DialogTrigger>
            </div>
          </div>
        </div>
      )}

      <DialogContent
        showCloseButton={false}
        className={
          "w-full lg:max-w-5xl max-h-[85vh] select-none border-none bg-card p-8 shadow-2xl rounded-3xl grid lg:grid-cols-[2fr_1fr] overflow-hidden overflow-y-auto no-scrollbar"
        }
        style={uiScale > 1 ? { transform: `scale(${uiScale})`, transformOrigin: "center" } : undefined}
      >
        <DialogClose className="absolute top-4 right-4 z-20 rounded-xs opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
          <X className="w-5 h-5" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <div className="flex flex-col overflow-hidden pt-4 lg:pt-0">
          <div className=" w-full h-full overflow-y-auto border border-zinc-200/50  dark:border-zinc-800/50 rounded-xl overflow-hidden bg-zinc-50/80 dark:bg-zinc-900/50 no-scrollbar relative">
            <div className="min-h-full flex items-center justify-center">
              <img
                src={currentData.image}
                alt={currentData.title + " Certificate"}
                className="w-full h-auto max-h-[150vh] object-contain rounded-lg mx-auto"
              />
            </div>
          </div>
          {currentData.verifyLink && (
            <div className="mt-4">
              <a
                href={currentData.verifyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex justify-center items-center gap-2 w-full py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-semibold rounded-full transition-all duration-200 active:scale-95 hover:bg-zinc-800 dark:hover:bg-white shadow-md lg:text-[14px] text-[12px]"
              >
                {currentData.linkText || "Verify Credential"}
                <ArrowRight
                  strokeWidth={2}
                  className="w-3.75 h-3.75 transition-transform duration-200 group-hover:translate-x-1"
                />
              </a>
            </div>
          )}
        </div>

        <div className="w-full lg:w-100 h-full flex flex-col bg-card lg:border-l border-t lg:border-t-0 border-border">
          <div className="lg:px-8 pt-8 flex flex-col justify-between w-full h-full">
            <div className="flex flex-col gap-6">
              <div className="flex lg:flex-col gap-3 lg:gap-0">
                <div className="w-14 h-14 shrink-0 bg-zinc-50 dark:bg-zinc-900 rounded-xl p-2 mb-4 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center">
                  <img
                    src={currentData.issuerLogo}
                    alt={currentData.issuer + " Logo"}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="font-bold lg:text-2xl text-xl text-zinc-900 dark:text-zinc-100 leading-tight">
                    {currentData.title}
                  </h1>
                  <p className="font-medium lg:text-[16px] text-[14px] text-zinc-600 dark:text-zinc-400">
                    {currentData.issuer}
                  </p>
                  {currentData.date && (
                    <p className="font-light lg:text-[13px] text-[12px] text-zinc-400 mt-1">
                      Issued on {currentData.date}
                    </p>
                  )}
                </div>
              </div>
              <div>
                {currentData.description && (
                  <div className="flex flex-col mb-6">
                    <h3 className="text-zinc-900 dark:text-zinc-100 font-semibold lg:text-[16px] text-[14px] tracking-tight mb-2 uppercase text-xs">
                      Highlight
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 lg:text-[15px] text-[14px] leading-relaxed">
                      {currentData.description}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              {list && list.length > 1 && (
                <div className="lg:p-6 p-3 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20 flex justify-between items-center rounded-2xl">
                  <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="flex items-center gap-2 cursor-pointer text-sm font-medium text-zinc-600 dark:text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <ChevronLeft strokeWidth={2} className="w-3.75 h-3.75" />
                    Previous
                  </button>

                  <span className="text-xs font-medium text-zinc-400">
                    {currentIndex + 1} of {list.length}
                  </span>

                  <button
                    onClick={handleNext}
                    disabled={currentIndex === list.length - 1}
                    className="flex items-center gap-2 cursor-pointer text-sm font-medium text-zinc-600 dark:text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                  >
                    Next
                    <ChevronRight strokeWidth={2} className="w-3.75 h-3.75" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AchievementCard;
