import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export const Hero = () => {
    // 1. ADD DEFAULT TEXT HERE so it's never empty
    const [content, setContent] = useState({
        title: 'A Legacy of Excellence',
        subtitle: 'Discover the heritage and values that define every timepiece we create.'
    });

    useEffect(() => {
        const fetchHero = async () => {
            const { data, error } = await supabase
                .from('hero_content')
                .select('*')
                .eq('id', 1)
                .single();
            
            if (error) {
                console.error("Hero Fetch Error:", error.message);
            } else if (data) {
                setContent(data);
            }
        };
        fetchHero();
    }, []);

    return (
        // Added bg-zinc-900 so if video fails, it's still visible
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-900">
            
            {/* Background Video */}
            <video 
                autoPlay muted loop playsInline 
                className="absolute z-0 w-auto min-w-full min-h-full max-w-none brightness-[0.3] object-cover"
            >
                <source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
            </video>

            {/* Content Container */}
            <div className="relative z-10 text-center px-6 max-w-5xl">
                <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="w-12 h-[1px] bg-chrono-gold/50"></div>
                    <h5 className="text-chrono-gold uppercase tracking-[0.5em] text-[10px] font-bold">
                        Established 2025
                    </h5>
                    <div className="w-12 h-[1px] bg-chrono-gold/50"></div>
                </div>
                
                <h1 className="text-6xl md:text-9xl font-serif text-white mb-8 leading-[0.9] tracking-tighter">
                    {content.title || "Loading Excellence..."}
                </h1>
                
                <p className="text-lg md:text-xl text-gray-300 font-light italic max-w-2xl mx-auto leading-relaxed opacity-80 mb-12">
                    {content.subtitle}
                </p>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <button className="min-w-[200px] px-8 py-4 bg-chrono-gold text-black hover:bg-white transition-all duration-500 uppercase tracking-[0.2em] text-[10px] font-bold">
                        The Collection
                    </button>
                </div>
            </div>

            {/* Bottom Gradient for smooth transition to watches */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-chrono-black to-transparent z-1"></div>
        </section>
    );
};