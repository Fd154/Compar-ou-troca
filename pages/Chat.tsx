import React, { useState } from 'react';
import { Send, MoreVertical, Paperclip, Search } from 'lucide-react';
import { CHATS } from '../mockData';
import { Message } from '../types';

const Chat: React.FC = () => {
  const [activeChat, setActiveChat] = useState(CHATS[0].id);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'them', text: 'Olá, bom dia! O iPhone ainda está disponível?', time: '10:30' },
    { id: 2, sender: 'me', text: 'Bom dia! Sim, ainda está disponível.', time: '10:35' },
    { id: 3, sender: 'them', text: 'Aceita R$ 4.200 à vista?', time: '10:36' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: Date.now(),
      sender: 'me',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setInput('');
  };

  const activeContact = CHATS.find(c => c.id === activeChat);

  return (
    <div className="container mx-auto px-4 py-6 h-[calc(100vh-80px)]">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-gray-200 dark:border-neutral-700 h-full flex overflow-hidden">
        {/* Sidebar List */}
        <div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 dark:border-neutral-700 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900">
            <h2 className="font-bold text-gray-800 dark:text-white mb-3">Minhas Conversas</h2>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Buscar conversa..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:border-primary"
              />
              <Search size={16} className="absolute left-3 top-2.5 text-gray-400 dark:text-neutral-500" />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {CHATS.map((contact) => (
              <div 
                key={contact.id}
                onClick={() => setActiveChat(contact.id)}
                className={`p-4 flex gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition-colors border-b border-gray-100 dark:border-neutral-700 ${activeChat === contact.id ? 'bg-purple-50 dark:bg-primary/10 border-l-4 border-l-primary' : ''}`}
              >
                <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className={`font-semibold truncate ${activeChat === contact.id ? 'text-primary' : 'text-gray-900 dark:text-white'}`}>{contact.name}</h3>
                    {contact.unread > 0 && (
                      <span className="bg-secondary text-white text-xs px-2 py-0.5 rounded-full">{contact.unread}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-neutral-400 truncate">{contact.product}</p>
                  <p className="text-xs text-gray-400 dark:text-neutral-500 mt-1 truncate">{contact.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="hidden md:flex flex-1 flex-col bg-gray-50 dark:bg-neutral-900">
          {/* Chat Header */}
          <div className="bg-white dark:bg-neutral-800 p-4 border-b border-gray-200 dark:border-neutral-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src={activeContact?.avatar} alt={activeContact?.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">{activeContact?.name}</h3>
                <p className="text-xs text-gray-500 dark:text-neutral-400">{activeContact?.product}</p>
              </div>
            </div>
            <button className="text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-700 p-2 rounded-full">
              <MoreVertical size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[70%] p-3 rounded-lg shadow-sm ${
                    msg.sender === 'me' 
                      ? 'bg-primary text-white rounded-br-none' 
                      : 'bg-white dark:bg-neutral-800 text-gray-800 dark:text-neutral-200 rounded-bl-none border border-gray-200 dark:border-neutral-700'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <span className={`text-[10px] block text-right mt-1 ${msg.sender === 'me' ? 'text-white/70' : 'text-gray-400'}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="bg-white dark:bg-neutral-800 p-4 border-t border-gray-200 dark:border-neutral-700">
            <div className="flex items-center gap-2">
              <button className="text-gray-400 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-neutral-300 p-2">
                <Paperclip size={20} />
              </button>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Digite sua mensagem..." 
                className="flex-1 border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-gray-800 dark:text-white rounded-full px-4 py-2 focus:outline-none focus:border-primary"
              />
              <button 
                onClick={handleSend}
                className="bg-primary hover:bg-primary-hover text-white p-2 rounded-full transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;