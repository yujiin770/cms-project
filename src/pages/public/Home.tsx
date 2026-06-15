import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Watch } from '../../types/database';
import { Hero } from '../../components/public/Hero';

export default function Home() {
    const [newModels, setNewModels] = useState<Watch[]>([]);

    useEffect(() => {
        async function fetchNewModels() {
            const { data } = await supabase
                .from('watches')
                .select('*')
                .eq('is_new', true);
            if (data) setNewModels(data);
        }
        fetchNewModels();
    }, []);

    return (
        <div className="bg-chrono-black text-white min-h-screen">
            <Hero />
            <section className="py-20 container mx-auto px-4">
                <h2 className="text-4xl font-serif text-center mb-12">New 2025 Models</h2>

                {/* If no watches are found, show a message */}
                {newModels.length === 0 ? (
                    <p className="text-center text-gray-500 italic">No new models found in the vault.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {newModels.map(watch => (
                            <div key={watch.id} className="bg-[#1a1a1a] border border-white/5 p-6 rounded-lg transition-transform hover:-translate-y-2">
                                <img src={watch.image_url} alt={watch.name} className="h-64 mx-auto object-contain mb-4" />
                                <h3 className="text-2xl font-serif">{watch.name}</h3>
                                <p className="text-gray-400">{watch.brand}</p>
                                <p className="text-chrono-gold mt-4">${watch.price}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}