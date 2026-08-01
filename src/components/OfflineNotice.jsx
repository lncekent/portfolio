

function OfflineNotice(){
    
    return(

       <div className="min-h-screen w-full select-none bg-white dark:bg-zinc-950 flex flex-col items-center justify-center animate-in fade-in duration-300">
            
            {/* Aesthetic WiFi Off Icon (Using standard SVG) */}
            <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full mb-6">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600 dark:text-red-500">
                    <line x1="2" y1="2" x2="22" y2="22"></line>
                    <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
                    <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
                    <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
                    <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>
                    <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                    <line x1="12" y1="20" x2="12.01" y2="20"></line>
                </svg>
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-2">You are offline</h2>
            <p className="text-muted-foreground text-center max-w-md px-6">
                It seems you've lost your internet connection. Please check your network to view my full portfolio data.
            </p>
            
            {/* Isang pulsing dot para kunwari naghahanap ng signal */}
            <div className="mt-8 flex gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse delay-75"></div>
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse delay-150"></div>
            </div>
        </div>
    );
}

export default OfflineNotice;