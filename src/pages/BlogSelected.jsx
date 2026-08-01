import BlogSubContent from "@/components/blog/BlogSubContent";
import BlogSelectedContent from "@/components/blog/BlogSelectedContent";

function BlogSelected(){
    return(
        <div className="w-full grid lg:grid-cols-[2fr_1fr] grid-cols-1 lg:px-0 px-3 lg:gap-3 gap-0 lg:pb-0 pb-3">
            <BlogSelectedContent/>
            <BlogSubContent/>
        </div>
    )
}

export default BlogSelected;