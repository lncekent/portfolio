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
              <div className="relative flex items-center justify-center h-24 w-24">
                <div className="absolute animate-ping rounded-full h-full w-full bg-[#3FA6F4] opacity-10"></div>
                <div className="absolute animate-ping rounded-full h-3/4 w-3/4 bg-[#3FA6F4] opacity-20 [animation-delay:0.3s]"></div>
                <img
                  src="https://res.cloudinary.com/dxatb3m2q/image/upload/q_auto,f_auto/v1775296257/me-daytime_c7zkax.png"
                  alt="Avatar Day"
                  className="relative rounded-full h-25 w-25 border-2 border-[#3FA6F4] shadow-[0_0_30px_10px_#3FA6F4A0]"
                />
              </div>
            </div>
          </div>

          <div
            className={`inset-0 absolute transition-opacity duration-1000 ${isDarkMode ? "opacity-100" : "opacity-0"}`}
          >
            <div className="inset-0 absolute bg-zinc-950/70"></div>
            <div className="inset-0 absolute flex items-center justify-center">
              <div className="relative flex items-center justify-center h-24 w-24">
                <div className="absolute animate-ping rounded-full h-full w-full bg-[#3FA6F4] opacity-10"></div>

                <div className="absolute animate-ping rounded-full h-3/4 w-3/4 bg-[#3FA6F4] opacity-20 [animation-delay:0.3s]"></div>

                <img
                  src="https://res.cloudinary.com/dxatb3m2q/image/upload/q_auto,f_auto/v1775296258/me-nighttime_le7sxn.png"
                  alt="Avatar Night"
                  className="relative rounded-full h-25 w-25 border-2 border-[#3FA6F4] shadow-[0_0_30px_10px_#3FA6F4A0]"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="lg:hidden block w-full bg-transparent px-3 pt-3 ">
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
                Current 3rd Year IT Student
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
        className={`fixed  inset-0 bg-black/20 z-40 transition-opacity duration-300 lg:hidden ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      <div
        className={`fixed top-0 left-0 h-full w-[75%] bg-card z-50 transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto no-scrollbar ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
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
                  Current 3rd Year IT Student
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
                  <p className="text-sm">Blog</p>
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

      <nav className="hidden lg:block max-h-screen w-[18%] bg-card rounded-[10px] p-4 my-3 ml-3 select-none">
        <div className="w-full flex flex-col h-full justify-between">
          <div className="w-full flex flex-col">
            <div className="w-full flex justify-center">
              <div className="flex h-15 w-15 rounded-full overflow-hidden">
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
            <h3 className="text-center text-zinc-900 dark:text-zinc-100 text-[18px] font-semibold tracking-tight text-nowrap whitespace-nowrap text-ellipsis overflow-hidden w-full pt-3">
              Lance Kent
            </h3>
            <h2 className="text-zinc-600 dark:text-zinc-400 text-center font-light text-[13px] pb-6 mt-0.5">
              Current 3rd Year IT Student
            </h2>

            <NavLink
              to={"/resume"}
              className={({ isActive }) =>
                cn(
                  "py-2 rounded-[10px] flex gap-2.5 justify-center cursor-pointer text-[15px] ease-in transition-all duration-75 dark:text-white border",
                  isActive
                    ? "text-[#3FA6F4] hover:text-[#7ac0f5] hover:border-[#7ac0f5] dark:hover:text-[#3FA6F4] dark:border-[#3FA6F4] border-[#3FA6F4] dark:stroke-[#3FA6F4] hover:bg-white dark:text-[#3FA6F4] dark:hover:bg-secondary"
                    : "text-[#00000080] bg-card border-border stroke-[#00000060] hover:text-[#7abdf0] hover:border-[#7abdf0] dark:stroke-white  hover:stroke-[#7abdf0] ",
                )
              }
            >
              <div className="flex items-center gap-2">
                <Download strokeWidth={1.75} className="w-4" />
                <span>Resume</span>
              </div>
            </NavLink>
          </div>
          <div className="border border-border mt-6 mb-3"></div>
          <div>
            <NavLink
              to="/"
              className={({ isActive }) => ` 
                        ${
                          isActive
                            ? "flex items-center gap-2.5 py-3 pl-3 cursor-pointer text-[#3FA6F4] hover:text-[#3FA6F4] ease-in stroke-[#3FA6F4] transition duration-75 bg-secondary"
                            : "flex  items-center gap-2.5 py-3  pl-3  cursor-pointer text-foreground hover:text-[#7abdf0] ease-in stroke-foreground transition duration-75 hover:stroke-[#7abdf0] bg-card hover:bg-secondary"
                        }`}
            >
              <House strokeWidth={1.5} className="w-5 stroke-current" />
              <p>Home</p>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => ` 
                        ${
                          isActive
                            ? "flex items-center  pl-3  gap-2.5 py-3 cursor-pointer text-[#3FA6F4] hover:text-[#3FA6F4] ease-in stroke-[#3FA6F4] transition duration-75 bg-secondary"
                            : "flex  pl-3 items-center gap-2.5 py-3 cursor-pointer text-foreground hover:text-[#7abdf0] ease-in stroke-foreground transition duration-75 hover:stroke-[#7abdf0] bg-card hover:bg-secondary"
                        }`}
            >
              <User strokeWidth={1.5} className="w-5 stroke-current" />
              <p>About</p>
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) => ` 
                        ${
                          isProjectLocation
                            ? "flex  pl-3  items-center gap-2.5 py-3 cursor-pointer text-[#3FA6F4] hover:text-[#3FA6F4] ease-in stroke-[#3FA6F4] transition duration-75 bg-secondary"
                            : "flex  pl-3 items-center gap-2.5 py-3 cursor-pointer text-foreground hover:text-[#7abdf0] ease-in stroke-foreground transition duration-75 hover:stroke-[#7abdf0] bg-card hover:bg-secondary"
                        }`}
            >
              <FolderGit2 strokeWidth={1.5} className="w-5 stroke-current" />
              <p>Projects</p>
            </NavLink>
            <NavLink
              to="/achievements"
              className={({ isActive }) => ` 
                        ${
                          isActive
                            ? "flex  pl-3  items-center gap-2.5 py-3 cursor-pointer text-[#3FA6F4] hover:text-[#3FA6F4] ease-in stroke-[#3FA6F4] transition duration-75 bg-secondary"
                            : "flex  pl-3  items-center gap-2.5 py-3 cursor-pointer text-foreground hover:text-[#7abdf0] ease-in stroke-foreground transition duration-75 hover:stroke-[#7abdf0] bg-card hover:bg-secondary"
                        }`}
            >
              <Award strokeWidth={1.5} className="w-5 stroke-current" />
              <p>Achievements</p>
            </NavLink>
            <NavLink
              to="/blog"
              className={() => ` 
                        ${
                          isBlogActive
                            ? "flex  pl-3  items-center gap-2.5 py-3 cursor-pointer text-[#3FA6F4] hover:text-[#3FA6F4] ease-in stroke-[#3FA6F4] transition duration-75 bg-secondary"
                            : "flex  pl-3  items-center gap-2.5 py-3 cursor-pointer text-foreground hover:text-[#7abdf0] ease-in stroke-foreground transition duration-75 hover:stroke-[#7abdf0] bg-card hover:bg-secondary"
                        }`}
            >
              <BookOpen strokeWidth={1.5} className="w-5 stroke-current" />
              <p>Blog</p>
            </NavLink>
          </div>
          <div className="border border-border my-3"></div>
          <div className="w-full flex flex-col">
            <div className="flex flex-row gap-2.5 items-center pl-3 my-3">
              <Switch
                className={"cursor-pointer"}
                checked={isDarkMode}
                onCheckedChange={handleThemeToggle}
              />
              <span className="text-black dark:text-white text-[16px]">
                Dark Mode
              </span>
            </div>
            <div className="mt-4">
              <p className="text-zinc-600 dark:text-zinc-400 font-light text-xs text-nowrap overflow-hidden text-ellipsis">
                Designed and Built By Lance Kent Geoffrey B. Magollado
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 font-light text-xs text-nowrap overflow-hidden text-ellipsis">
                @2025 All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
