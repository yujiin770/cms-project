import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function SiteSettingsForm() {
  const [hero, setHero] = useState({ title: '', subtitle: '' });
  const [siteName, setSiteName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load current values
    supabase.from('hero_content').select('*').single().then(({ data }) => data && setHero(data));
    supabase.from('site_settings').select('value').eq('key', 'site_name').single().then(({ data }) => data && setSiteName(data.value));
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    await supabase.from('hero_content').update(hero).eq('id', 1);
    await supabase.from('site_settings').update({ value: siteName }).eq('key', 'site_name');
    
    setLoading(false);
    alert("Public site updated successfully!");
  };

  return (
    <form onSubmit={handleUpdate} className="max-w-4xl space-y-8">
      {/* Navbar Card */}
      <div className="bg-chrono-gray p-8 rounded-2xl border border-white/5">
        <h3 className="text-chrono-gold font-bold uppercase text-xs tracking-widest mb-6">Identity</h3>
        <label className="block text-sm text-gray-400 mb-2">Navbar Brand Name</label>
        <input 
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
          className="w-full bg-black border border-white/10 p-4 rounded-xl text-white font-serif text-xl"
        />
      </div>

      {/* Hero Content Card */}
      <div className="bg-chrono-gray p-8 rounded-2xl border border-white/5">
        <h3 className="text-chrono-gold font-bold uppercase text-xs tracking-widest mb-6">Hero Section</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Main Headline</label>
            <input 
              value={hero.title}
              onChange={(e) => setHero({...hero, title: e.target.value})}
              className="w-full bg-black border border-white/10 p-4 rounded-xl text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Sub-headline / Description</label>
            <textarea 
              value={hero.subtitle}
              rows={3}
              onChange={(e) => setHero({...hero, subtitle: e.target.value})}
              className="w-full bg-black border border-white/10 p-4 rounded-xl text-white"
            />
          </div>
        </div>
      </div>

      <button 
        disabled={loading}
        className="px-10 py-4 bg-chrono-gold text-black font-bold uppercase tracking-widest rounded-full hover:scale-105 transition"
      >
        {loading ? 'Publishing...' : 'Save & Publish Changes'}
      </button>
    </form>
  );
}