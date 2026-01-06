import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Camera, Save, Copy, ExternalLink, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const sellerSlug = "Loja do João"; // Mock slug based on user name
  const storeLink = `${window.location.origin}/#/seller/${encodeURIComponent(sellerSlug)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(storeLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8">Meu Perfil</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Card: Avatar & Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-card border border-neutral-200 dark:border-neutral-700 p-8 text-center">
            <div className="relative inline-block mb-4">
               <div className="w-32 h-32 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-neutral-400 text-4xl font-bold overflow-hidden">
                 <img src="https://picsum.photos/id/64/200/200" alt="Profile" className="w-full h-full object-cover" />
               </div>
               <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full hover:bg-primary-hover shadow-md transition-colors">
                 <Camera size={18} />
               </button>
            </div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Loja do João</h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-6">Membro desde 2023</p>
            
            <div className="w-full h-px bg-neutral-100 dark:bg-neutral-700 mb-6"></div>
            
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-300">
                <MapPin size={18} />
                <span>São Paulo, SP</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-300">
                <Mail size={18} />
                <span>voce@exemplo.com</span>
              </div>
            </div>
          </div>

          {/* Share Store Card */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-neutral-800 rounded-xl shadow-card border border-primary/20 p-6">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">Divulgue sua Loja</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">Compartilhe o link direto para todos os seus anúncios.</p>
            
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-600 rounded-lg px-3 py-2 text-xs text-neutral-500 truncate font-mono select-all">
                {storeLink}
              </div>
              <button 
                onClick={handleCopyLink}
                className="p-2 bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg hover:border-primary text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors"
                title="Copiar Link"
              >
                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
              </button>
            </div>
            
            <Link 
              to={`/seller/${encodeURIComponent(sellerSlug)}`}
              target="_blank"
              className="w-full flex items-center justify-center gap-2 text-sm font-bold text-primary hover:text-primary-hover hover:underline"
            >
              <ExternalLink size={14} /> Ver minha loja pública
            </Link>
          </div>
        </div>

        {/* Right Card: Edit Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-card border border-neutral-200 dark:border-neutral-700 p-8">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">Dados Pessoais</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Nome da Loja / Perfil</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      defaultValue="Loja do João"
                      className="w-full pl-10 pr-4 py-2.5 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" 
                    />
                    <User size={18} className="absolute left-3 top-3 text-neutral-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Telefone / WhatsApp</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      defaultValue="(11) 99999-9999"
                      className="w-full pl-10 pr-4 py-2.5 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" 
                    />
                    <Phone size={18} className="absolute left-3 top-3 text-neutral-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">E-mail</label>
                <div className="relative opacity-70">
                  <input 
                    type="email" 
                    defaultValue="voce@exemplo.com"
                    disabled
                    className="w-full pl-10 pr-4 py-2.5 border border-neutral-300 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 rounded-lg cursor-not-allowed" 
                  />
                  <Mail size={18} className="absolute left-3 top-3 text-neutral-400" />
                </div>
                <p className="text-xs text-neutral-500 mt-1">O e-mail não pode ser alterado.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Estado</label>
                  <select className="w-full px-4 py-2.5 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
                    <option>São Paulo</option>
                    <option>Rio de Janeiro</option>
                    <option>Minas Gerais</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Cidade</label>
                  <input 
                    type="text" 
                    defaultValue="São Paulo"
                    className="w-full px-4 py-2.5 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Bio (Sobre você)</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-2.5 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                  placeholder="Escreva um pouco sobre você..."
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 shadow-md transition-colors">
                  <Save size={20} /> Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;