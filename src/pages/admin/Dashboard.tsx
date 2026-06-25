import { useState } from 'react';
import ManageWatches from './ManageWatches';
import AddWatchForm from '../../components/admin/AddWatchForm';
import SiteSettingsForm from '../../components/admin/SiteSettingsForm';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'inventory' | 'hero' | 'add'>('inventory');

  return (
    <div className="space-y-8">
      {/* Dynamic Header */}
      <header className="flex justify-between items-end border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white uppercase tracking-tighter">
            {activeTab === 'inventory' ? 'Vault Inventory' : 
             activeTab === 'hero' ? 'Appearance Settings' : 'Add New Timepiece'}
          </h1>
          <p className="text-gray-700-500 text-sm mt-1 italic">Managing the digital flagship store.</p>
        </div>

        <div className="flex bg-chrono-gray p-1 rounded-lg border border-white/5">
           <button 
             onClick={() => setActiveTab('inventory')}
             className={`px-4 py-2 text-xs font-bold rounded-md transition ${activeTab === 'inventory' ? 'bg-chrono-gold text-black' : 'text-gray-400'}`}
           >
             LISTING
           </button>
           <button 
             onClick={() => setActiveTab('hero')}
             className={`px-4 py-2 text-xs font-bold rounded-md transition ${activeTab === 'hero' ? 'bg-chrono-gold text-black' : 'text-gray-400'}`}
           >
             SITE CONTENT
           </button>
           <button 
             onClick={() => setActiveTab('add')}
             className={`px-4 py-2 text-xs font-bold rounded-md transition ${activeTab === 'add' ? 'bg-chrono-gold text-black' : 'text-gray-400'}`}
           >
             + NEW
           </button>
        </div>
      </header>

      {/* Dynamic Body */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === 'inventory' && <ManageWatches />}
        {activeTab === 'add' && <AddWatchForm />}
        {activeTab === 'hero' && <SiteSettingsForm />}
      </div>
    </div>
  );
}