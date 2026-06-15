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
    if (window.confirm("Are you sure you want to delete this timepiece?")) {
      await supabase.from('watches').delete().eq('id', id);
      fetchWatches(); // Refresh list
    }
  };

  useEffect(() => { fetchWatches(); }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen text-black">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Watch Inventory</h1>
        <button className="bg-black text-white px-6 py-2 rounded">Add New Watch</button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Watch</th>
              <th className="p-4">Brand</th>
              <th className="p-4">Price</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {watches.map(watch => (
              <tr key={watch.id} className="border-b hover:bg-gray-50">
                <td className="p-4 flex items-center gap-3">
                  <img src={watch.image_url} className="w-12 h-12 object-contain" />
                  {watch.name}
                </td>
                <td className="p-4">{watch.brand}</td>
                <td className="p-4">${watch.price}</td>
                <td className="p-4">
                  <button className="text-blue-600 mr-4 font-semibold">Edit</button>
                  <button onClick={() => handleDelete(watch.id)} className="text-red-600 font-semibold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}