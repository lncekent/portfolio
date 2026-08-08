import BentoCard from "../BentoCard";
import ContactMe from "../ContactMe";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { Skeleton } from "../ui/skeleton";

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { FileUser, Phone, Download } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

let isLoaded = false;

function ResumeContent() {
  const getScale = (w) => (w < 1024 ? 0.45 : w / 1150);

  const [scale, setScale] = useState(() => getScale(window.innerWidth));

  // Debounce the scale update: during a zoom gesture the browser fires many
  // resize events. Re-rendering the PDF on each one causes the "quick reload"
  // flicker. Instead we wait until zooming settles (~200ms) and re-render once.
  // While zooming, the CSS `zoom` on #root scales the existing PDF smoothly.
  useEffect(() => {
    let timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setScale(getScale(window.innerWidth));
      }, 200);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 2.5));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.4));

  // Intrinsic PDF page size (points at scale 1). Captured once on load.
  // Used to reserve the exact rendered space so the container never collapses
  // while react-pdf redraws the canvas at a new scale.
  const [pageSize, setPageSize] = useState({ width: 612, height: 792 });

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
      <div className="w-full h-full lg:pr-[clamp(12px,0.85vw,3rem)] px-3 lg:px-0 py-[clamp(12px,0.85vw,3rem)] overflow-y-auto no-scrollbar overflow-hidden flex flex-col gap-[clamp(12px,0.85vw,3rem)] min-h-[101vh]">
        <BentoCard
          title={"Resume"}
          icon={<FileUser className="stroke-black" />}
          className="w-full relative gap-4 "
        >
          <div className="absolute lg:top-[clamp(14px,1vw,4rem)] top-4 right-[clamp(18px,1.25vw,4rem)] z-10 hidden sm:block">
            <Skeleton className="w-[clamp(7.75rem,8.5vw,25rem)] h-[clamp(2.875rem,3.2vw,10rem)] rounded-sm" />
          </div>
          <div className="relative w-full h-125 mt-[clamp(0.75rem,0.85vw,3rem)] lg:h-auto rounded-[10px] overflow-hidden bg-[#1a1a1a] flex justify-center py-[clamp(2.5rem,2.8vw,8rem)] px-[clamp(1.25rem,1.4vw,4rem)]">
            <Skeleton className="w-[80%] h-full min-h-125" />
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
                <li key={i} className="w-[clamp(2.25rem,2.6vw,8rem)] h-[clamp(2.25rem,2.6vw,8rem)]">
                  <Skeleton className="w-full h-full rounded-full" />
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-[clamp(0.375rem,0.45vw,1.5rem)] mt-[clamp(0.5rem,0.6vw,2rem)]">
              <Skeleton className="h-[clamp(1rem,1.1vw,3rem)] w-full" />
              <Skeleton className="h-[clamp(1rem,1.1vw,3rem)] w-5/6" />
            </div>
          </div>
        </BentoCard>
      </div>
    );
  }

  return (
    <div className="w-full h-full lg:pr-[clamp(12px,0.85vw,3rem)] px-3 lg:px-0 py-[clamp(12px,0.85vw,3rem)] overflow-y-auto no-scrollbar overflow-hidden flex flex-col gap-[clamp(12px,0.85vw,3rem)]">
      <BentoCard
        title={"Resume"}
        icon={<FileUser className="stroke-black" />}
        className="w-full relative gap-4 "
      >
        <div
          className={
            " absolute top-[clamp(14px,1vw,4rem)] right-[clamp(18px,1.25vw,4rem)] cursor-pointer text-[clamp(16px,1.2vw,4rem)] text-zinc-900 z-10 stroke-black group"
          }
          asChild
        >
          <a
            href="/Magollado-Lance-Kent-Geoffrey-Resume.pdf"
            download={"Lance_Kent_Geoffrey_B_Magollado_Resume.pdf"}
            className="flex gap-[clamp(8px,0.5vw,4rem)] items-center py-[clamp(4px,0.55vw,1.5rem)] px-[clamp(8px,1.1vw,4rem)] rounded-[clamp(4px,0.55vw,2.5rem)] border hover:bg-zinc-200 dark:bg-white "
          >
            <Download
              strokeWidth={1.5}
              className="stroke-zinc-900 group-hover:stroke-zinc-900 w-[clamp(18px,1.25vw,4rem)] h-auto"
            />
            <span className="lg:block hidden ">Download</span>
          </a>
        </div>

        <div className="animate-in fade-in duration-700 delay-300 fill-mode-backwards relative w-full h-125 mt-3 lg:h-auto rounded-[10px] overflow-hidden bg-[#1a1a1a]">
          <div className="absolute bottom-[clamp(24px,1.65vw,4rem)] left-1/2 -translate-x-1/2 flex gap-[clamp(8px,0.5vw,4rem)] z-20">
            <Button
              variant="secondary"
              onClick={zoomOut}
              className="w-[clamp(40px,2.8vw,200px)] h-[clamp(40px,2.8vw,200px)] p-0 rounded-full text-[clamp(18px,1.2vw,4rem)] shadow-md cursor-pointer hover:bg-gray-200"
            >
              -
            </Button>
            <Button
              variant="secondary"
              onClick={zoomIn}
              className="w-[clamp(40px,2.8vw,200px)] h-[clamp(40px,2.8vw,200px)] p-0 rounded-full text-[clamp(18px,1.2vw,4rem)] shadow-md cursor-pointer hover:bg-gray-200"
            >
              +
            </Button>
          </div>

          <div className="w-full h-full overflow-auto no-scrollbar">
            <div className="min-w-full min-h-full w-fit flex justify-center items-center lg:p-10 mx-auto p-2">
              <div
                className="shadow-2xl bg-white shrink-0"
                style={{
                  width: pageSize.width * scale,
                  height: pageSize.height * scale,
                }}
              >
                <Document
                  file="/Magollado-Lance-Kent-Geoffrey-Resume.pdf"
                  loading={<p className="text-black m-10">Loading resume...</p>}
                  error={
                    <p className="text-red-500 m-10">Failed to load PDF.</p>
                  }
                >
                  <Page
                    pageNumber={1}
                    scale={scale}
                    onLoadSuccess={(page) =>
                      setPageSize({
                        width: page.originalWidth,
                        height: page.originalHeight,
                      })
                    }
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                  />
                </Document>
              </div>
            </div>
          </div>
        </div>
      </BentoCard>

      <ContactMe
        animKey="rc-cm-m"
        wrapperClass="animate-in fade-in duration-700 delay-500 fill-mode-backwards"
      />
    </div>
  );
}

export default ResumeContent;
