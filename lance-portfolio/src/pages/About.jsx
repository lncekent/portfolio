import AboutContent from "@/components/about/AboutContent";
import AboutSubContent from "@/components/about/AboutSubContent";

function About() {
  return (
    <div className="px-3 lg:px-0 grid lg:grid-cols-[2fr_2fr] grid-cols-1 lg:gap-3 overflow-y-auto h-full">
      <AboutContent />
      <AboutSubContent />
    </div>
  );
}

export default About;
