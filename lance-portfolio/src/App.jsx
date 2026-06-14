import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Achievements from "./pages/Achievements";
import Blog from "./pages/Blog";
import Resume from "./pages/Resume";
import BlogSelected from "./pages/BlogSelected";
import ProjectSelected from "./pages/ProjectSelected";
import OfflineNotice from "./components/OfflineNotice";
import Preloader from "./components/Preloader";
import { TooltipProvider } from "./components/ui/tooltip";
import { MessageSquare, Maximize2, Minimize2 } from "lucide-react";
import ChatBot, { Button } from "react-chatbotify";

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(true);

  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const badges = document.querySelectorAll(".rcb-badge");
      badges.forEach((badge) => {
        if (badge.textContent === "0") {
          badge.style.display = "none";
        } else {
          badge.style.display = "flex";
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  if (!isOnline) {
    return <OfflineNotice />;
  }

  const styles = {
    chatWindowStyle: {
      width: "350px",
      height: "500px",
      backgroundColor: "var(--card)",
      userSelect: "none",
      transition: "all 0.3s ease-in-out",
    },
    sendButtonStyle: {
      backgroundColor: "#3FA6F4",
    },
    tooltipStyle: {
      backgroundColor: "var(--card)",
      color: "var(--foreground)",
      border: "1px solid var(--border)",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      padding: "8px 12px",
      fontFamily: "Inter",
      fontSize: "1rem",
      // Force positioning next to the button
      position: "absolute",
      right: "90px", // Places it 70px from the right edge (next to the 55px button)
      left: "auto", // Disables any default left alignment
      transform: "none", // Disables default translation offsets
      userSelect: "none",
    },
    chatButtonStyle: {
      width: "55px",
      height: "55px",
      background: "#3FA6F4",
      boxShadow: "0 4px 15px rgba(63, 166, 244, 0.4)",
      transition: "all 0.2s ease-in-out",
      userSelect: "none",
    },
    footerStyle: {
      display: "none",
    },
    headerStyle: {
      fontFamily: "Inter",
      fontSize: "0.75rem",
      fontWeight: "light",
      background: "#3FA6F4",
      color: "#fff",
      padding: "12px",
      border: "none",
    },
    botBubbleStyle: {
      backgroundColor: "var(--secondary)", // Soft gray card color in light mode, dark gray in dark mode
      color: "var(--foreground)", // Dynamic text color
      fontFamily: "Inter, sans-serif",
      fontSize: "0.9rem",
      borderRadius: "16px 16px 16px 4px", // Rounded bubble with flat tail
    },
    userBubbleStyle: {
      background: "#3FA6F4", // Signature blue for user messages
      color: "#fff",
      fontFamily: "Inter, sans-serif",
      fontSize: "0.95rem",
      borderRadius: "16px 16px 4px 16px", // Rounded bubble with flat tail
    },
    chatInputAreaStyle: {
      backgroundColor: "var(--card)",
      color: "var(--foreground)",
      fontFamily: "Inter, sans-serif",
      fontSize: "0.95rem",
      borderRadius: "16px 16px 4px 16px", // Rounded bubble with flat tail
    },
    chatInputContainerStyle: {
      backgroundColor: "#ECECEC",
      border: "none",
    },
    chatHistoryButtonStyle: {
      backgroundColor: "var(--card)",
      fontFamily: "Inter, sans-serif",
      fontSize: "0.75rem",
    },
  };

  const settings = {
    chatButton: {
      icon: () => <MessageSquare className="w-6 h-6 text-white" />,
    },
    tooltip: {
      mode: "CLOSE",
      text: "Ask me about Lance! 🤖",
    },
    header: {
      title: "Rio - AI Assistant",
      showAvatar: true,
      avatar:
        "https://res.cloudinary.com/dxatb3m2q/image/upload/q_auto,f_auto/v1775296257/me-daytime_c7zkax.png",
      buttons: [
        // Custom Maximize/Minimize button
        <button
          onClick={() => setIsMaximized((prev) => !prev)}
          className="cursor-pointer border-none p-0 flex items-center justify-center mr-1 text-white opacity-80 rcb-view-chat-icon relative "
          title={isMaximized ? "Minimize" : "Maximize"}
        >
          {isMaximized ? (
            <Minimize2 className="w-5 h-5" />
          ) : (
            <Maximize2 className="w-5 h-5" />
          )}
        </button>,
        Button.CLOSE_CHAT_BUTTON, // Predefined close button
      ],
    },
  };

  const flow = {
    start: {
      message:
        "Hi I'm Rio, Lance's AI Personal Assistant! Ask me anything about Lance's skills, projects, experience or bio. I'm grounded in his actual resume data! 🤖",
      path: "loop",
    },
    loop: {
      message: async (params) => {
        return `I received: "${params.userInput}". Soon, I will be connected to my LLM Grounded in Lance's actual resume data! 🤖`;
      },
      path: "loop",
    },
  };

  return (
    <TooltipProvider>
      <Router>
        <div className="flex bg-[#ECECEC] dark:bg-[#2e2e2e] flex-col lg:flex-row lg:h-screen overflow-hidden lg:gap-3 w-full">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/blog-selected/:slug" element={<BlogSelected />} />
            <Route
              path="/projects-selected/:slug"
              element={<ProjectSelected />}
            />
          </Routes>
        </div>
        <ChatBot
          className={`relative z-0 ${isMaximized ? "chatbot-maximized" : ""} `}
          settings={settings}
          styles={styles}
          flow={flow}
        />
      </Router>
    </TooltipProvider>
  );
}

export default App;
