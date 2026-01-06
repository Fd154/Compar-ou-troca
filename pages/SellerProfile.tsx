import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Star, MessageCircle, Calendar } from 'lucide-react';
import { PRODUCTS } from '../mockData';

const SellerProfile: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const decodedName = decodeURIComponent(name || '');
  
  // Find seller info from first product match (mock logic)
  const sellerProduct = PRODUCTS.find(p => p.seller === decodedName);
  
  // Filter products by this seller
  const sellerProducts = PRODUCTS.filter(p => p.seller === decodedName);

  if (!sellerProduct) {
    return <div className="p-8 text-center text-neutral-800 dark:text-neutral-200">Vendedor não encontrado</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Seller Header */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-700 p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img 
            src={sellerProduct.sellerAvatar} 
            alt={decodedName} 
            className="w-24 h-24 rounded-full border-4 border-gray-50 dark:border-neutral-700 object-cover"
          />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{decodedName}</h1>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600 dark:text-neutral-300 mb-4">
              <div className="flex items-center gap-1">
                <MapPin size={16} /> {sellerProduct.location}
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} /> Na plataforma desde 2020
              </div>
              <div className="flex items-center gap-1 text-orange-500 font-medium">
                <Star size={16} fill="currentColor" /> 4.9 (128 vendas)
              </div>
            </div>

            <div className="flex justify-center md:justify-start gap-3">
              <Link to="/chat" className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors">
                <MessageCircle size={18} /> Enviar Mensagem
              </Link>
              <button className="border border-gray-300 dark:border-neutral-600 hover:border-gray-400 dark:hover:border-neutral-500 text-gray-700 dark:text-neutral-200 px-6 py-2 rounded-lg font-medium transition-colors">
                Seguir Vendedor
              </button>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-neutral-900 p-4 rounded-lg text-center min-w-[150px]">
            <span className="block text-3xl font-bold text-gray-800 dark:text-white">{sellerProducts.length}</span>
            <span className="text-sm text-gray-500 dark:text-neutral-400">Anúncios ativos</span>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Anúncios de {decodedName}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sellerProducts.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 dark:border-neutral-700 group">
            <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-neutral-900">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                {product.images.length} fotos
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-800 dark:text-white line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                {product.title}
              </h3>
              <p className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                R$ {product.price.toLocaleString('pt-BR')}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-neutral-400">
                <div className="flex items-center gap-1">
                  <MapPin size={12} />
                  <span className="truncate max-w-[100px]">{product.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>{product.date}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SellerProfile;