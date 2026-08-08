import AboutContent from "@/components/about/AboutContent";
import AboutSubContent from "@/components/about/AboutSubContent";

function About() {
  return (
    <div className="px-3 lg:px-0 grid lg:grid-cols-[2fr_2fr] grid-cols-1 lg:gap-[clamp(12px,0.85vw,3rem)] overflow-y-auto no-scrollbar h-full w-full pb-3 lg:pb-0">
      <AboutContent />
      <AboutSubContent />
    </div>
  );
}

export default About;
