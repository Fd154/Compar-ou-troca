import React from 'react';
import { Wallet, CreditCard, TrendingUp, History, Zap, Check } from 'lucide-react';

const UserWallet: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8">Minha Carteira</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-primary to-primary-hover rounded-2xl shadow-lg p-8 text-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-white/20 rounded-lg">
              <Wallet size={24} />
            </div>
            <div>
              <p className="text-white/80 text-sm font-medium">Saldo Disponível</p>
              <h2 className="text-3xl font-bold">R$ 1.250,00</h2>
            </div>
          </div>
          <div className="flex gap-3">
             <button className="flex-1 bg-white text-primary font-bold py-3 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
               Sacar
             </button>
             <button className="flex-1 bg-primary-light/20 text-white border border-white/30 font-bold py-3 rounded-lg hover:bg-white/10 transition-colors">
               Adicionar
             </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-card border border-neutral-200 dark:border-neutral-700 p-6 flex items-center gap-4">
            <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm">Vendas este mês</p>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">R$ 450,00</h3>
              <p className="text-xs text-green-500 font-medium flex items-center gap-1">
                +12% vs mês anterior
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-card border border-neutral-200 dark:border-neutral-700 p-6 flex items-center gap-4">
            <div className="p-4 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full">
              <Zap size={24} />
            </div>
            <div>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm">Plano Atual</p>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">Básico</h3>
              <button className="text-xs text-primary font-bold hover:underline">
                Fazer upgrade
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Transaction History */}
        <div className="lg:col-span-2 bg-white dark:bg-neutral-800 rounded-2xl shadow-card border border-neutral-200 dark:border-neutral-700 overflow-hidden">
          <div className="p-6 border-b border-neutral-100 dark:border-neutral-700 flex justify-between items-center">
             <h3 className="font-bold text-neutral-900 dark:text-white flex items-center gap-2">
               <History size={20} className="text-neutral-400" /> Histórico de Transações
             </h3>
             <button className="text-sm text-primary font-medium hover:underline">Ver tudo</button>
          </div>
          <div className="divide-y divide-neutral-100 dark:divide-neutral-700">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-5 flex justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${i % 2 === 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    {i % 2 === 0 ? <CreditCard size={18} /> : <Wallet size={18} />}
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-white">{i % 2 === 0 ? 'Destaque Anúncio - iPhone' : 'Venda Concluída'}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">12 Mar 2023, 14:30</p>
                  </div>
                </div>
                <span className={`font-bold ${i % 2 === 0 ? 'text-neutral-900 dark:text-white' : 'text-green-600'}`}>
                  {i % 2 === 0 ? '-' : '+'} R$ {i * 50},00
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-card border border-neutral-200 dark:border-neutral-700 p-6">
           <div className="text-center mb-6">
             <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-3">
               <Zap size={24} fill="currentColor" />
             </div>
             <h3 className="font-bold text-xl text-neutral-900 dark:text-white">Turbine suas vendas</h3>
             <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Assine o plano PRO e venda 3x mais rápido.</p>
           </div>
           
           <div className="space-y-4 mb-8">
             <div className="flex items-center gap-3 text-sm text-neutral-700 dark:text-neutral-300">
               <Check size={16} className="text-green-500" />
               <span>Destaque na página inicial</span>
             </div>
             <div className="flex items-center gap-3 text-sm text-neutral-700 dark:text-neutral-300">
               <Check size={16} className="text-green-500" />
               <span>Topo das buscas por 7 dias</span>
             </div>
             <div className="flex items-center gap-3 text-sm text-neutral-700 dark:text-neutral-300">
               <Check size={16} className="text-green-500" />
               <span>Badge de Vendedor Verificado</span>
             </div>
             <div className="flex items-center gap-3 text-sm text-neutral-700 dark:text-neutral-300">
               <Check size={16} className="text-green-500" />
               <span>Suporte prioritário 24/7</span>
             </div>
           </div>

           <button className="w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold py-3 rounded-lg hover:opacity-90 transition-opacity">
             Assinar Pro - R$ 29/mês
           </button>
        </div>
      </div>
    </div>
  );
};

export default UserWallet;