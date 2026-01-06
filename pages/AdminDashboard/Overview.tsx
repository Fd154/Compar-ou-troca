import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line 
} from 'recharts';
import { Users, ShoppingBag, DollarSign, AlertCircle } from 'lucide-react';
import AdminSidebar from './Sidebar';

const data = [
  { name: 'Jan', vendas: 4000, usuarios: 2400 },
  { name: 'Fev', vendas: 3000, usuarios: 1398 },
  { name: 'Mar', vendas: 2000, usuarios: 9800 },
  { name: 'Abr', vendas: 2780, usuarios: 3908 },
  { name: 'Mai', vendas: 1890, usuarios: 4800 },
  { name: 'Jun', vendas: 2390, usuarios: 3800 },
  { name: 'Jul', vendas: 3490, usuarios: 4300 },
];

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => (
  <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-card border border-neutral-100 dark:border-neutral-700 flex items-center justify-between hover:shadow-card-hover transition-shadow">
    <div>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-neutral-900 dark:text-white">{value}</h3>
    </div>
    <div className={`p-4 rounded-lg ${color} text-white shadow-sm`}>
      {icon}
    </div>
  </div>
);

const AdminOverview: React.FC = () => {
  return (
    <div className="flex h-screen bg-neutral-100 dark:bg-neutral-900">
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 overflow-auto p-10">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8">Visão Geral</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard 
            title="Total de Usuários" 
            value="15,432" 
            icon={<Users size={24} />} 
            color="bg-primary" 
          />
          <StatCard 
            title="Anúncios Ativos" 
            value="8,540" 
            icon={<ShoppingBag size={24} />} 
            color="bg-purple-600" 
          />
          <StatCard 
            title="Volume Transacionado" 
            value="R$ 4.2M" 
            icon={<DollarSign size={24} />} 
            color="bg-secondary" 
          />
          <StatCard 
            title="Denúncias" 
            value="42" 
            icon={<AlertCircle size={24} />} 
            color="bg-danger" 
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Sales Chart */}
          <div className="bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-card border border-neutral-100 dark:border-neutral-700">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">Volume de Vendas (Últimos 7 meses)</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" tick={{fill: '#9CA3AF'}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fill: '#9CA3AF'}} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', color: '#333' }} 
                  />
                  <Legend />
                  <Bar dataKey="vendas" fill="#2563EB" radius={[4, 4, 0, 0]} name="Vendas (Un)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Users Chart */}
          <div className="bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-card border border-neutral-100 dark:border-neutral-700">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">Novos Usuários</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" tick={{fill: '#9CA3AF'}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fill: '#9CA3AF'}} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="usuarios" stroke="#10B981" strokeWidth={3} dot={{r: 4}} name="Usuários" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-card border border-neutral-100 dark:border-neutral-700 overflow-hidden">
          <div className="p-6 border-b border-neutral-100 dark:border-neutral-700">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Atividades Recentes</h3>
          </div>
          <table className="w-full">
            <thead className="bg-neutral-50 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 text-sm font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left">Usuário</th>
                <th className="px-6 py-4 text-left">Ação</th>
                <th className="px-6 py-4 text-left">Data</th>
                <th className="px-6 py-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700">
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                  <td className="px-6 py-4 text-neutral-900 dark:text-white font-medium">Usuário #{1000 + item}</td>
                  <td className="px-6 py-4 text-neutral-600 dark:text-neutral-300">Publicou um novo anúncio</td>
                  <td className="px-6 py-4 text-neutral-500 dark:text-neutral-400">Há {item * 5} minutos</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-secondary-light dark:bg-secondary/20 text-secondary border border-secondary/20 dark:border-0">
                      Sucesso
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;