import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Watch } from '../../types/database';
import { Hero } from '../../components/public/Hero';

export default function Home() {
    const [newModels, setNewModels] = useState<Watch[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchNewModels() {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('watches')
                    .select('*')
                    .eq('is_new', true)
                    .order('created_at', { ascending: false });
                
                if (error) throw error;
                if (data) setNewModels(data);
            } catch (err) {
                console.error("Error fetching vault:", err); 
            } finally {
                setLoading(false);
            }
        }
        fetchNewModels();
    }, []);

    return (
        <div className="bg-chrono-black text-white min-h-screen selection:bg-chrono-gold selection:text-black">
            {/* 1. DYNAMIC HERO SECTION */}
            <Hero />

            {/* 2. WATCH SHOWCASE SECTION */}
            <section className="py-24 container mx-auto px-6">
                <div className="flex flex-col items-center mb-16 text-center">
                    <span className="text-chrono-gold text-xs font-bold uppercase tracking-[0.4em] mb-4">
                        Current Creations
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif text-white">
                        New 2025 Models
                    </h2>
                    <div className="w-24 h-px bg-chrono-gold/30 mt-8"></div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-chrono-gold"></div>
                    </div>
                ) : newModels.length === 0 ? (
                    <div className="text-center py-20 border border-white/5 bg-chrono-gray/30 rounded-2xl">
                        <p className="text-gray-500 font-serif italic text-lg">The vault is currently being replenished.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {newModels.map(watch => (
                            <div 
                                key={watch.id} 
                                className="group relative bg-chrono-gray/40 border border-white/5 p-8 rounded-2xl transition-all duration-500 hover:border-chrono-gold/30 hover:-translate-y-3"
                            >
                                {/* Watch Image with Glow Effect */}
                                <div className="relative mb-8 overflow-hidden rounded-xl bg-black/20 p-4">
                                    <div className="absolute inset-0 bg-chrono-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></div>
                                    <img 
                                        src={watch.image_url} 
                                        alt={watch.name} 
                                        className="h-72 w-full object-contain relative z-10 transition-transform duration-700 group-hover:scale-110 drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]" 
                                    />
                                </div>

                                {/* Content */}
                                <div className="text-center">
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-chrono-gold font-bold mb-2">
                                        {watch.brand}
                                    </p>
                                    <h3 className="text-2xl font-serif text-white mb-4 tracking-tight">
                                        {watch.name}
                                    </h3>
                                    <div className="flex items-center justify-center gap-4">
                                        <div className="h-px w-8 bg-white/10"></div>
                                        <p className="text-lg font-sans font-light tracking-widest text-white/90">
                                            {typeof watch.price === 'number' 
                                                ? `$${watch.price.toLocaleString()}` 
                                                : watch.price}
                                        </p>
                                        <div className="h-px w-8 bg-white/10"></div>
                                    </div>
                                    
                                    {/* Action Button */}
                                    <button className="mt-8 w-full py-3 border border-white/10 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 group-hover:border-chrono-gold group-hover:text-chrono-gold transition-all duration-300">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}