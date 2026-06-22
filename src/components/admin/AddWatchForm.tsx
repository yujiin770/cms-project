import { useState } from 'react';
import { uploadImage } from '../../lib/storage';
import { supabase } from '../../lib/supabase';

export default function AddWatchForm() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('Rolex');
  const [price, setPrice] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select an image");

    try {
      setUploading(true);
      const publicUrl = await uploadImage(file);

      const { error } = await supabase.from('watches').insert({
        name,
        brand,
        price: parseFloat(price),
        image_url: publicUrl,
        is_new: true, // Defaulting to new for your Home.tsx query
        category: brand.toLowerCase(),
        material: 'Oystersteel',
        description: 'Luxury timepiece'
      });

      if (error) throw error;
      alert("Watch added successfully!");
      location.reload(); // Simple refresh to show new list
    } catch (err: any) {
      alert(err.message || "Error uploading watch");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold mb-6">Register New Watch</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Watch Name</label>
            <input type="text" required className="w-full border p-3 rounded-lg" onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Brand</label>
            <select className="w-full border p-3 rounded-lg" onChange={(e) => setBrand(e.target.value)}>
              <option>Rolex</option>
              <option>Patek Philippe</option>
              <option>Audemars Piguet</option>
              <option>Cartier</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Price (USD)</label>
          <input type="number" required className="w-full border p-3 rounded-lg" onChange={(e) => setPrice(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Watch Image</label>
          <input type="file" accept="image/*" className="w-full border p-3 rounded-lg" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </div>

        <button 
          disabled={uploading}
          className="w-full bg-chrono-blue text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-800 disabled:bg-gray-400 transition"
        >
          {uploading ? 'Processing Image...' : 'Publish to Catalog'}
        </button>
      </form>
    </div>
  );
}