function BentoCard({ title, icon, children, className = "" }) {
  return (
    <div
      className={`w-full flex flex-col overflow-hidden select-none bg-card rounded-[10px] p-4 gap-4 shrink-0 ${className} min-w-0 `}
    >
      {/* Card Header (Icon + Title) */}
      <div className="flex items-center gap-2 stroke-foreground ">
        <span className="dark:invert">{icon}</span>

        <span className="font-semibold text-[20px]">{title}</span>
      </div>

      {/* Card Body (Dito papasok yung specific content ng bawat card) */}
      <div className="w-full flex-1">{children}</div>
    </div>
  );
}

export default BentoCard;
