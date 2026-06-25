import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function Navbar() {
    const [siteName, setSiteName] = useState("CHRONO'S ROYALE");
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Change background on scroll
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fetch Site Identity
    useEffect(() => {
        supabase.from('site_settings').select('value').eq('key', 'site_name').single()
            .then(({ data }) => data && setSiteName(data.value));
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-700 px-8 py-5 ${
            scrolled ? 'bg-chrono-black/95 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent'
        }`}>
            <div className="max-w-[1800px] mx-auto flex justify-between items-center">
                
                {/* Brand */}
                <Link to="/" className="group flex flex-col">
                    <span className="text-xl md:text-2xl font-serif font-bold tracking-[0.1em] text-white uppercase group-hover:text-chrono-gold transition-colors">
                        {siteName}
                    </span>
                    <span className="text-[8px] uppercase tracking-[0.6em] text-chrono-gold font-bold -mt-1 ml-1 opacity-70">
                        Official Vault
                    </span>
                </Link>
                
                {/* Links */}
                <div className="hidden md:flex gap-12 items-center text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">
                    <Link to="/" className="text-white border-b border-chrono-gold pb-1">Home</Link>
                    <Link to="/watches" className="hover:text-white transition">Watches</Link>
                    <Link to="/boutiques" className="hover:text-white transition">Boutiques</Link>
                    <Link to="/admin/login" className="px-6 py-2 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 rounded-sm">
                        Admin
                    </Link>
                </div>

                {/* Mobile Menu Placeholder */}
                <button className="md:hidden text-white">
                    <div className="w-6 h-[1px] bg-white mb-2"></div>
                    <div className="w-6 h-[1px] bg-white"></div>
                </button>
            </div>
        </nav>
    );
}