import BentoCard from "../BentoCard";
import ContactMe from "../ContactMe";
import AchievementCard from "./AchievementCard";
import { achievementsData } from "@/data";
import { useState, useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import { Award, BookOpenText, Phone } from "lucide-react";

const certifications = achievementsData.filter(
  (item) => item.category === "certification",
);
const education = achievementsData.filter(
  (item) => item.category === "education",
);

let isLoaded = false;

function AchievementsContent() {
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
      <div className="w-full flex flex-col gap-[clamp(12px,0.85vw,3rem)] px-3 lg:pl-0 lg:overflow-y-auto lg:no-scrollbar lg:py-[clamp(12px,0.85vw,3rem)] pt-3 select-none min-h-[101vh] pb-[clamp(12px,0.85vw,3rem)]">
        <BentoCard
          title={"Technical Certifications"}
          icon={<Award className="stroke-black" />}
        >
          <div className="grid lg:grid-cols-4 grid-cols-1 gap-[clamp(1rem,1.5vw,4rem)]">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col gap-[clamp(0.75rem,0.9vw,2.5rem)] py-[clamp(0.25rem,0.3vw,1.5rem)]">
                <Skeleton className="w-full h-[clamp(10rem,14vw,40rem)] rounded-[10px]" />
                <div className="flex flex-col gap-[clamp(0.375rem,0.45vw,1.5rem)] w-full">
                  <Skeleton className="h-[clamp(1.25rem,1.4vw,4rem)] w-3/4" />
                  <Skeleton className="h-[clamp(1rem,1.1vw,3rem)] w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </BentoCard>

        <BentoCard
          title={"Leadership & Milestones"}
          icon={<BookOpenText className="stroke-black" />}
        >
          <div className="grid lg:grid-cols-4 grid-cols-1 gap-[clamp(1rem,1.5vw,4rem)]">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col gap-[clamp(0.75rem,0.9vw,2.5rem)] py-[clamp(0.25rem,0.3vw,1.5rem)]">
                <Skeleton className="w-full h-[clamp(10rem,14vw,40rem)] rounded-[10px]" />
                <div className="flex flex-col gap-[clamp(0.375rem,0.45vw,1.5rem)] w-full">
                  <Skeleton className="h-[clamp(1.25rem,1.4vw,4rem)] w-3/4" />
                  <Skeleton className="h-[clamp(1rem,1.1vw,3rem)] w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </BentoCard>

        <BentoCard
          title="Contact Me"
          icon={<Phone className="stroke-black" />}
        >
          <div className="flex flex-col justify-between gap-[clamp(1.5rem,2vw,5rem)]">
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
    <div className="py-[clamp(12px,0.85vw,3rem)] px-3 lg:px-0 lg:pr-[clamp(12px,0.85vw,3rem)] overflow-y-scroll flex-col gap-[clamp(12px,0.85vw,3rem)] no-scrollbar w-full flex  min-w-0 [scrollbar-gutter:stable]">
      <BentoCard
        title={"Technical Certifications"}
        icon={<Award className="stroke-black" />}
      >
        <div
          key="ac-grid-1"
          className="animate-in fade-in duration-700 delay-150 fill-mode-both transform-gpu will-change-transform grid lg:grid-cols-4 grid-cols-1 gap-[clamp(1rem,1.5vw,4rem)]"
        >
          {certifications.map((cert) => (
            <AchievementCard key={cert.id} data={cert} list={certifications} />
          ))}
        </div>
      </BentoCard>

      <BentoCard
        title={"Leadership & Milestones"}
        icon={<BookOpenText className="stroke-black" />}
      >
        <div
          key="ac-grid-2"
          className="animate-in fade-in duration-700 delay-200 fill-mode-both transform-gpu will-change-transform grid lg:grid-cols-4 grid-cols-1 gap-[clamp(1rem,1.5vw,4rem)]"
        >
          {education.map((edu) => (
            <AchievementCard key={edu.id} data={edu} list={education} />
          ))}
        </div>
      </BentoCard>
      <ContactMe
        animKey="ac-btn"
        wrapperClass="animate-in fade-in duration-700 delay-300 fill-mode-both transform-gpu will-change-transform"
      />
    </div>
  );
}

export default AchievementsContent;
