import { Link, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Watch, LogOut, Home } from 'lucide-react'; // npm install lucide-react
import { supabase } from '../../lib/supabase';

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-chrono-black text-white flex flex-col border-r border-white/10">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-serif font-bold tracking-widest text-chrono-gold">CHRONO CMS</h2>
        </div>

        <nav className="flex-1 p-4 space-y-2 text-sm uppercase tracking-widest">
          <Link to="/admin/dashboard" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg transition">
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg transition">
            <Home size={18} /> View Site
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 text-red-400 hover:bg-red-500/10 rounded-lg transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}