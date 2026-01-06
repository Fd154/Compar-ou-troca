import React from 'react';
import { Bell, Package, Tag, MessageCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Notifications: React.FC = () => {
  const notifications = [
    {
      id: 1,
      type: 'price',
      title: 'Preço caiu!',
      message: 'O iPhone 13 Pro Max que você favoritou baixou de R$ 4.500 para R$ 4.200.',
      time: '2 horas atrás',
      read: false,
      icon: <Tag size={20} className="text-green-600 dark:text-green-400" />,
      bg: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      id: 2,
      type: 'message',
      title: 'Nova mensagem',
      message: 'João Silva respondeu sua pergunta sobre o anúncio "Violão Yamaha".',
      time: '5 horas atrás',
      read: false,
      icon: <MessageCircle size={20} className="text-blue-600 dark:text-blue-400" />,
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      link: '/chat'
    },
    {
      id: 3,
      type: 'system',
      title: 'Anúncio aprovado',
      message: 'Seu anúncio "Bicicleta Caloi" já está visível para todos os usuários.',
      time: '1 dia atrás',
      read: true,
      icon: <Package size={20} className="text-purple-600 dark:text-purple-400" />,
      bg: 'bg-purple-100 dark:bg-purple-900/30',
      link: '/my-ads'
    },
    {
      id: 4,
      type: 'alert',
      title: 'Dica de segurança',
      message: 'Nunca compartilhe códigos de verificação por telefone ou WhatsApp.',
      time: '2 dias atrás',
      read: true,
      icon: <AlertCircle size={20} className="text-orange-600 dark:text-orange-400" />,
      bg: 'bg-orange-100 dark:bg-orange-900/30'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Bell className="text-primary" /> Notificações
        </h1>
        <button className="text-sm text-primary font-medium hover:underline">
          Marcar todas como lidas
        </button>
      </div>

      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-700 overflow-hidden">
        <div className="divide-y divide-gray-100 dark:divide-neutral-700">
          {notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-4 hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition-colors ${!notif.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
            >
              <div className="flex gap-4">
                <div className={`w-10 h-10 rounded-full ${notif.bg} flex items-center justify-center flex-shrink-0`}>
                  {notif.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`font-semibold ${!notif.read ? 'text-black dark:text-white' : 'text-gray-700 dark:text-neutral-300'}`}>
                      {notif.title}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-neutral-500 whitespace-nowrap ml-2">{notif.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-neutral-400 leading-relaxed mb-2">
                    {notif.message}
                  </p>
                  {notif.link && (
                    <Link to={notif.link} className="text-sm text-primary font-medium hover:underline">
                      Ver detalhes
                    </Link>
                  )}
                </div>
                {!notif.read && (
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;