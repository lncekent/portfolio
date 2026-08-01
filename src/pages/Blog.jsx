import BlogContent from "@/components/blog/BlogContent";
import BlogSubContent from "@/components/blog/BlogSubContent";

function Blog(){
    return(
        <div className="grid lg:grid-cols-[2fr_1fr] grid-cols-1 w-full pb-3 lg:pb-0 lg:gap-3 px-3 lg:px-0">
            <BlogContent/>
            <BlogSubContent/>
        </div>

        
    )
}

export default Blog;