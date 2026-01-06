import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, ShoppingBag, ShieldAlert, LogOut } from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 bg-neutral-900 text-white hidden lg:flex flex-col h-screen fixed left-0 top-0 border-r border-neutral-800">
      <div className="p-6 border-b border-neutral-800 flex items-center gap-3">
        <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-xl">M</span>
        </div>
        <div>
          <span className="font-bold text-lg block leading-none">Marketplace</span>
          <span className="text-xs text-neutral-500">Admin Panel</span>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <div 
          onClick={() => navigate('/admin')}
          className={`p-3 rounded-lg cursor-pointer flex items-center gap-3 transition-colors ${isActive('/admin') ? 'bg-primary text-white shadow-md' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}
        >
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </div>
        <div 
          onClick={() => navigate('/admin/users')}
          className={`p-3 rounded-lg cursor-pointer flex items-center gap-3 transition-colors ${isActive('/admin/users') ? 'bg-primary text-white shadow-md' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}
        >
          <Users size={20} />
          <span className="font-medium">Usuários</span>
        </div>
        <div 
          onClick={() => navigate('/admin/ads')}
          className={`p-3 rounded-lg cursor-pointer flex items-center gap-3 transition-colors ${isActive('/admin/ads') ? 'bg-primary text-white shadow-md' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}
        >
          <ShoppingBag size={20} />
          <span className="font-medium">Anúncios</span>
        </div>
        <div 
          onClick={() => navigate('/admin/moderation')}
          className={`p-3 rounded-lg cursor-pointer flex items-center gap-3 transition-colors ${isActive('/admin/moderation') ? 'bg-primary text-white shadow-md' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}
        >
          <ShieldAlert size={20} />
          <span className="font-medium">Moderação</span>
        </div>
      </nav>
      <div className="p-4 border-t border-neutral-800">
        <button 
          onClick={() => navigate('/')}
          className="w-full p-3 rounded-lg flex items-center gap-3 text-neutral-400 hover:bg-red-900/20 hover:text-red-400 transition-colors font-medium"
        >
          <LogOut size={20} />
          Sair do Admin
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;