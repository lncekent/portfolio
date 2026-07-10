import { useState, useEffect } from 'react'
import Sidebar  from './components/Sidebar'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Achievements from './pages/Achievements'
import Blog from './pages/Blog'
import Resume from './pages/Resume'
import BlogSelected from './pages/BlogSelected';
import ProjectSelected from './pages/ProjectSelected';
import NotFound from './pages/NotFound';
import OfflineNotice from './components/OfflineNotice';
import Preloader from './components/Preloader';
import { TooltipProvider } from './components/ui/tooltip';
function App() { 

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return()=>{
          window.removeEventListener('online', handleOnline);
          window.removeEventListener('offline', handleOffline);
      };
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

  return (
    <TooltipProvider>
      <Router>
        
        <div className='flex bg-[#ECECEC] dark:bg-[#2e2e2e] flex-col lg:flex-row lg:h-screen overflow-hidden lg:gap-3 w-full'>
        <Sidebar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/projects" element={<Projects/>} />
          <Route path="/achievements" element={<Achievements/>} />
          <Route path="/blog" element={<Blog/>} />
          <Route path="/resume" element={<Resume/>} />
          <Route path="/blog-selected/:slug" element={<BlogSelected/>} />
          <Route path="/projects-selected/:slug" element={<ProjectSelected/>} />
          <Route path='*' element={<NotFound />}/>
        </Routes>
        </div>
      </Router>
    </TooltipProvider>
  
  );
}

export default App
