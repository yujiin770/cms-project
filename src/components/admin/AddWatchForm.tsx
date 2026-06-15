import { useState } from 'react';
import { uploadImage } from '../../lib/storage'; // Import the helper
import { supabase } from '../../lib/supabase';

export default function AddWatchForm() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select an image");

    try {
      setUploading(true);

      // 1. Upload the image first to get the URL
      const publicUrl = await uploadImage(file);

      // 2. Save the rest of the data + the image URL to the database
      const { error } = await supabase.from('watches').insert({
        name: name,
        image_url: publicUrl, // Using the URL we just got
        brand: 'Rolex', 
        price: 12000,
        // ... rest of your fields
      });

      if (error) throw error;
      alert("Watch added successfully!");
      
    } catch (err) {
      console.error(err);
      alert("Error uploading watch");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded text-black">
      <div>
        <label className="block text-sm font-bold">Watch Name</label>
        <input 
          type="text" 
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded" 
        />
      </div>

      <div>
        <label className="block text-sm font-bold">Watch Image</label>
        <input 
          type="file" 
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full" 
        />
      </div>

      <button 
        disabled={uploading}
        className="bg-chrono-blue text-white px-4 py-2 rounded"
      >
        {uploading ? 'Uploading...' : 'Save Timepiece'}
      </button>
    </form>
  );
}