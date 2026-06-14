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
      <div className="w-full flex flex-col gap-3 p-3 lg:overflow-y-auto lg:no-scrollbar lg:py-3 select-none min-h-[101vh]">
        <BentoCard
          title={"Technical Certifications"}
          icon={<Award className="stroke-black" />}
        >
          <div className="grid lg:grid-cols-4 grid-cols-1 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col gap-4 py-1">
                <Skeleton className="w-full h-40 rounded-[10px]" />
                <div className="flex flex-col gap-1.5 w-full">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </BentoCard>

        <BentoCard
          title={"Leadership & Milestones"}
          icon={<BookOpenText className="stroke-black" />}
        >
          <div className="grid lg:grid-cols-4 grid-cols-1 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col gap-4 py-1">
                <Skeleton className="w-full h-40 rounded-[10px]" />
                <div className="flex flex-col gap-1.5 w-full">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
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
    <div className="py-3 px-3 lg:px-0 lg:pr-3 overflow-y-scroll flex-col gap-3 no-scrollbar w-full flex  min-w-0 [scrollbar-gutter:stable]">
      <BentoCard
        title={"Technical Certifications"}
        icon={<Award className="stroke-black" />}
      >
        <div
          key="ac-grid-1"
          className="animate-in fade-in duration-700 delay-150 fill-mode-both transform-gpu will-change-transform grid lg:grid-cols-4 grid-cols-1 gap-6"
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
          className="animate-in fade-in duration-700 delay-200 fill-mode-both transform-gpu will-change-transform grid lg:grid-cols-4 grid-cols-1 gap-6"
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
