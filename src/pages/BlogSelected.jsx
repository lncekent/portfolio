import BlogSubContent from "@/components/blog/BlogSubContent";
import BlogSelectedContent from "@/components/blog/BlogSelectedContent";

function BlogSelected(){
    return(
        <div className="w-full grid lg:grid-cols-[2fr_1fr] grid-cols-1 lg:px-0 px-3 lg:gap-[clamp(12px,0.85vw,3rem)] gap-0 lg:pb-0 pb-[clamp(12px,0.85vw,3rem)]">
            <BlogSelectedContent/>
            <BlogSubContent/>
        </div>
    )
}

export default BlogSelected;