import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Clock, Trash2 } from 'lucide-react';
import { PRODUCTS } from '../mockData';

const Favorites: React.FC = () => {
  // Simulating favorites (using a subset of products)
  const favorites = [PRODUCTS[0], PRODUCTS[3], PRODUCTS[5]];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-500">
          <Heart size={24} fill="currentColor" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Meus Favoritos</h1>
          <p className="text-gray-500 dark:text-neutral-400 text-sm">{favorites.length} itens salvos</p>
        </div>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <div key={product.id} className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 dark:border-neutral-700 group relative">
              <button className="absolute top-2 right-2 z-10 p-2 bg-white/90 dark:bg-neutral-900/90 rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors shadow-sm" title="Remover dos favoritos">
                <Trash2 size={16} />
              </button>
              
              <Link to={`/product/${product.id}`} className="block">
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
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-neutral-800 rounded-xl border border-gray-100 dark:border-neutral-700">
          <Heart size={48} className="mx-auto text-gray-300 dark:text-neutral-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Você ainda não tem favoritos</h3>
          <p className="text-gray-500 dark:text-neutral-400 mb-6">Navegue pelo marketplace e salve o que você gostar.</p>
          <Link to="/" className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg font-bold transition-colors">
            Explorar Produtos
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;