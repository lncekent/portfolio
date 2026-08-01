function Preloader() {
  return (
    // Solid background na pumapatong sa lahat (z-[99999])
    <div className="fixed inset-0 w-full min-h-screen flex flex-col justify-center items-center bg-[#ECECEC] dark:bg-[#2e2e2e] select-none z-99999">
      <div className="relative flex items-center justify-center h-24 w-24">
        {/* WAVES (Pings): Gray/Zinc colors imbes na Blue */}
        <div className="absolute animate-ping rounded-full h-full w-full bg-zinc-500 dark:bg-zinc-400 opacity-20"></div>
        <div className="absolute animate-ping rounded-full h-3/4 w-3/4 bg-zinc-500 dark:bg-zinc-400 opacity-30 [animation-delay:0.3s]"></div>

        {/* LIGHT MODE AVATAR: Nakatago kapag dark mode */}
        <img
          src="https://res.cloudinary.com/dxatb3m2q/image/upload/q_auto,f_auto/v1775296257/me-daytime_c7zkax.png"
          alt="Loading Day Avatar"
          className="relative block dark:hidden rounded-full h-full w-full object-cover border-2 border-zinc-400 shadow-[0_0_30px_10px_rgba(161,161,170,0.3)]"
        />

        {/* DARK MODE AVATAR: Nakatago kapag light mode */}
        <img
          src="https://res.cloudinary.com/dxatb3m2q/image/upload/q_auto,f_auto/v1775296258/me-nighttime_le7sxn.png"
          alt="Loading Night Avatar"
          className="relative hidden dark:block rounded-full h-full w-full object-cover border-2 border-zinc-500 shadow-[0_0_30px_10px_rgba(82,82,91,0.4)]"
        />
      </div>
    </div>
  );
}

export default Preloader;
