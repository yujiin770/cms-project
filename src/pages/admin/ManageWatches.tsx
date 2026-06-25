import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Watch } from '../../types/database';

export default function ManageWatches() {
  const [watches, setWatches] = useState<Watch[]>([]);

  const fetchWatches = async () => {
    const { data } = await supabase.from('watches').select('*').order('created_at', { ascending: false });
    if (data) setWatches(data);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure? This cannot be undone.")) {
      const { error } = await supabase.from('watches').delete().eq('id', id);
      if (error) alert("Error deleting");
      else fetchWatches();
    }
  };

  useEffect(() => { fetchWatches(); }, []);

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
          <tr>
            <th className="p-4">Timepiece</th>
            <th className="p-4">Brand</th>
            <th className="p-4">Price</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {watches.length === 0 ? (
            <tr><td colSpan={4} className="p-10 text-center text-gray-400">Inventory is empty. Add your first watch.</td></tr>
          ) : (
            watches.map(watch => (
              <tr key={watch.id} className="hover:bg-gray-50 transition">
                <td className="p-4 flex items-center gap-4">
                  <img src={watch.image_url} className="w-12 h-12 object-contain bg-gray-50 rounded" alt="" />
                  <span className="font-semibold">{watch.name}</span>
                </td>
                <td className="p-4 text-gray-600">{watch.brand}</td>
                <td className="p-4 font-mono">${Number(watch.price).toLocaleString()}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(watch.id)} className="text-red-500 hover:text-red-700 font-medium text-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}