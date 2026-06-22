import ManageWatches from './ManageWatches';
import AddWatchForm from '../../components/admin/AddWatchForm';
import { useState } from 'react';

export default function Dashboard() {
  const [view, setView] = useState<'list' | 'add'>('list');

  return (
    <div className="min-h-screen bg-gray-50 text-black pt-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-serif font-bold">CMS Dashboard</h1>
          <div className="flex gap-4">
            <button 
              onClick={() => setView('list')}
              className={`px-6 py-2 rounded ${view === 'list' ? 'bg-chrono-blue text-white' : 'bg-gray-200'}`}
            >
              View Inventory
            </button>
            <button 
              onClick={() => setView('add')}
              className={`px-6 py-2 rounded ${view === 'add' ? 'bg-chrono-blue text-white' : 'bg-gray-200'}`}
            >
              + Add Timepiece
            </button>
          </div>
        </div>

        {view === 'list' ? <ManageWatches /> : <AddWatchForm />}
      </div>
    </div>
  );
}