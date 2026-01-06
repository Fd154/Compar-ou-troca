import React from 'react';
import { MoreVertical, Search, Shield, Trash2, Ban } from 'lucide-react';
import AdminSidebar from './Sidebar';

const UsersList: React.FC = () => {
  // Mock users
  const users = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    name: `Usuário ${i + 1}`,
    email: `usuario${i + 1}@email.com`,
    role: i === 0 ? 'Admin' : 'User',
    status: i % 3 === 0 ? 'Inativo' : 'Ativo',
    joinDate: '12/03/2023',
    adsCount: i * 2 + 1
  }));

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-neutral-900">
      <AdminSidebar />
      <div className="flex-1 lg:ml-64 overflow-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Gerenciar Usuários</h1>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Buscar usuários..." 
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:border-primary"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 dark:text-neutral-500" size={18} />
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-700 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-neutral-900 text-gray-500 dark:text-neutral-400 text-sm">
              <tr>
                <th className="px-6 py-4 font-medium">Nome / Email</th>
                <th className="px-6 py-4 font-medium">Função</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Anúncios</th>
                <th className="px-6 py-4 font-medium">Data Cadastro</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-neutral-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-neutral-700 flex items-center justify-center text-gray-500 dark:text-neutral-400 font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 dark:text-white">{user.name}</div>
                        <div className="text-sm text-gray-500 dark:text-neutral-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'Admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300' : 'bg-gray-100 text-gray-800 dark:bg-neutral-700 dark:text-neutral-300'}`}>
                      {user.role === 'Admin' && <Shield size={12} />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'Ativo' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-neutral-400">{user.adsCount}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-neutral-400">{user.joinDate}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-full text-gray-500 dark:text-neutral-400 hover:text-red-500 transition-colors" title="Banir">
                        <Ban size={18} />
                      </button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-full text-gray-500 dark:text-neutral-400 hover:text-gray-800 dark:hover:text-white transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>
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

export default UsersList;