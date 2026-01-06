import React from 'react';
import { Search, ExternalLink, CheckCircle, XCircle } from 'lucide-react';
import AdminSidebar from './Sidebar';
import { PRODUCTS } from '../../mockData';

const AdsList: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-neutral-900">
      <AdminSidebar />
      <div className="flex-1 lg:ml-64 overflow-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Gerenciar Anúncios</h1>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Buscar por título, ID..." 
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:border-primary"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 dark:text-neutral-500" size={18} />
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-700 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-neutral-900 text-gray-500 dark:text-neutral-400 text-sm">
              <tr>
                <th className="px-6 py-4 font-medium">Produto</th>
                <th className="px-6 py-4 font-medium">Categoria</th>
                <th className="px-6 py-4 font-medium">Preço</th>
                <th className="px-6 py-4 font-medium">Vendedor</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-neutral-700">
              {PRODUCTS.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.title} className="w-12 h-12 rounded object-cover bg-gray-200 dark:bg-neutral-700" />
                      <div className="max-w-xs">
                        <div className="font-medium text-gray-800 dark:text-white truncate">{product.title}</div>
                        <div className="text-xs text-gray-500 dark:text-neutral-400">ID: {1000 + product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-neutral-400">{product.category}</td>
                  <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">R$ {product.price.toLocaleString('pt-BR')}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-neutral-400">{product.seller}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300">
                      Publicado
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-full text-gray-400 hover:text-primary transition-colors" title="Ver Detalhes">
                        <ExternalLink size={18} />
                      </button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-full text-gray-400 hover:text-green-600 transition-colors" title="Aprovar">
                        <CheckCircle size={18} />
                      </button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-full text-gray-400 hover:text-red-500 transition-colors" title="Rejeitar">
                        <XCircle size={18} />
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

export default AdsList;