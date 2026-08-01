import ProjectSelectedContent from "@/components/projects/ProjectSelectedContent"
import ProjectSubContent from "@/components/projects/ProjectSubContent";
import { useParams, Navigate } from "react-router-dom";
import { projectsData } from "@/data";
import { useRef, useEffect } from "react";

function ProjectSelected(){
    const { slug } = useParams();
    const project = projectsData.find((b) => b.slug === slug);

     const scrollContainerRef = useRef(null);
       useEffect(() => {
             window.scrollTo(0, 0); 
             
             if (scrollContainerRef.current) {
                 scrollContainerRef.current.scrollTo(0, 0);
             }
         }, [slug]);

     if(!project) return <Navigate to="/projects" replace/>

     const sidebarProjects = projectsData.filter((p) => p.slug !== slug).slice(0,4);
    return(
        <div className="grid lg:grid-cols-[2.5fr_1fr] grid-cols-1 px-3 lg:px-0 gap-3 " ref={scrollContainerRef}>
            <div className="overflow-y-auto no-scrollbar lg:py-3 pt-3" key={slug}>
                <ProjectSelectedContent project={project}/>
            </div>
            <div className="overflow-y-auto no-scrollbar lg:py-3 lg:pt-3 lg:pr-3 pb-3 ">
                <ProjectSubContent className="w-full grid-col-1 gap-3 grid" projectList={sidebarProjects} showViewAll={true}/>
            </div>
            
        </div>
    )
}

export default ProjectSelected;