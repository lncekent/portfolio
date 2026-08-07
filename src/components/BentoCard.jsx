function BentoCard({ title, icon, children, className = "" }) {
  return (
    <div
      className={`w-full flex flex-col overflow-hidden select-none bg-card rounded-[clamp(10px,0.7vw,2rem)] p-[clamp(0.75rem,1.1vw,5rem)] gap-[clamp(0.75rem,1vw,5rem)] shrink-0 ${className} min-w-0 `}
    >
      {/* Card Header (Icon + Title) */}
      <div className="flex items-center gap-[clamp(0.375rem,0.6vw,2.5rem)] stroke-foreground ">
        <span className="dark:invert w-[clamp(26px,1.6vw,280px)] h-[clamp(26px,1.6vw,280px)] [&>svg]:w-full [&>svg]:h-full">{icon}</span>

        <span className="font-semibold text-[clamp(18px,1.6vw,280px)]">
          {title}
        </span>
      </div>

      {/* Card Body (Dito papasok yung specific content ng bawat card) */}
      <div className="w-full flex-1">{children}</div>
    </div>
  );
}

export default BentoCard;
