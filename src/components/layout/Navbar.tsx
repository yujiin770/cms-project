import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#050505]/95 backdrop-blur-md border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          {/* Replace with your logo later */}
          <span className="text-xl font-serif font-bold tracking-widest text-white">
            CHRONO'S ROYALE
          </span>
        </Link>
        
        <div className="hidden md:flex gap-8 items-center text-xs uppercase tracking-widest font-semibold">
          <Link to="/" className="text-white hover:text-blue-400 transition">Home</Link>
          <Link to="/watches" className="text-gray-400 hover:text-white transition">Watches</Link>
          <Link to="/admin/dashboard" className="text-gray-400 hover:text-white transition">Admin</Link>
          <Link to="/admin/login" className="bg-white text-black px-4 py-2 hover:bg-gray-200 transition">Login</Link>
        </div>
      </div>
    </nav>
  );
}