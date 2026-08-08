import BlogContent from "@/components/blog/BlogContent";
import BlogSubContent from "@/components/blog/BlogSubContent";

function Blog(){
    return(
        <div className="grid lg:grid-cols-[2fr_1fr] grid-cols-1 w-full pb-[clamp(12px,0.85vw,3rem)] lg:pb-0 lg:gap-[clamp(12px,0.85vw,3rem)] px-3 lg:px-0">
            <BlogContent/>
            <BlogSubContent/>
        </div>

        
    )
}

export default Blog;