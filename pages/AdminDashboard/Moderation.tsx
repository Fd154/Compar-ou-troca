import React from 'react';
import { Search, AlertTriangle, Check, X, Eye } from 'lucide-react';
import AdminSidebar from './Sidebar';

const Moderation: React.FC = () => {
  const reports = [
    { id: 1, type: 'Anúncio', target: 'iPhone 13 Pro Max', reason: 'Produto falsificado', reporter: 'Maria S.', date: 'Hoje, 10:00', status: 'Pendente' },
    { id: 2, type: 'Usuário', target: 'Pedro Santos', reason: 'Comportamento abusivo no chat', reporter: 'João V.', date: 'Ontem, 15:30', status: 'Pendente' },
    { id: 3, type: 'Anúncio', target: 'Nintendo Switch', reason: 'Preço suspeito', reporter: 'Ana L.', date: '12/03/2023', status: 'Em análise' },
    { id: 4, type: 'Anúncio', target: 'Serviços de Mágica', reason: 'Categoria incorreta', reporter: 'Sistema', date: '10/03/2023', status: 'Resolvido' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-neutral-900">
      <AdminSidebar />
      <div className="flex-1 lg:ml-64 overflow-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Moderação e Denúncias</h1>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Buscar denúncias..." 
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:border-primary"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 dark:text-neutral-500" size={18} />
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-700 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-neutral-900 text-gray-500 dark:text-neutral-400 text-sm">
              <tr>
                <th className="px-6 py-4 font-medium">Alvo</th>
                <th className="px-6 py-4 font-medium">Motivo</th>
                <th className="px-6 py-4 font-medium">Denunciante</th>
                <th className="px-6 py-4 font-medium">Data</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-neutral-700">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-800 dark:text-white">{report.target}</div>
                      <div className="text-xs text-gray-500 dark:text-neutral-400 flex items-center gap-1">
                        <span className={`inline-block w-2 h-2 rounded-full ${report.type === 'Anúncio' ? 'bg-blue-400' : 'bg-purple-400'}`}></span>
                        {report.type}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-700 dark:text-neutral-300">
                      <AlertTriangle size={14} className="text-orange-500" />
                      {report.reason}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-neutral-400">{report.reporter}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-neutral-400">{report.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      report.status === 'Resolvido' ? 'bg-gray-100 text-gray-600 dark:bg-neutral-700 dark:text-neutral-300' : 
                      report.status === 'Em análise' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' : 
                      'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-full text-gray-500 dark:text-neutral-400 hover:text-primary transition-colors" title="Ver Detalhes">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-full text-gray-500 dark:text-neutral-400 hover:text-green-600 transition-colors" title="Ignorar / Aprovar">
                        <Check size={18} />
                      </button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-full text-gray-500 dark:text-neutral-400 hover:text-red-600 transition-colors" title="Banir / Remover">
                        <X size={18} />
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

export default Moderation;