import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Eye, PlusCircle, Share2, Check, Store } from 'lucide-react';
import { PRODUCTS } from '../../mockData';

const MyAds: React.FC = () => {
  // Simulating user ads
  const myAds = PRODUCTS.slice(0, 3);
  const [copied, setCopied] = useState(false);
  const sellerSlug = "Loja do João"; // Mock slug

  const handleCopyLink = () => {
    const storeLink = `${window.location.origin}/#/seller/${encodeURIComponent(sellerSlug)}`;
    navigator.clipboard.writeText(storeLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
           <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Meus Anúncios</h1>
           <p className="text-neutral-500 dark:text-neutral-400 mt-1">Gerencie suas vendas e produtos ativos</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={handleCopyLink}
            className="bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:border-primary hover:text-primary px-4 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-sm"
          >
            {copied ? <Check size={20} className="text-green-500" /> : <Share2 size={20} />}
            {copied ? 'Link Copiado!' : 'Compartilhar Loja'}
          </button>

          <Link 
            to={`/seller/${encodeURIComponent(sellerSlug)}`}
            className="bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:border-primary hover:text-primary px-4 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-sm"
          >
            <Store size={20} /> Ver Minha Loja
          </Link>

          <Link 
            to="/publish" 
            className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
          >
            <PlusCircle size={20} /> Criar classificado
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-card border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        {/* Desktop Header */}
        <div className="hidden md:grid grid-cols-12 gap-6 p-5 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 text-sm font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
          <div className="col-span-5">Detalhes do Anúncio</div>
          <div className="col-span-2 text-right">Preço</div>
          <div className="col-span-3 text-center">Status</div>
          <div className="col-span-2 text-center">Ações</div>
        </div>

        {/* Ads List */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-700">
          {myAds.map((ad) => (
            <div key={ad.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 p-5 items-center hover:bg-neutral-50/50 dark:hover:bg-neutral-700/30 transition-colors group">
              <div className="col-span-5 flex gap-5">
                <img src={ad.image} alt={ad.title} className="w-24 h-24 object-cover rounded-lg bg-neutral-100 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600" />
                <div className="flex flex-col justify-center">
                  <h3 className="font-bold text-neutral-900 dark:text-white text-lg line-clamp-1 group-hover:text-primary transition-colors">{ad.title}</h3>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 flex items-center gap-1.5">
                    <Eye size={16} /> 45 visualizações
                  </div>
                  <div className="text-xs text-neutral-400 mt-1 font-mono">
                    REF: {1000 + ad.id}
                  </div>
                </div>
              </div>
              
              <div className="col-span-6 md:col-span-2 md:text-right font-bold text-neutral-900 dark:text-white text-lg">
                <span className="md:hidden text-neutral-500 font-normal mr-2 text-sm">Preço:</span>
                R$ {ad.price.toLocaleString('pt-BR')}
              </div>
              
              <div className="col-span-6 md:col-span-3 md:text-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-secondary-light dark:bg-secondary/10 text-secondary border border-secondary/20">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-1.5"></span>
                  Ativo
                </span>
              </div>
              
              <div className="col-span-6 md:col-span-2 flex justify-end md:justify-center gap-3">
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-600 text-neutral-500 dark:text-neutral-400 hover:border-primary hover:text-primary hover:bg-white dark:hover:bg-neutral-700 transition-all shadow-sm" title="Editar">
                  <Edit2 size={18} />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-600 text-neutral-500 dark:text-neutral-400 hover:border-danger hover:text-danger hover:bg-white dark:hover:bg-neutral-700 transition-all shadow-sm" title="Excluir">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAds;