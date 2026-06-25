import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Watch, 
  LogOut, 
  Home, 
  Settings, 
  UserCircle,
  PlusCircle
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Inventory', path: '/admin/inventory', icon: <Watch size={20} /> }, // Placeholder for future page
    { name: 'Add Watch', path: '/admin/add', icon: <PlusCircle size={20} /> }, // Placeholder
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white">
      {/* SIDEBAR */}
      <aside className="w-72 bg-chrono-black border-r border-chrono-gold/20 flex flex-col relative z-10 shadow-[5px_0_30px_rgba(0,0,0,0.5)]">
        
        {/* Logo Section */}
        <div className="p-8">
          <div className="flex flex-col">
            <span className="text-chrono-gold text-xs tracking-[0.3em] font-bold uppercase mb-1">Vault Access</span>
            <h2 className="text-2xl font-serif font-bold tracking-tight text-white border-b border-chrono-gold/30 pb-4">
              CHRONO<span className="text-chrono-gold">'</span>S
            </h2>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          <p className="px-4 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-4">Management</p>
          
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 group
                ${isActive 
                  ? 'bg-chrono-gold/10 text-chrono-gold border-l-2 border-chrono-gold' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'}
              `}
            >
              <span className="transition-transform group-hover:scale-110">{item.icon}</span>
              <span className="text-sm font-medium tracking-wide">{item.name}</span>
            </NavLink>
          ))}

          <div className="pt-8">
            <p className="px-4 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-4">External</p>
            <Link 
              to="/" 
              className="flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              <Home size={20} />
              <span className="text-sm font-medium tracking-wide">Public Site</span>
            </Link>
          </div>
        </nav>

        {/* Profile & Logout Section */}
        <div className="p-6 bg-chrono-gray/50 border-t border-white/5">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-10 h-10 rounded-full bg-chrono-gold/20 flex items-center justify-center text-chrono-gold border border-chrono-gold/30">
              <UserCircle size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white">Administrator</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-tighter">Master of Time</span>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-transparent border border-red-900/50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-300 text-xs font-bold uppercase tracking-widest"
          >
            <LogOut size={14} /> Secure Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto bg-[#0a0a0a] relative">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-chrono-gold/5 blur-[150px] -z-10 rounded-full"></div>
        
        <div className="p-10 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

// Minimal Link component for the "External" section
function Link({ to, children, className }: { to: string, children: React.ReactNode, className?: string }) {
  return <NavLink to={to} className={className}>{children}</NavLink>;
}