import React, { useState } from 'react';
import { 
  User, Bell, Lock, CreditCard, Globe, Camera, 
  Save, MessageCircle, ShoppingCart, Megaphone, 
  Search, HelpCircle, Eye, Edit2, Shield, Key, 
  Smartphone, Mail, Plus, Trash2, CheckCircle, 
  AlertTriangle, History, DollarSign, Calendar, Clock
} from 'lucide-react';

const UserSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // --- Render Functions for Each Tab Content ---

  const renderProfileTab = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Public Info */}
      <section className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Informações Públicas</h2>
          <button className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors">Ver perfil público</button>
        </div>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex flex-col items-center gap-3">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-full bg-neutral-200 dark:bg-neutral-700 border-4 border-neutral-100 dark:border-neutral-600 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://picsum.photos/id/64/200/200" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={24} className="text-white" />
              </div>
            </div>
            <button className="text-sm font-bold text-neutral-500 dark:text-neutral-400 hover:text-primary transition-colors">Alterar foto</button>
          </div>
          
          <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">Nome da Loja</label>
              <input 
                className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-4 py-2 text-neutral-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                type="text" 
                defaultValue="Loja do João"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">Nome de Usuário</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">olx.com/</span>
                <input 
                  className="flex-1 w-full rounded-r-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-4 py-2 text-neutral-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                  type="text" 
                  defaultValue="joao.vendas"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">Biografia</label>
              <textarea 
                className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-4 py-2 text-neutral-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none" 
                placeholder="Escreva uma breve descrição sobre sua loja..." 
                rows={3}
                defaultValue="Vendo eletrônicos e acessórios de alta qualidade com os melhores preços da região."
              ></textarea>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 text-right">0 / 250 caracteres</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Informações de Contato</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Essas informações não serão exibidas publicamente.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">Email</label>
            <input 
              className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-4 py-2 text-neutral-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
              type="email" 
              defaultValue="joao@exemplo.com"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">Telefone</label>
            <input 
              className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-4 py-2 text-neutral-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
              type="tel" 
              defaultValue="(11) 98765-4321"
            />
          </div>
        </div>
      </section>
      
      {/* Action Bar */}
      <div className="flex justify-end gap-3 pt-4">
        <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-lg rounded-xl p-2 flex gap-3">
          <button className="px-6 py-2.5 rounded-lg text-neutral-700 dark:text-neutral-200 font-bold text-sm bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
            Cancelar
          </button>
          <button className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold text-sm shadow-md shadow-primary/20 transition-all transform active:scale-95 flex items-center gap-2">
            <Save size={18} />
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm overflow-hidden">
        <div className="p-6 lg:p-8 border-b border-neutral-200 dark:border-neutral-700">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Canais de Notificação</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Escolha onde você quer receber nossos alertas.</p>
        </div>
        <div className="divide-y divide-neutral-200 dark:divide-neutral-700 p-6 lg:p-8">
          <div className="flex items-center justify-between py-4">
             <div className="flex items-center gap-4">
               <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg">
                 <Mail size={24} />
               </div>
               <div>
                 <p className="font-bold text-neutral-900 dark:text-white">Notificações por E-mail</p>
                 <p className="text-sm text-neutral-500 dark:text-neutral-400">Receba resumos semanais e alertas importantes.</p>
               </div>
             </div>
             <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
             </label>
          </div>
          <div className="flex items-center justify-between py-4">
             <div className="flex items-center gap-4">
               <div className="p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-lg">
                 <Smartphone size={24} />
               </div>
               <div>
                 <p className="font-bold text-neutral-900 dark:text-white">Notificações Push</p>
                 <p className="text-sm text-neutral-500 dark:text-neutral-400">Alertas em tempo real no seu navegador ou celular.</p>
               </div>
             </div>
             <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
             </label>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm overflow-hidden">
        <div className="p-6 lg:p-8 border-b border-neutral-200 dark:border-neutral-700">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white">O que você quer receber?</h2>
        </div>
        <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
          <div className="flex items-center justify-between p-4 lg:px-8 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
            <div className="flex gap-4 items-center">
              <div className="p-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg text-neutral-600 dark:text-neutral-300">
                <MessageCircle size={20} />
              </div>
              <div>
                <p className="font-medium text-neutral-900 dark:text-white">Novas mensagens</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Quando um comprador enviar mensagem no chat.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer dark:bg-neutral-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-4 lg:px-8 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
            <div className="flex gap-4 items-center">
              <div className="p-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg text-neutral-600 dark:text-neutral-300">
                <ShoppingCart size={20} />
              </div>
              <div>
                <p className="font-medium text-neutral-900 dark:text-white">Atualizações de Vendas</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Quando houver uma nova venda ou atualização de status.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer dark:bg-neutral-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-4 lg:px-8 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
            <div className="flex gap-4 items-center">
              <div className="p-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg text-neutral-600 dark:text-neutral-300">
                <Megaphone size={20} />
              </div>
              <div>
                <p className="font-medium text-neutral-900 dark:text-white">Marketing e Dicas</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Novidades, ofertas e dicas para vender mais.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer dark:bg-neutral-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </section>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm p-6 lg:p-8">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
          <Key className="text-primary" /> Segurança da Conta
        </h2>
        
        <form className="max-w-md space-y-4">
          <div>
             <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Senha Atual</label>
             <input type="password" className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-4 py-2 text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="••••••••" />
          </div>
          <div>
             <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Nova Senha</label>
             <input type="password" className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-4 py-2 text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="••••••••" />
          </div>
          <div>
             <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Confirmar Nova Senha</label>
             <input type="password" className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-4 py-2 text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="••••••••" />
          </div>
          <button className="px-6 py-2 bg-neutral-800 dark:bg-white text-white dark:text-neutral-900 font-bold rounded-lg hover:opacity-90 transition-opacity">
            Alterar Senha
          </button>
        </form>
      </section>

      <section className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm p-6 lg:p-8 flex items-center justify-between">
        <div>
           <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
             <Shield className="text-green-500" size={20} /> Autenticação em Duas Etapas (2FA)
           </h3>
           <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-lg">
             Adicione uma camada extra de segurança à sua conta exigindo um código do seu celular ao fazer login.
           </p>
        </div>
        <button className="px-6 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
          Configurar
        </button>
      </section>

      <section className="bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/30 p-6 lg:p-8">
        <div className="flex items-start gap-4">
           <div className="p-3 bg-red-100 dark:bg-red-900/20 text-red-600 rounded-lg">
             <AlertTriangle size={24} />
           </div>
           <div className="flex-1">
             <h2 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">Zona de Perigo</h2>
             <p className="text-sm text-red-600/80 dark:text-red-400/70 mb-6">
               Ao desativar sua conta, todos os seus anúncios serão pausados e seu perfil ficará oculto. 
               Para excluir permanentemente seus dados, entre em contato com o suporte.
             </p>
             <div className="flex flex-col sm:flex-row items-center gap-4">
                <button className="px-4 py-2 bg-white dark:bg-neutral-900 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-bold rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                  Desativar Conta Temporariamente
                </button>
                <button className="text-red-600 dark:text-red-400 text-sm font-medium hover:underline">
                  Quero excluir minha conta
                </button>
             </div>
           </div>
        </div>
      </section>
    </div>
  );

  const renderPaymentsTab = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <CreditCard className="text-primary" /> Métodos de Pagamento
          </h2>
          <button className="flex items-center gap-2 text-sm font-bold text-primary hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-colors">
            <Plus size={16} /> Adicionar Novo
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {/* Card 1 */}
           <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-4 flex items-center justify-between bg-neutral-50 dark:bg-neutral-900/50">
             <div className="flex items-center gap-4">
               <div className="w-12 h-8 bg-neutral-200 dark:bg-neutral-700 rounded flex items-center justify-center text-xs font-bold text-neutral-500">
                 VISA
               </div>
               <div>
                 <p className="font-bold text-neutral-900 dark:text-white text-sm">Visa final 4242</p>
                 <p className="text-xs text-neutral-500 dark:text-neutral-400">Expira em 12/25</p>
               </div>
             </div>
             <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">Principal</span>
           </div>
           
           {/* Card 2 */}
           <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-4 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
             <div className="flex items-center gap-4">
               <div className="w-12 h-8 bg-neutral-200 dark:bg-neutral-700 rounded flex items-center justify-center text-xs font-bold text-neutral-500">
                 MC
               </div>
               <div>
                 <p className="font-bold text-neutral-900 dark:text-white text-sm">Mastercard final 8899</p>
                 <p className="text-xs text-neutral-500 dark:text-neutral-400">Expira em 08/24</p>
               </div>
             </div>
             <button className="text-neutral-400 hover:text-red-500 transition-colors">
               <Trash2 size={18} />
             </button>
           </div>
        </div>
      </section>

      <section className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <History size={20} /> Histórico de Faturas
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400">
              <tr>
                <th className="px-6 py-3 font-medium">Data</th>
                <th className="px-6 py-3 font-medium">Descrição</th>
                <th className="px-6 py-3 font-medium">Valor</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Fatura</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700">
              {[1, 2, 3].map((i) => (
                <tr key={i} className="hover:bg-neutral-50 dark:hover:bg-neutral-700/30">
                  <td className="px-6 py-4 text-neutral-900 dark:text-white">10 Mar 2023</td>
                  <td className="px-6 py-4 text-neutral-600 dark:text-neutral-300">Plano PRO (Mensal)</td>
                  <td className="px-6 py-4 font-bold text-neutral-900 dark:text-white">R$ 29,90</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 text-xs font-bold">
                      <CheckCircle size={12} /> Pago
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:underline font-medium">Download PDF</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );

  const renderRegionTab = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm p-6 lg:p-8">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
          <Globe className="text-primary" /> Preferências Regionais
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
             <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Idioma</label>
             <select className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-4 py-3 text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer">
               <option>Português (Brasil)</option>
               <option>English (US)</option>
               <option>Español</option>
             </select>
             <p className="text-xs text-neutral-500 mt-2">Isso alterará o idioma da interface.</p>
          </div>

          <div>
             <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Moeda</label>
             <div className="relative">
               <DollarSign size={18} className="absolute left-3 top-3.5 text-neutral-400" />
               <select className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 pl-10 pr-4 py-3 text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer">
                 <option>Real Brasileiro (BRL)</option>
                 <option>US Dollar (USD)</option>
                 <option>Euro (EUR)</option>
               </select>
             </div>
          </div>

          <div className="md:col-span-2">
             <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Fuso Horário</label>
             <div className="relative">
               <Clock size={18} className="absolute left-3 top-3.5 text-neutral-400" />
               <select className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 pl-10 pr-4 py-3 text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer">
                 <option>(GMT-03:00) Brasília</option>
                 <option>(GMT-04:00) Amazonas</option>
                 <option>(GMT-00:00) UTC</option>
               </select>
             </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-700 flex justify-end">
           <button className="px-6 py-2 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-colors">
             Salvar Preferências
           </button>
        </div>
      </section>
    </div>
  );

  return (
    <div className="flex flex-col flex-1 h-full bg-neutral-50 dark:bg-neutral-900 transition-colors">
      {/* Top Header specific to Settings */}
      <header className="h-16 shrink-0 border-b border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 flex items-center justify-between px-6 lg:px-10 z-10 sticky top-0">
        <div className="flex items-center gap-4">
           <h1 className="font-bold text-lg text-neutral-800 dark:text-white hidden lg:block">Configurações</h1>
           <div className="lg:hidden font-bold text-lg text-neutral-800 dark:text-white">Configurações</div>
        </div>

        <div className="hidden lg:flex items-center flex-1 max-w-xl mx-8">
          <div className="relative w-full max-w-sm">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              <Search size={18} />
            </span>
            <input 
              className="w-full bg-neutral-100 dark:bg-neutral-900 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50 text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 transition-colors" 
              placeholder="Buscar configurações..." 
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors relative text-neutral-600 dark:text-neutral-300">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-neutral-800"></span>
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors text-neutral-600 dark:text-neutral-300">
            <HelpCircle size={20} />
          </button>
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">Configurações</h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-base lg:text-lg">Gerencie suas preferências, notificações e segurança da loja.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 mt-4">
            
            {/* Sidebar Navigation */}
            <nav className="lg:w-64 shrink-0">
              <ul className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 no-scrollbar snap-x sticky top-4">
                <li className="snap-start">
                  <button 
                    onClick={() => setActiveTab('profile')}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all whitespace-nowrap
                      ${activeTab === 'profile' 
                        ? 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm ring-1 ring-primary ring-offset-2 dark:ring-offset-neutral-900 font-semibold text-neutral-900 dark:text-white' 
                        : 'text-neutral-500 dark:text-neutral-400 hover:bg-white dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                  >
                    <User size={20} className={activeTab === 'profile' ? 'text-primary' : ''} />
                    Meu Perfil
                  </button>
                </li>
                <li className="snap-start">
                  <button 
                    onClick={() => setActiveTab('notifications')}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all whitespace-nowrap
                      ${activeTab === 'notifications' 
                        ? 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm ring-1 ring-primary ring-offset-2 dark:ring-offset-neutral-900 font-semibold text-neutral-900 dark:text-white' 
                        : 'text-neutral-500 dark:text-neutral-400 hover:bg-white dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                  >
                    <Bell size={20} className={activeTab === 'notifications' ? 'text-primary' : ''} />
                    Notificações
                  </button>
                </li>
                <li className="snap-start">
                  <button 
                    onClick={() => setActiveTab('privacy')}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all whitespace-nowrap
                      ${activeTab === 'privacy' 
                        ? 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm ring-1 ring-primary ring-offset-2 dark:ring-offset-neutral-900 font-semibold text-neutral-900 dark:text-white' 
                        : 'text-neutral-500 dark:text-neutral-400 hover:bg-white dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                  >
                    <Lock size={20} className={activeTab === 'privacy' ? 'text-primary' : ''} />
                    Privacidade
                  </button>
                </li>
                <li className="snap-start">
                  <button 
                    onClick={() => setActiveTab('payments')}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all whitespace-nowrap
                      ${activeTab === 'payments' 
                        ? 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm ring-1 ring-primary ring-offset-2 dark:ring-offset-neutral-900 font-semibold text-neutral-900 dark:text-white' 
                        : 'text-neutral-500 dark:text-neutral-400 hover:bg-white dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                  >
                    <CreditCard size={20} className={activeTab === 'payments' ? 'text-primary' : ''} />
                    Pagamentos
                  </button>
                </li>
                <li className="snap-start">
                  <button 
                    onClick={() => setActiveTab('region')}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all whitespace-nowrap
                      ${activeTab === 'region' 
                        ? 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm ring-1 ring-primary ring-offset-2 dark:ring-offset-neutral-900 font-semibold text-neutral-900 dark:text-white' 
                        : 'text-neutral-500 dark:text-neutral-400 hover:bg-white dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                  >
                    <Globe size={20} className={activeTab === 'region' ? 'text-primary' : ''} />
                    Idioma e Região
                  </button>
                </li>
              </ul>
            </nav>

            {/* Content Area */}
            <div className="flex-1 flex flex-col gap-8">
              {activeTab === 'profile' && renderProfileTab()}
              {activeTab === 'notifications' && renderNotificationsTab()}
              {activeTab === 'privacy' && renderPrivacyTab()}
              {activeTab === 'payments' && renderPaymentsTab()}
              {activeTab === 'region' && renderRegionTab()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;