import { Switch } from "./ui/switch";
import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import {
  Download,
  House,
  User,
  FolderGit2,
  Award,
  BookOpen,
  X,
  Menu,
} from "lucide-react";

function Sidebar() {
  // State for Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });
  const [isChangingTheme, setIsChangingTheme] = useState(false);

  useEffect(() => {
    const faviconLink = document.getElementById("dynamic-favicon");
    if (faviconLink) {
      faviconLink.type = "image/png";
      faviconLink.href = isDarkMode
        ? "https://res.cloudinary.com/dxatb3m2q/image/upload/q_auto,f_auto/v1775296385/me-nighttime-circle_sljnbt.png"
        : "https://res.cloudinary.com/dxatb3m2q/image/upload/q_auto,f_auto/v1775296384/me-daytime-circle_gxlz25.png";
    }
  }, [isDarkMode]);

  const handleThemeToggle = (checked) => {
    setIsChangingTheme(true);

    setTimeout(() => {
      setIsDarkMode(checked);

      setTimeout(() => {
        setIsChangingTheme(false);
      }, 1500);
    }, 1000);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const location = useLocation();

  const isBlogActive = location.pathname.includes("/blog");

  const isProjectLocation = location.pathname.includes("/projects");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <>
      {isChangingTheme && (
        <div className="fixed inset-0 z-9999 backdrop-blur-3xl animate-fade-in transition-opacity duration-500">
          <div
            className={`inset-0 absolute transition-opacity duration-1000 ${!isDarkMode ? "opacity-100" : "opacity-0"}`}
          >
            <div className="inset-0 absolute bg-white/70"></div>
            <div className="inset-0 absolute flex items-center justify-center">
              <div className="relative flex items-center justify-center w-[clamp(100px,7vw,20rem)]">
                <div className="absolute animate-ping rounded-full h-full w-full bg-[#3FA6F4] opacity-10"></div>
                <div className="absolute animate-ping rounded-full h-3/4 w-3/4 bg-[#3FA6F4] opacity-20 [animation-delay:0.3s]"></div>
                <img
                  src="https://res.cloudinary.com/dxatb3m2q/image/upload/q_auto,f_auto/v1775296257/me-daytime_c7zkax.png"
                  alt="Avatar Day"
                  className="relative rounded-full w-[clamp(100px,7vw,20rem)] border-2 border-[#3FA6F4] shadow-[0_0_30px_10px_#3FA6F4A0]"
                />
              </div>
            </div>
          </div>

          <div
            className={`inset-0 absolute transition-opacity duration-1000 ${isDarkMode ? "opacity-100" : "opacity-0"}`}
          >
            <div className="inset-0 absolute bg-zinc-950/70"></div>
            <div className="inset-0 absolute flex items-center justify-center">
              <div className="relative flex items-center justify-center w-[clamp(100px,7vw,20rem)]">
                <div className="absolute animate-ping rounded-full h-full w-full bg-[#3FA6F4] opacity-10"></div>

                <div className="absolute animate-ping rounded-full h-3/4 w-3/4 bg-[#3FA6F4] opacity-20 [animation-delay:0.3s]"></div>

                <img
                  src="https://res.cloudinary.com/dxatb3m2q/image/upload/q_auto,f_auto/v1775296258/me-nighttime_le7sxn.png"
                  alt="Avatar Night"
                  className="relative rounded-full w-[clamp(100px,7vw,20rem)] border-2 border-[#3FA6F4] shadow-[0_0_30px_10px_#3FA6F4A0]"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="md:hidden block w-full bg-transparent px-3 pt-3 ">
        <div className="lg:hidden w-full h-14 bg-card rounded-[10px] px-3 flex justify-between items-center">
          <Link to={"/"} className="w-fit h-full items-center flex gap-2">
            <div className="h-8 w-8 rounded-full overflow-hidden">
              <img
                src={
                  isDarkMode
                    ? "https://res.cloudinary.com/dxatb3m2q/image/upload/q_auto,f_auto/v1775296258/me-nighttime_le7sxn.png"
                    : "https://res.cloudinary.com/dxatb3m2q/image/upload/q_auto,f_auto/v1775296257/me-daytime_c7zkax.png"
                }
                alt=""
                className="w-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <h3 className=" text-foreground text-[16px] font-semibold">
                Lance Kent
              </h3>
              <h2 className="text-zinc-600 dark:text-zinc-400 font-light text-center text-[10px]">
                Current 4th Year IT Student
              </h2>
            </div>
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="cursor-pointer focus:outline-none"
          >
            <Menu className="stroke-black dark:stroke-white" />
          </button>
        </div>
      </div>

      <div
        className={`fixed  inset-0 bg-black/20 z-40 transition-opacity duration-300 md:hidden ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      <div
        className={`fixed top-0 left-0 h-full w-[75%] bg-card z-50 transition-transform duration-300 ease-in-out md:hidden overflow-y-auto no-scrollbar ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 flex flex-col h-full justify-between">
          <div className="flex flex-col">
            <div className="w-full flex justify-end mb-4">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="cursor-pointer"
              >
                <X className="stroke-black dark:stroke-white" />
              </button>
            </div>
            <div className="w-full flex flex-col h-full justify-between">
              <div className="w-full flex flex-col">
                <div className="w-full flex justify-center">
                  <div className="rounded-full overflow-hidden h-15 w-15 z-30 relative">
                    <img
                      src={
                        isDarkMode
                          ? "https://res.cloudinary.com/dxatb3m2q/image/upload/q_auto,f_auto/v1775296258/me-nighttime_le7sxn.png"
                          : "https://res.cloudinary.com/dxatb3m2q/image/upload/q_auto,f_auto/v1775296257/me-daytime_c7zkax.png"
                      }
                      className=" "
                      alt="Lance's Avatar"
                    ></img>
                  </div>
                </div>

                <h3 className="text-center text-zinc-900 dark:text-zinc-100 text-[17px] font-semibold tracking-tight text-nowrap whitespace-nowrap text-ellipsis overflow-hidden w-full pt-3">
                  Lance Kent
                </h3>
                <h2 className="text-zinc-600 dark:text-zinc-400 text-center font-light text-[12px] pb-6 mt-0.5">
                  Current 4th Year IT Student
                </h2>

                <NavLink
                  to={"/resume"}
                  className={({ isActive }) =>
                    cn(
                      "py-3 rounded-[10px] flex gap-2 justify-center cursor-pointer text-[15px] ease-in transition-all duration-75 dark:text-white border",
                      isActive
                        ? "text-[#3FA6F4] hover:text-[#3FA6F4] dark:border-[#3FA6F4] border-[#3FA6F4] stroke-[#3FA6F4] hover:bg-white dark:text-[#3FA6F4]"
                        : "text-[#00000080] bg-card border-border stroke-[#00000060] hover:text-[#7abdf0] hover:border-[#7abdf0] dark:stroke-white  hover:stroke-[#7abdf0] ",
                    )
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Download className="w-4 h-4 stroke-current" />
                  <span className="text-sm">Resume</span>
                </NavLink>
              </div>
              <div className="border border-border mt-6 mb-3"></div>
              <div>
                <NavLink
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) => ` 
                        ${
                          isActive
                            ? "flex pl-3 items-center gap-2.5 py-3 cursor-pointer text-[#3FA6F4] hover:text-[#3FA6F4] ease-in stroke-[#3FA6F4] transition duration-75 bg-secondary"
                            : "flex pl-3 items-center gap-2.5 py-3 cursor-pointer text-foreground hover:text-[#7abdf0] ease-in stroke-foreground transition duration-75 hover:stroke-[#7abdf0] bg-card hover:bg-secondary"
                        }`}
                >
                  <House strokeWidth={1.5} className="w-4 h-4 stroke-current" />
                  <p className="text-sm">Home</p>
                </NavLink>
                <NavLink
                  to="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) => ` 
                        ${
                          isActive
                            ? "flex pl-3 items-center gap-2.5 py-3 cursor-pointer text-[#3FA6F4] hover:text-[#3FA6F4] ease-in stroke-[#3FA6F4] transition duration-75 bg-secondary"
                            : "flex pl-3 items-center gap-2.5 py-3 cursor-pointer text-foreground hover:text-[#7abdf0] ease-in stroke-foreground transition duration-75 hover:stroke-[#7abdf0] bg-card hover:bg-secondary"
                        }`}
                >
                  <User strokeWidth={1.5} className="w-4 h-4 stroke-current" />
                  <p className="text-sm">About</p>
                </NavLink>
                <NavLink
                  to="/projects"
                  onClick={() => setIsMenuOpen(false)}
                  className={() => ` 
                        ${
                          isProjectLocation
                            ? "flex pl-3 items-center gap-2.5 py-3 cursor-pointer text-[#3FA6F4] hover:text-[#3FA6F4] ease-in stroke-[#3FA6F4] transition duration-75 bg-secondary"
                            : "flex pl-3 items-center gap-2.5 py-3 cursor-pointer text-foreground hover:text-[#7abdf0] ease-in stroke-foreground transition duration-75 hover:stroke-[#7abdf0] bg-card hover:bg-secondary"
                        }`}
                >
                  <FolderGit2
                    strokeWidth={1.5}
                    className="w-4 h-4 stroke-current"
                  />
                  <p className="text-sm">Projects</p>
                </NavLink>
                <NavLink
                  to="/achievements"
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) => ` 
                        ${
                          isActive
                            ? "flex pl-3 items-center gap-2.5 py-3 cursor-pointer text-[#3FA6F4] hover:text-[#3FA6F4] ease-in stroke-[#3FA6F4] transition duration-75 bg-secondary"
                            : "flex pl-3 items-center gap-2.5 py-3 cursor-pointer text-foreground hover:text-[#7abdf0] ease-in stroke-foreground transition duration-75 hover:stroke-[#7abdf0] bg-card hover:bg-secondary"
                        }`}
                >
                  <Award strokeWidth={1.5} className="w-4 h-4 stroke-current" />
                  <p className="text-sm">Achievements</p>
                </NavLink>
                <NavLink
                  to="/blog"
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) => ` 
                        ${
                          isBlogActive
                            ? "flex pl-3 items-center gap-2.5 py-3 cursor-pointer text-[#3FA6F4] hover:text-[#3FA6F4] ease-in stroke-[#3FA6F4] transition duration-75 bg-secondary"
                            : "flex pl-3 items-center gap-2.5 py-3 cursor-pointer text-foreground hover:text-[#7abdf0] ease-in stroke-foreground transition duration-75 hover:stroke-[#7abdf0] bg-card hover:bg-secondary"
                        }`}
                >
                  <BookOpen
                    strokeWidth={1.5}
                    className="w-4 h-4 stroke-current"
                  />
                  <p className="text-sm">Blogs</p>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col">
            <div className="border border-border my-3"></div>
            <div className="flex flex-row gap-2.5 items-center pl-3 my-3">
              <Switch
                className={"cursor-pointer"}
                checked={isDarkMode}
                onCheckedChange={handleThemeToggle}
              />
              <span className=" text-sm text-foreground">Dark Mode</span>
            </div>
            <div className="mt-4">
              <p className="text-[11px] lg:text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400 font-light text-nowrap overflow-hidden text-ellipsis">
                Designed and Built By Lance Kent Geoffrey B. Magollado
              </p>
              <p className="text-[11px] lg:text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400 font-light text-nowrap overflow-hidden text-ellipsis">
                @2025 All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      <nav className="hidden md:block md:overflow-y-auto md:max-h-[calc(100vh-clamp(24px,1.7vw,8rem))] no-scrollbar lg:h-[calc(100vh-clamp(24px,1.7vw,8rem))] md:h-fit lg:max-h-screen lg:w-[18%] md:w-[23%] bg-card rounded-[clamp(10px,0.7vw,3rem)] px-[clamp(1rem,1.1vw,4rem)] pt-[clamp(1rem,1.1vw,4rem)] my-[clamp(12px,0.85vw,4rem)] ml-[clamp(12px,0.85vw,4rem)] select-none sticky top-3 shrink-0">
        <div className="w-full flex flex-col h-full justify-between">
          <div className="w-full flex flex-col">
            <div className="w-full flex justify-center">
              <div className="flex h-[clamp(3.75rem,4.5vw,12rem)] w-[clamp(3.75rem,4.5vw,12rem)] rounded-full overflow-hidden">
                <img
                  src={
                    isDarkMode
                      ? "https://res.cloudinary.com/dxatb3m2q/image/upload/q_auto,f_auto/v1775296258/me-nighttime_le7sxn.png"
                      : "https://res.cloudinary.com/dxatb3m2q/image/upload/q_auto,f_auto/v1775296257/me-daytime_c7zkax.png"
                  }
                  className="w-full object-cover"
                ></img>
              </div>
            </div>
            <h3 className="text-center text-zinc-900 dark:text-zinc-100 text-[clamp(18px,1.3vw,5rem)] font-semibold tracking-tight text-nowrap whitespace-nowrap text-ellipsis overflow-hidden w-full pt-[clamp(0.75rem,0.9vw,3rem)]">
              Lance Kent
            </h3>
            <h2 className="text-zinc-600 dark:text-zinc-400 text-center font-light text-[clamp(13px,0.95vw,4rem)] pb-[clamp(1.5rem,1.8vw,6rem)] mt-0.5">
              Current 4th Year IT Student
            </h2>

            <NavLink
              to={"/resume"}
              className={({ isActive }) =>
                cn(
                  "py-[clamp(0.5rem,0.6vw,2.5rem)] rounded-[clamp(10px,0.7vw,3rem)] flex gap-[clamp(0.5rem,0.7vw,2.5rem)] justify-center cursor-pointer text-[clamp(15px,1.1vw,5rem)] ease-in transition-all duration-75 dark:text-white border",
                  isActive
                    ? "text-[#3FA6F4] hover:text-[#7ac0f5] hover:border-[#7ac0f5] dark:hover:text-[#3FA6F4] dark:border-[#3FA6F4] border-[#3FA6F4] dark:stroke-[#3FA6F4] hover:bg-white dark:text-[#3FA6F4] dark:hover:bg-secondary"
                    : "text-[#00000080] bg-card border-border stroke-[#00000060] hover:text-[#7abdf0] hover:border-[#7abdf0] dark:stroke-white  hover:stroke-[#7abdf0] ",
                )
              }
            >
              <div className="flex items-center gap-[clamp(0.375rem,0.5vw,2rem)]">
                <Download
                  strokeWidth={1.75}
                  className="w-[clamp(1rem,1.2vw,4rem)] h-auto"
                />
                <span>Resume</span>
              </div>
            </NavLink>
          </div>
          <div className="border border-border mt-[clamp(1.5rem,1.8vw,6rem)] mb-[clamp(0.75rem,0.9vw,3rem)]"></div>
          <div>
            <NavLink
              to="/"
              className={({ isActive }) => ` 
                        ${
                          isActive
                            ? "flex items-center gap-[clamp(0.5rem,0.7vw,2.5rem)] py-[clamp(0.75rem,0.9vw,3rem)] pl-[clamp(0.75rem,0.9vw,3rem)] cursor-pointer text-[clamp(1rem,1.1vw,4rem)] text-[#3FA6F4] hover:text-[#3FA6F4] ease-in stroke-[#3FA6F4] transition duration-75 bg-secondary"
                            : "flex items-center gap-[clamp(0.5rem,0.7vw,2.5rem)] py-[clamp(0.75rem,0.9vw,3rem)] pl-[clamp(0.75rem,0.9vw,3rem)] cursor-pointer text-[clamp(1rem,1.1vw,4rem)] text-foreground hover:text-[#7abdf0] ease-in stroke-foreground transition duration-75 hover:stroke-[#7abdf0] bg-card hover:bg-secondary"
                        }`}
            >
              <House
                strokeWidth={1.5}
                className="w-[clamp(1.25rem,1.4vw,5rem)] h-auto stroke-current"
              />
              <p>Home</p>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => ` 
                        ${
                          isActive
                            ? "flex items-center gap-[clamp(0.5rem,0.7vw,2.5rem)] py-[clamp(0.75rem,0.9vw,3rem)] pl-[clamp(0.75rem,0.9vw,3rem)] cursor-pointer text-[clamp(1rem,1.1vw,4rem)] text-[#3FA6F4] hover:text-[#3FA6F4] ease-in stroke-[#3FA6F4] transition duration-75 bg-secondary"
                            : "flex items-center gap-[clamp(0.5rem,0.7vw,2.5rem)] py-[clamp(0.75rem,0.9vw,3rem)] pl-[clamp(0.75rem,0.9vw,3rem)] cursor-pointer text-[clamp(1rem,1.1vw,4rem)] text-foreground hover:text-[#7abdf0] ease-in stroke-foreground transition duration-75 hover:stroke-[#7abdf0] bg-card hover:bg-secondary"
                        }`}
            >
              <User
                strokeWidth={1.5}
                className="w-[clamp(1.25rem,1.4vw,5rem)] h-auto stroke-current"
              />
              <p>About</p>
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) => ` 
                        ${
                          isProjectLocation
                            ? "flex items-center gap-[clamp(0.5rem,0.7vw,2.5rem)] py-[clamp(0.75rem,0.9vw,3rem)] pl-[clamp(0.75rem,0.9vw,3rem)] cursor-pointer text-[clamp(1rem,1.1vw,4rem)] text-[#3FA6F4] hover:text-[#3FA6F4] ease-in stroke-[#3FA6F4] transition duration-75 bg-secondary"
                            : "flex items-center gap-[clamp(0.5rem,0.7vw,2.5rem)] py-[clamp(0.75rem,0.9vw,3rem)] pl-[clamp(0.75rem,0.9vw,3rem)] cursor-pointer text-[clamp(1rem,1.1vw,4rem)] text-foreground hover:text-[#7abdf0] ease-in stroke-foreground transition duration-75 hover:stroke-[#7abdf0] bg-card hover:bg-secondary"
                        }`}
            >
              <FolderGit2
                strokeWidth={1.5}
                className="w-[clamp(1.25rem,1.4vw,5rem)] h-auto stroke-current"
              />
              <p>Projects</p>
            </NavLink>
            <NavLink
              to="/achievements"
              className={({ isActive }) => ` 
                        ${
                          isActive
                            ? "flex items-center gap-[clamp(0.5rem,0.7vw,2.5rem)] py-[clamp(0.75rem,0.9vw,3rem)] pl-[clamp(0.75rem,0.9vw,3rem)] cursor-pointer text-[clamp(1rem,1.1vw,4rem)] text-[#3FA6F4] hover:text-[#3FA6F4] ease-in stroke-[#3FA6F4] transition duration-75 bg-secondary"
                            : "flex items-center gap-[clamp(0.5rem,0.7vw,2.5rem)] py-[clamp(0.75rem,0.9vw,3rem)] pl-[clamp(0.75rem,0.9vw,3rem)] cursor-pointer text-[clamp(1rem,1.1vw,4rem)] text-foreground hover:text-[#7abdf0] ease-in stroke-foreground transition duration-75 hover:stroke-[#7abdf0] bg-card hover:bg-secondary"
                        }`}
            >
              <Award
                strokeWidth={1.5}
                className="w-[clamp(1.25rem,1.4vw,5rem)] h-auto stroke-current"
              />
              <p>Achievements</p>
            </NavLink>
            <NavLink
              to="/blog"
              className={() => ` 
                        ${
                          isBlogActive
                            ? "flex items-center gap-[clamp(0.5rem,0.7vw,2.5rem)] py-[clamp(0.75rem,0.9vw,3rem)] pl-[clamp(0.75rem,0.9vw,3rem)] cursor-pointer text-[clamp(1rem,1.1vw,4rem)] text-[#3FA6F4] hover:text-[#3FA6F4] ease-in stroke-[#3FA6F4] transition duration-75 bg-secondary"
                            : "flex items-center gap-[clamp(0.5rem,0.7vw,2.5rem)] py-[clamp(0.75rem,0.9vw,3rem)] pl-[clamp(0.75rem,0.9vw,3rem)] cursor-pointer text-[clamp(1rem,1.1vw,4rem)] text-foreground hover:text-[#7abdf0] ease-in stroke-foreground transition duration-75 hover:stroke-[#7abdf0] bg-card hover:bg-secondary"
                        }`}
            >
              <BookOpen
                strokeWidth={1.5}
                className="w-[clamp(1.25rem,1.4vw,5rem)] h-auto stroke-current"
              />
              <p>Blogs</p>
            </NavLink>
          </div>
          <div className="border border-border my-[clamp(0.75rem,0.9vw,3rem)]"></div>
          <div className="w-full flex flex-col">
            <div className="flex gap-[clamp(0.5rem,0.7vw,2.5rem)] items-center pl-[clamp(0.75rem,0.9vw,3rem)] my-[clamp(0.75rem,0.9vw,3rem)] w-full h-full">
              <Switch
                className={
                  "cursor-pointer h-[clamp(1.15rem,1.3vw,5rem)]! w-[clamp(2rem,2.3vw,8rem)]! [&>span]:size-[clamp(0.9rem,1.1vw,4rem)]!"
                }
                checked={isDarkMode}
                onCheckedChange={handleThemeToggle}
              />
              <span className="text-black dark:text-white text-[clamp(16px,1.1vw,5rem)]">
                Dark Mode
              </span>
            </div>
            <div className="mt-[clamp(1rem,1.2vw,4rem)]">
              <p className="text-zinc-600 dark:text-zinc-400 font-light text-[clamp(12px,0.85vw,4rem)] leading-relaxed line-clamp-1">
                Designed and Built By Lance Kent Geoffrey B. Magollado
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 font-light text-[clamp(12px,0.85vw,4rem)] leading-relaxed  ">
                @2025 All Rights Reserved.
              </p>
            </div>
            <div
              className="shrink-0 h-[clamp(0.5rem,0.6vw,2rem)]"
              aria-hidden="true"
            ></div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
