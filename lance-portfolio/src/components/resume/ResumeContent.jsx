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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const initialScale = windowWidth < 1024 ? 0.45 : 1.25;

  const [scale, setScale] = useState(initialScale);

  useEffect(() => {
    setScale(initialScale);
  }, [initialScale]);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 2.5));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.4));

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
      <div className="w-full h-full lg:pr-3 px-3 lg:px-0 py-3 overflow-y-auto no-scrollbar overflow-hidden flex flex-col gap-3 min-h-[101vh]">
        <BentoCard
          title={"Resume"}
          icon={<FileUser className="stroke-black" />}
          className="w-full relative gap-4 "
        >
          <div className="absolute lg:top-5 top-4 right-4.5 z-10 hidden sm:block">
            <Skeleton className="w-31 h-11.5 rounded-sm" />
          </div>
          <div className="relative w-full h-125 mt-3 lg:h-auto rounded-[10px] overflow-hidden bg-[#1a1a1a] flex justify-center py-10 px-5">
            <Skeleton className="w-[80%] h-full min-h-125" />
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
    <div className="w-full h-full lg:pr-3 px-3 lg:px-0 py-3 overflow-y-auto no-scrollbar overflow-hidden flex flex-col gap-3">
      <BentoCard
        title={"Resume"}
        icon={<FileUser className="stroke-black" />}
        className="w-full relative gap-4 "
      >
        <button
          className={
            "animate-in fade-in duration-700 delay-300 fill-mode-backwards absolute top-4 right-4.5 cursor-pointer lg:text-[16px] text-sm  text-zinc-900 z-10 stroke-black group"
          }
          asChild
        >
          <a
            href="/Magollado-Lance-Kent-Geoffrey-Resume.pdf"
            download={"Lance_Kent_Geoffrey_B_Magollado_Resume.pdf"}
            className="flex gap-2 items-center py-3 px-3 rounded-sm lg:py-2 lg:px-4 border hover:bg-zinc-200 dark:bg-white  transition duration-300 ease-out"
          >
            <Download
              strokeWidth={1.5}
              className="stroke-zinc-900 group-hover:stroke-zinc-900 w-4.5 h-4.5"
            />
            <span>Download</span>
          </a>
        </button>

        <div className="animate-in fade-in duration-700 delay-300 fill-mode-backwards relative w-full h-125 mt-3 lg:h-auto rounded-[10px] overflow-hidden bg-[#1a1a1a]">
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            <Button
              variant="secondary"
              onClick={zoomOut}
              className="w-10 h-10 p-0 rounded-full text-lg shadow-md cursor-pointer hover:bg-gray-200"
            >
              -
            </Button>
            <Button
              variant="secondary"
              onClick={zoomIn}
              className="w-10 h-10 p-0 rounded-full text-lg shadow-md cursor-pointer hover:bg-gray-200"
            >
              +
            </Button>
          </div>

          <div className="w-full h-full overflow-auto no-scrollbar">
            <div className="min-w-full min-h-full w-fit flex justify-center items-center lg:p-10 mx-auto p-2 transition-all duration-300">
              <div className="shadow-2xl bg-white">
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
