import SubContent from "@/components/home/HomeSubContent";
import Content from "@/components/home/HomeContent";

function Home() {
  return (
    <div className="w-full grid lg:grid-cols-[2fr_1fr] lg:gap-[clamp(12px,0.85vw,4rem)] grid-cols-1 overflow-y-auto h-full pb-3 lg:pb-0">
      <Content />
      <SubContent />
    </div>
  );
}

export default Home;
