import { useState } from 'react';
import { supabase } from './lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-chrono-black px-4">
      <form onSubmit={handleLogin} className="bg-chrono-gray p-8 rounded-lg border border-white/10 w-full max-w-md">
        <h1 className="text-3xl font-serif mb-6 text-center">Admin Portal</h1>
        <div className="space-y-4">
          <input 
            type="email" placeholder="Email" 
            className="w-full p-3 rounded bg-black border border-white/10 text-white focus:border-chrono-gold outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" placeholder="Password" 
            className="w-full p-3 rounded bg-black border border-white/10 text-white focus:border-chrono-gold outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full py-3 bg-chrono-blue hover:bg-blue-700 transition rounded font-bold uppercase tracking-widest text-sm">
            Access Vault
          </button>
        </div>
      </form>
    </div>
  );
}